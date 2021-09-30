import * as React from 'react';
import { Page, VPage, List, tv, SearchBox, Scroller } from 'tonva-react';
import { CProduct } from './CProduct';

import { observer } from "mobx-react";
import { ProductImage } from '../tools/productImage';
import { observable } from 'mobx';
export class VProductPromotion extends VPage<CProduct> {
    @observable promotion: any;
    async open(promotion: any) {
        this.promotion = promotion
        this.openPage(this.page);
    }

    private renderBrand = (brand: any) => {
        return this.productPropItem('品牌', brand.name);
    }

    private productPropItem = (caption: string, value: any) => {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4 col-lg-8">{value}</div>
        </>;
    }
    private renderProduct = (product: any, index: number) => {
        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        return <div className="d-block mb-4 px-3">
            <div className="py-2">
                <div><strong>{description}</strong></div>
                <div>{descriptionC}</div>
            </div>
            <div className="row">
                <div className="col-3">
                    <ProductImage chemicalId={imageUrl} className="w-100" />
                </div>
                <div className="col-9">
                    <div className="row">
                        {this.productPropItem('CAS', CAS)}
                        {this.productPropItem('纯度', purity)}
                        {this.productPropItem('分子式', molecularFomula)}
                        {this.productPropItem('分子量', molecularWeight)}
                        {this.productPropItem('产品编号', origin)}
                        {tv(brand, this.renderBrand)}
                    </div>
                </div>
            </div>
        </div>
    }

    private onSelectItem = async (product: any) => {
        this.controller.showProductDetail(product)
    }

    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        this.controller.promotionPager.more();
    }

    private onSearch = async (key: string) => {
        this.controller.searchPromotion(key, this.promotion)
    }

    private page = observer((promotion: any) => {
        let { promotionPager } = this.controller;

        let none = <div className="p-3 text-warning">【无】</div>
        let search = <div className="d-flex w-100">
            <span className="w-4c align-self-center">特惠</span>
            <SearchBox className="w-100 pr-2 my-2 small" size='sm'
                onSearch={(key: string) => this.onSearch(key)}
                placeholder="特惠品名、编号、CAS、MDL等" />
        </div>
        return <Page header={search} onScrollBottom={this.onScrollBottom}  >
            <List before={''} none={none} items={promotionPager} item={{ render: this.renderProduct, onClick: this.onSelectItem }} />
        </Page >
    })
}