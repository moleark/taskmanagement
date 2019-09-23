import * as React from 'react';
import { VPage, Page, LMR, ItemSchema, ObjectSchema, NumSchema, tv, RowContext, UiSchema, UiCustom, Form, FormField } from 'tonva';
import { observer } from 'mobx-react';
import { ProductImage } from '../tools/productImage';
import { MainProductChemical } from '../model/product';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { consts } from '../consts';
import { CProduct, renderBrand } from './CProduct';
import { ProductPackRow } from './Product';
import { ViewMainSubs } from '../mainSubs';
import { productPropItem } from 'product/CProduct';

const schema: ItemSchema[] = [
    { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'retail', type: 'number' } as NumSchema,
    { name: 'vipPrice', type: 'number' } as NumSchema,
    { name: 'agentPrice', type: 'number' } as NumSchema,
    { name: 'promotionPrice', type: 'number' } as NumSchema,
    { name: 'currency', type: 'string' },

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
                <div className="col-sm-9">
                    <div className="row">
                        {productPropItem('CAS', CAS)}
                        {productPropItem('纯度', purity)}
                        {productPropItem('分子式', molecularFomula)}
                        {productPropItem('分子量', molecularWeight)}
                        {productPropItem('产品编号', origin)}
                        {renderBrand(brand)}
                    </div>
                </div>
            </div>
        </div>
    }

    private arrTemplet = (item: any) => {
        let { pack, retail, promotionPrice, agentPrice, inventoryAllocation, futureDeliveryTimeDescription } = item;

        let right = null;
        let agent = null;
        if (retail) {
            let price: number = promotionPrice;
            let retailUI: any;
            if (price) {
                retailUI = <small className="text-muted"><del>￥{retail}</del></small>;
            }
            else {
                price = retail;
            }


            right = <div className="row">
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center">
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                <span className="text-danger">¥ <span className="h5">{price}</span></span>
                </div>
                <div className="col-sm-6 pb-2 d-flex justify-content-end align-items-center"><FormField name="quantity" /></div>
            </div >

            right = price && <span><span className="text-warning small"></span> <span className="text-right  text-danger"><span className="small text-warning">￥</span>{price}</span></span>;
            agent = agentPrice && <span>&nbsp;/&nbsp;<span className="text-warning small"><strong className="small"> <span className="small"></span> </strong></span> <span className="text-right text-danger"> <span className="small text-warning">折</span> {((price - agentPrice) / price * 10).toFixed(1)} </span></span>;
        } else {
            right = <small>请询价</small>
        }

        let deliveryTimeUI = <></>;
        if (inventoryAllocation && inventoryAllocation.length > 0) {
            deliveryTimeUI = inventoryAllocation.map((v, index) => {
                let { warehouse, quantity, deliveryTimeDescription } = v;
                return <div key={index} className="text-success">
                    {tv(warehouse, (values: any) => <>{values.name}</>)}: {quantity}
                    {deliveryTimeDescription}
                </div>
            });
        } else {
            deliveryTimeUI = <div>{futureDeliveryTimeDescription && '期货: ' + futureDeliveryTimeDescription}</div>
        }

        return <div className="px-2">
            <div className="row">
                <div className="col-5">
                    <div className="h5" ><b>{tv(pack, v => <div>{v.radioy}{v.unit}</div>)}</b></div>
                    <div>{deliveryTimeUI}</div>
                </div>
                <div className="col-7">
                    {right}{agent}
                </div>
            </div>
        </div>;
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