import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, tv, Scroller } from "tonva";
import { CProduct } from "./CProduct";
import { ProductImage } from '../tools/productImage';


export class VProductSearchPromotion extends VPage<CProduct> {
    private searchKey: string;
    async open(key: string) {
        this.searchKey = key;
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
        let { showProductDetail } = this.controller;
        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        let onshowProductDetail = async () => await showProductDetail(product);
        return <div className="d-block mb-4 px-2" onClick={onshowProductDetail}>
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
    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { searcdpPromotionPager } = this.controller;
        searcdpPromotionPager.more();
    }
    private page = observer(() => {

        let { searcdpPromotionPager } = this.controller;
        let none = <div className="p-3 text-warning">【无】</div>
        return (
            <Page header="特惠产品" onScrollBottom={this.onScrollBottom}>
                <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.searchKey}</div>
                <List before={""} none={none} items={searcdpPromotionPager} item={{ render: this.renderProduct }} />
            </Page>
        );
    });

}