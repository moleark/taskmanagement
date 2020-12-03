import React from 'react';
import { View, List, LMR, EasyDate, FA } from 'tonva';
import { CCoupon } from './CCoupon';

export class VCouponPage extends View<CCoupon> {

    private applySelectedCoupon = async (coupon: any) => {
        await this.controller.applySelectedCoupon(coupon);
    }
    private showDiscountSetting = (coupon, event: React.MouseEvent) => {
        event.stopPropagation();
        this.controller.showVIPCardDiscount(coupon);
    }

    private renderItem = (coupon: any, index: number) => {
        var inviteCode = "";
        let { code, validitydate, isValid } = coupon;
        coupon.types = 'coupon';

        if (code) {
            code = String(code);
            let p1 = code.substr(0, 4);
            let p2 = code.substr(4);
            inviteCode = p1 + ' ' + p2;
        }

        coupon.code = code + "";
        let nowValue = Date.now();
        let endValue = new Date(validitydate).valueOf();
        let aright: any, bright: any, aleft: any, bleft: any;
        if (nowValue < endValue && isValid === 1) {
            aleft = <div> <span className="text-primary pr-4 pb-1 small">优惠券</span> <FA name='th-large' className='mr-1 text-warning' />{inviteCode}</div >;
            aright = <div className="text-muted"><small>有效期：<EasyDate date={validitydate} /></small></div>;
            bright = <small className="text-success" onClick={(event) => this.showDiscountSetting(coupon, event)}>查看适用品牌及折扣</small>
            return <LMR className="px-3 py-2" onClick={() => this.applySelectedCoupon(coupon)}>
                <LMR left={aleft} right={aright}></LMR>
                <LMR left={bleft} right={bright}></LMR>
            </LMR >
        }
    }
    public render() {
        let { pageCoupon, cApp } = this.controller;
        let couponUi;
        let none = <div className="my-3 mx-2 text-warning">无优惠券</div>;
        couponUi = <>
            <div className='bg-white py-1'>
                <button className="ml-2 btn btn-sm btn-info" onClick={() => this.controller.showCreateCoupon({ type: "coupon", product: undefined })}>
                    {this.t('创建优惠券')}
                </button>
            </div>
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} className='mb-1' />
        </>
        return couponUi

    }
}

export class VCreditsPage extends View<CCoupon> {

    private applySelectedCoupon = async (coupon: any) => {
        await this.controller.applySelectedCoupon(coupon);
    }

    private renderItem = (coupon: any, index: number) => {
        var inviteCode = "";
        let { code, validitydate, isValid } = coupon;
        coupon.types = 'credits';
        if (code) {
            code = String(code);
            let p1 = code.substr(0, 4);
            let p2 = code.substr(4);
            inviteCode = p1 + ' ' + p2;
        }
        coupon.code = code + "";
        let nowValue = Date.now();
        let endValue = new Date(validitydate).valueOf();
        let aright: any, bright: any, aleft: any, bleft: any;
        if (nowValue < endValue && isValid === 1) {
            aleft = <div> <span className="text-primary pr-4 pb-1 small">积分券</span><FA name='th-large' className='mr-1 text-warning' /> {inviteCode}</div>;
            aright = <div className="text-muted"><small>有效期：<EasyDate date={validitydate} /></small></div>;
            bright = <small className="text-success">获取双倍积分</small>
            return <LMR className="px-3 py-2" onClick={() => this.applySelectedCoupon(coupon)}>
                <LMR left={aleft} right={aright}></LMR>
                <LMR left={bleft} right={bright}></LMR>
            </LMR >
        }
    }
    public render() {
        let { pageCredits, cApp } = this.controller;
        let creditsUi;
        let none = <div className="my-3 mx-2 text-warning">无积分券</div>;
        creditsUi = <>
            <div className='bg-white py-1'>
                <button className="ml-2 btn btn-sm btn-info" onClick={() => this.controller.showCreateCredits({ type: 'credits', product: undefined })}>
                    {this.t('创建积分券')}
                </button>
            </div>
            <List before={''} none={none} items={pageCredits} item={{ render: this.renderItem, onClick: null }} />
        </>
        return creditsUi
    }
}




