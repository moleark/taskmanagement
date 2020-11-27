import * as React from 'react';
import { COrder } from './COrder';
import {
    VPage, Page, Form, ItemSchema, NumSchema, UiSchema, Field,
    ObjectSchema, RowContext, UiCustom, FormField, BoxId, SearchBox
} from 'tonva';
import { tv } from 'tonva';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { ProductPackRow } from "model/product";
import { ViewMainSubs, MainProductChemical } from 'mainSubs';
import { ProductImage } from 'tools/productImage';
// import { productPropItem, renderBrand } from './VProductView';
import { observer } from 'mobx-react';
import { productPropItem, renderBrand } from 'product/CProduct';

const schema: ItemSchema[] = [
    { name: 'pack', type: 'object' } as ObjectSchema,
    { name: 'retail', type: 'number' } as NumSchema,
    { name: 'vipPrice', type: 'number' } as NumSchema,
    { name: 'promotionPrice', type: 'number' } as NumSchema,
    { name: 'currency', type: 'string' },
    { name: 'quantity', type: 'number' } as NumSchema,
    { name: 'inventoryAllocation', type: 'object' } as ObjectSchema,
    { name: 'futureDeliveryTimeDescription', type: 'string' }
];

export class VProduct extends VPage<COrder> {
    private productBox: BoxId;
    private discount: number;

    async open(param: any) {
        let { productData, product, discount } = param;
        this.productBox = product;
        this.discount = discount;
        this.openPage(this.page, productData);
    }

    private renderProduct = (product: MainProductChemical) => {

        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        return <div className="mb-3 px-2">
            <div className="py-2"><strong>{description}</strong></div>
            <div>{descriptionC}</div>
            <div className="row mt-3">
                <div className="col-12 col-sm-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-12 col-sm-9">
                    <div className="row mx-3">
                        {productPropItem('产品编号', origin, "font-weight-bold")}
                        {productPropItem('CAS', CAS, "font-weight-bold")}
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
        let { pack, retail, vipPrice, promotionPrice } = item;
        let right = null;
        if (retail) {
            let price: number = this.minPrice(vipPrice, promotionPrice);
            let retailUI: any;
            if (price) {
                retailUI = <small className="text-muted"><del>¥{retail}</del></small>;
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
        } else {
            right = <small>请询价</small>
        }

        return <div className="px-2">
            <div className="row">
                <div className="col-6">
                    <div><b>{tv(pack.obj, v => v.radioy)}{tv(pack.obj, v => v.unit)}</b></div>
                    <div>{this.controller.cApp.cProduct.renderDeliveryTime(pack)}</div>
                </div>
                <div className="col-6">
                    {right}
                </div>
            </div>
        </div>;
    }

    private onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data } = context;
        let { pack, retail, vipPrice, promotionPrice, currency } = data;
        let price = this.minPrice(vipPrice, promotionPrice) || retail;
        let { cApp } = this.controller;
        let { cart } = cApp;
        if (value > 0) {
            await cart.add(this.productBox, pack, value, price, retail, currency);
        } else {
            await cart.removeFromCart([{ productId: this.productBox.id, packId: pack.id }]);
        }
    }

    private minPrice(vipPrice: any, promotionPrice: any) {
        if (vipPrice || promotionPrice)
            return Math.min(typeof (vipPrice) === 'number' ? vipPrice : Infinity, typeof (promotionPrice) === 'number' ? promotionPrice : Infinity);
    }

    private uiSchema: UiSchema = {
        Templet: this.arrTemplet,
        items: {
            quantity: {
                widget: 'custom',
                className: 'text-center',
                WidgetClass: MinusPlusWidget as any,
                onChanged: this.onQuantityChanged,
            } as UiCustom
        },
    };

    private renderPack = (pack: ProductPackRow) => {
        return <>
            <div className="sep-product-select" />
            <Form className="mx-3" schema={schema} uiSchema={this.uiSchema} formData={pack} />
        </>;
    }

    private page = observer((productData: any) => {

        let { cApp, customer } = this.controller;
        let header = <div className="w-100 d-flex">
            <span className="pt-1 text-white " style={{ width: '4rem' }}>{customer.name}</span>
            <SearchBox className="w-100 mr-2"
                size={"sm"}
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索品名、编号、CAS、MDL等" />
        </div>;
        let right = cApp.cCart.renderCartLabel();
        if (true) {
            let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(this.renderProduct, this.renderPack);
            viewProduct.model = productData;

            return <Page header={header} right={right}>
                <div className="px-2 py-2 bg-white mb-3">{viewProduct.render()}</div>
            </Page>
        }
    })
}