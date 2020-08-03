import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page } from "tonva";
import { CCoupon } from "./CCoupon";
import copy from "copy-to-clipboard";
import { observable } from "mobx";
import { GLOABLE } from "ui";
import { setting } from "appConfig";
import QRCode from "qrcode.react";
import { ViewMainSubs, MainProductChemical } from "mainSubs";
import { ProductPackRow } from "model/product";
import { ProductImage } from "tools/productImage";
import { renderBrand } from "product/CProduct";

export class VCreateProductCouponEnd extends VPage<CCoupon> {
    @observable showTips: any = "none";
    private inviteCode: string;
    private url: string;
    private coupon: any;

    async open(param: any) {
        this.coupon = param;
        let { code, product, type, platform } = param;
        if (code) {
            code = String(code);
            let p1 = code.substr(0, 4);
            let p2 = code.substr(4);
            this.inviteCode = p1 + " " + p2;
        }
        this.url = setting.sales.shareUrl(type, code, product.main.id, platform);
        this.openPage(this.page, param);
    }

    comeBack = () => {
        let c = setting.sales.isInner ? 1 : 2;
        this.closePage(c);
    };

    copyClick = (e: any) => {
        copy(e);
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
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
                            {renderBrand(brand)}
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

    private showShare = () => {
        let { discount, type, code } = this.coupon;
        let share: any;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            share = <div className="w-100 text-center py-3" >
                <button className="btn btn-info mx-1 px-4" onClick={() => this.share(this.url)}> 点击分享 </button>
                <button className="btn btn-info mx-1 px-4" onClick={() => this.copyClick(code)}> 复制 </button>
            </div>;
        } else {
            share = <div className="w-100 text-center py-3" >
                <button className="btn btn-info mx-1 px-4" onClick={() => this.copyClick(code)}> 复制 </button>
                <div className="text-center text-white small px-2" style={{ width: '30%', margin: '-80px auto 0 auto', padding: '4px', borderRadius: '3px', backgroundColor: '#505050', display: this.showTips }}>已复制到剪切板</div>
            </div>
        }

        return <>
            <div className="sep-product-select py-4" style={{ margin: "0 auto" }} />
            <div className="row pb-3">
                <div className="col-6 text-center ">
                    <div className="mb-4 h4 m-3 text-info">{this.inviteCode}</div>
                    <QRCode value={this.url} size={100} fgColor="#000000" />
                </div>
                <div className="col-6 text-danger d-flex align-items-end small" >
                    {setting.sales.shareContent(type, discount)}
                </div>
            </div>
            <div >{share}</div>
        </>
    };

    share = async (url: any) => {
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            let { code, type, discount } = this.coupon;
            // @ts-ignore  屏蔽错误
            window.plusShare(
                {
                    title: setting.sales.shareTitle(type), //应用名字
                    content: setting.sales.shareContent(type, discount),
                    href: url, //分享出去后，点击跳转地址
                    //pictures: ["https://agent.jkchemical.com/logonew.png"],//分享的图片
                    thumbs: [setting.sales.sharelogo] //分享缩略图
                },
                function (result) {
                    //分享回调
                }
            );
            await this.controller.addCouponSendHistory(code);
        }
    };

    private page = observer((param: any) => {
        let viewProduct = new ViewMainSubs<MainProductChemical, ProductPackRow>(
            this.renderProduct,
            this.renderPack
        );

        let { product, type } = this.coupon;
        viewProduct.model = product;
        let header = setting.couponType[type];
        return (
            <Page header={header} headerClassName={setting.pageHeaderCss}>
                <div className="bg-white w-100" >
                    <div className="px-2 py-2">{viewProduct.render()}</div>
                    {this.showShare()}
                </div>
            </Page>
        );
    });
}
