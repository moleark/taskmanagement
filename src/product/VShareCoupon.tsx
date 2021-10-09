import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page } from 'tonva-react';
import { CProduct } from './CProduct';
import { appSettings } from "appConfig";
import { MainProductChemical, ProductPackRow } from "model/product";
import { ProductImage } from "tools/productImage";
import { ViewMainSubs } from "mainSubs";
import { VShareCouponBase } from "coupon/VShareCouponBase";

export class VShareCoupon extends VPage<CProduct> {

    private url: string;
    private coupon: any;

    async open(param: any) {
        let { coupon, product } = param;
        this.coupon = coupon;
        let { code, type } = coupon;
        this.url = appSettings.shareUrl(type, code, product.main.id, "1");
        this.openPage(this.page, param);
    }

    comeBack = () => {
        let c = appSettings.isInner ? 1 : 2;
        this.closePage(c);
    };

    private productPropItem = (caption: string, value: any) => {
        if (value === null || value === undefined) return null;
        return (
            <>
                <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">
                    {caption}
                </div>
                <div className="col-8 col-sm-4 col-lg-8">{value}</div>
            </>
        );
    };

    private renderProduct = (product: MainProductChemical) => {
        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        return (
            <div className="mb-4 px-3">
                <div className="py-2"></div>
                <div className="row">
                    <div className="col-5">
                        <ProductImage chemicalId={imageUrl} className="w-100" />
                    </div>
                    <div className="col-7">
                        <div className="row">
                            {this.productPropItem("CAS", CAS)}
                            {this.productPropItem("纯度", purity)}
                            {this.productPropItem("分子式", molecularFomula)}
                            {this.productPropItem("分子量", molecularWeight)}
                            {this.productPropItem("产品编号", origin)}
                            {this.productPropItem("品牌", brand.name)}
                        </div>
                    </div>
                </div>
                <div style={{ margin: "1rem auto 0 auto" }}>
                    <strong>{description}</strong>
                </div>
                <div>{descriptionC}</div>
            </div>
        );
    };

    private renderPack = (item: ProductPackRow) => {
        return <> </>;
    };

    onReturn = () => {
        this.closePage(1);
    }

    private page = observer((param: any) => {
        let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(
            this.renderProduct,
            this.renderPack
        );

        let { type } = this.coupon;
        viewProduct.model = param.product;
        let header = appSettings.couponType[type];
        return <Page header={header}>
            <div className="bg-white w-100">
                <div className="px-2 py-2">{viewProduct.render()}</div>
                <div className="text-center">
                    <VShareCouponBase coupon={this.coupon} url={this.url} onReturn={this.onReturn} />
                </div>
            </div>
        </Page>
    });
}