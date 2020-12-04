import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, tv, List, LMR, FA, EasyDate, Tabs, TabProp, TabCaptionComponent } from 'tonva';
import { CCoupon } from './CCoupon';

export class VCoupleAvailable extends VPage<CCoupon> {

    async open(param: any) {
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
        let { code, validitydate, isValid, couponCount } = coupon;
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
        if (nowValue < endValue && isValid === 1 && couponCount === 0) {
            aleft = <div> <span className="text-primary pr-4 pb-1 small">优惠券</span> <FA name='th-large' className='mr-1 text-warning' />{inviteCode}</div >;
            aright = <div className="text-muted"><small>有效期：<EasyDate date={validitydate} /></small></div>;
            bright = <small className="text-success" onClick={(event) => this.showDiscountSetting(coupon, event)}>查看适用品牌及折扣</small>
            return <LMR className="px-3 py-2" onClick={() => this.applySelectedCoupon(coupon)}>
                <LMR left={aleft} right={aright}></LMR>
                <LMR left={bleft} right={bright}></LMR>
            </LMR >
        }
    }
    private page = observer(() => {
        let { pageCoupon } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">无优惠券</div>;
        let footer = <div className="w-100 d-flex justify-content-center py-2" >
            <button type="button" className="btn btn-primary mx-1 my-1 px-3"
                onClick={() => this.controller.showCreateCoupon({ type: "coupon", product: undefined, newCoupon: 1 })}>创建优惠券</button>
            <button type="button" className="btn btn-primary mx-1 my-1 px-3"
                onClick={() => this.controller.showCreateCredits({ type: 'credits', product: undefined, newCoupon: 1 })}>使用积分券</button>
        </div>

        return <Page header="选用卡券" footer={footer}>
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} className='mb-1' />
        </Page>
    })
}
