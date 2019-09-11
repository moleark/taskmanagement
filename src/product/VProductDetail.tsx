import * as React from 'react';
import { CProduct, renderBrand } from './CProduct';
import { VPage, Page, LMR, ItemSchema, ObjectSchema, NumSchema, tv, RowContext, UiSchema, UiCustom, Form, FormField } from 'tonva';
import { observer } from 'mobx-react';
import { ProductImage } from 'tools/productImage';
import { MainProductChemical } from 'model/product';
import { ProductPackRow } from './Product';
import { ViewMainSubs } from 'mainSubs';
import { MinusPlusWidget } from 'tools/minusPlusWidget';
import { consts } from '../consts';

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
                        {this.item('CAS', CAS)}
                        {this.item('纯度', purity)}
                        {this.item('分子式', molecularFomula)}
                        {this.item('分子量', molecularWeight)}
                        {this.item('产品编号', origin)}
                        {renderBrand(brand)}
                    </div>
                </div>
            </div>
        </div>
    }

    private item = (caption: string, value: any) => {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4">{value}</div>
        </>;
    }

    private arrTemplet = (item: any) => {
        let { pack, retail, promotionPrice, agentPrice, inventoryAllocation, futureDeliveryTimeDescription } = item;
        let right = null;
        if (retail) {
            let price: number = promotionPrice;
            let retailUI: any;
            if (price) {
                retailUI = <small className="text-muted"><del>￥{retail}</del></small>;
            }
            else {
                price = retail;
            }
            right = <div className="text-right row">
                <div >
                    <small className="text-muted">{retailUI}</small>&nbsp; &nbsp;
                    <span className="text-danger">￥ <span className="h5">{price}</span> </span>
                    {
                        agentPrice && <span className="text-danger"><span className="small" ><span className="small " >￥ <span >{agentPrice}<span className="small text-muted">  &nbsp;代理</span></span></span></span></span>
                    }
                </div>

            </div >
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
                    <div><b>{tv(pack, v => <div>{v.radioy}{v.unit}</div>)}</b></div>
                    <div>{deliveryTimeUI}</div>
                </div>
                <div className="col-7">
                    {right}
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