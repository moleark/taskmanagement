import * as React from 'react';
import { CProduct } from './CProduct';
import {
    VPage, Page, Form, ItemSchema, NumSchema, UiSchema, Field,
    ObjectSchema, RowContext, UiCustom, FormField
} from 'tonva';
import { tv } from 'tonva';
import { observer } from 'mobx-react';
import { ProductImage } from 'tools/productImage';
import { MainProductChemical, ProductPackRow } from 'model/product';
import { consts } from 'consts';

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

export class VProductDetail extends VPage<CProduct> {
    private product: MainProductChemical;

    async open(product: any) {
        this.product = product.main;
        this.openPage(this.page, product);
    }

    private productPropItem(caption: string, value: any) {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4 col-lg-8">{value}</div>
        </>;
    }
    private renderBrand(brand: any) {
        return this.productPropItem('品牌', brand.obj.name);
    }

    private renderProduct = (product: any) => {

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
                        {this.renderBrand(brand)}
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


    private renderPack = (pack: any) => {
        return <>
            <div className="sep-product-select" />
        </>;
    }

    private page = observer((product: any) => {

        return <Page header="产品详情" headerClassName={consts.headerClass} >
            <div className="px-2 py-2 bg-white mb-3">{this.renderProduct(product)}</div>
            <div className="px-2 py-2 bg-white mb-3">{this.renderPack}</div>
        </Page>
    })
}