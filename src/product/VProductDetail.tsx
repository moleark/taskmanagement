import * as React from 'react';
import { VPage, Page, ItemSchema, ObjectSchema, NumSchema, tv, UiSchema, Form } from 'tonva';
import { observer } from 'mobx-react';
import { ProductImage } from '../tools/productImage';
import { MainProductChemical } from '../model/product';
import { consts } from '../consts';
import { CProduct, renderBrand, productPropItem } from './CProduct';
import { ProductPackRow } from './Product';
import { ViewMainSubs } from '../mainSubs';

const schema: ItemSchema[] = [
    { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'retail', type: 'number' } as NumSchema,
    { name: 'vipPrice', type: 'number' } as NumSchema,
    { name: 'agentPrice', type: 'number' } as NumSchema,
    { name: 'promotionPrice', type: 'number' } as NumSchema,
    { name: 'currency', type: 'string' },
    { name: 'quantity', type: 'number' } as NumSchema,
    { name: 'inventoryAllocation', type: 'object' } as ObjectSchema,
    { name: 'futureDeliveryTimeDescription', type: 'string' }
];

export class VProductDetail extends VPage<CProduct> {
    private product: MainProductChemical;

    async open(product: any) {
        this.product = product.main;
        this.openPage(this.page, product);
    }

    private renderProduct = (product: MainProductChemical) => {

        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        return <div className="mb-3 px-2">
            <div className="py-2"><strong>{description}</strong></div>
            <div>{descriptionC}</div>
            <div className="row mt-3">
                <div className="col-sm-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-12 col-sm-9">
                    <div className="row mx-3">
                        {productPropItem('CAS', CAS, "font-weight-bold")}
                        {productPropItem('产品编号', origin, "font-weight-bold")}
                        {productPropItem('纯度', purity)}
                        {productPropItem('分子式', molecularFomula)}
                        {productPropItem('分子量', molecularWeight)}
                        {renderBrand(brand)}
                    </div>
                </div>
            </div>
        </div>
    }

    private arrTemplet = (item: ProductPackRow) => {
        let { pack, retail, vipPrice, agentPrice, promotionPrice } = item;
        let right = null;
        let agent = null;
        if (retail) {
            let price: number = this.minPrice(vipPrice, promotionPrice);
            let retailUI: any;
            if (price) {
                retailUI = <small className="text-muted"><del>¥{retail}</del></small>;
            }
            else {
                price = retail;
            }
            if (agentPrice) {
                let discount = ((1 - ((price - agentPrice) / price)) * 10).toFixed(1);
                agent = <span>{<span>/<span className="text-warning small"><strong className="small"> <span className="small">折</span> </strong></span> <span className="text-right text-danger h5">{discount}</span></span>}</span>;

            } else {
                agent = <span>{<span>/<span className="text-warning small"><strong className="small"> <span className="small">无折扣</span> </strong></span></span>}</span>;
            }
            right = <div className="row">
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger">¥ <span className="h5">{price}</span></span>
                    <span>{agent}</span>
                </div>
            </div >
        } else {
            right = <small>请询价</small>
        }

        return <div className="px-2">
            <div className="row">
                <div className="col-5">
                    <div><b>{tv(pack)}</b></div>
                </div>
                <div className="col-7">
                    {right}
                </div>
            </div>
            <div className="row">
                <div className="col-12 ">
                    {this.controller.renderDeliveryTime(pack)}
                </div>
            </div>
        </div>;
    }

    private minPrice(vipPrice: any, promotionPrice: any) {
        if (vipPrice || promotionPrice)
            return Math.min(typeof (vipPrice) === 'number' ? vipPrice : Infinity, typeof (promotionPrice) === 'number' ? promotionPrice : Infinity);
    }

    private uiSchema: UiSchema = {
        Templet: this.arrTemplet,
    };

    private renderPack = (pack: ProductPackRow) => {
        return <>
            <div className="sep-product-select" />
            <Form className="my-3" schema={schema} uiSchema={this.uiSchema} formData={pack} />
        </>;
    }

    private page = observer((product: any) => {

        let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(this.renderProduct, this.renderPack);
        viewProduct.model = product;
        return <Page header={"产品明细"} headerClassName={consts.headerClass}>
            <div className="px-2 py-2 bg-white mb-3">{viewProduct.render()}</div>
        </Page>
    })
}