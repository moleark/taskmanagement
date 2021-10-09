import * as React from 'react';
import { VPage, Page, Image, View } from 'tonva-react';
import { CCoupon } from './CCoupon';
import { VShareCouponBase } from './VShareCouponBase';
import { action, makeObservable, observable } from 'mobx';
import { appSettings } from 'appConfig';

export class VCreateCouponEnd extends VPage<CCoupon> {

    showTips: any = "none"
    private coupon: any;
    private boxedProductsIds: number[] = [];

    constructor(cCoupon: CCoupon) {
        super(cCoupon);
        makeObservable(this, {
            showTips: observable,
        })
    }

    init(param: { coupon: any, boxedProductIds: number[] }) {
        let { coupon, boxedProductIds } = param;
        this.coupon = coupon;
        this.boxedProductsIds = boxedProductIds;
    }

    header() {
        return appSettings.couponType[this.coupon.type];
    }

    content() {
        let { type, code } = this.coupon;
        let url = appSettings.shareUrl(type, code, this.boxedProductsIds, "1");
        return <div id="qrid" className="text-center" >
            <Image src={appSettings.logo} className="mt-4" style={{ width: '40%', height: '40%', margin: '2rem auto, 0 auto' }} />
            <VShareCouponBase coupon={this.coupon} url={url} onReturn={this.onReturn} />
        </div>
    }

    onReturn = () => {
        this.closePage(2);
    }
}