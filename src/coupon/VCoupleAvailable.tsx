import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, tv, List, LMR, FA, EasyDate } from 'tonva';
import { CCoupon } from './CCoupon';

export class VCoupleAvailable extends VPage<CCoupon> {
    private type: string;
    async open(param: any) {
        this.type = param;
        this.openPage(this.page);
    }

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
        coupon.types = this.type;
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
            aleft = <div>{this.type === 'coupon' ? <span className="text-primary pr-1 pb-1 small">优惠券</span> : <span>积分券</span>}{inviteCode}</div>;
            aright = <div className="text-muted"><small>有效期：<EasyDate date={validitydate} /></small></div>;
            bright = <small className="text-success" onClick={(event) => this.showDiscountSetting(coupon, event)}>查看适用品牌及折扣</small>
            return <LMR className="px-3 py-2" onClick={() => this.applySelectedCoupon(coupon)}>
                <LMR left={aleft} right={aright}></LMR>
                <LMR left={bleft} right={bright}></LMR>
            </LMR >
        }
    }

    private page = observer(() => {
        let { pageCoupon, cApp } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">无优惠券</div>;
        return <Page header="选用卡券">
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} />
        </Page>
    })
}