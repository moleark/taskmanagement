import * as React from 'react';
import { VPage, Page, StringProp, Prop, PropGrid, ComponentProp, tv, LMR, EasyDate, FA } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CCoupon } from './CCoupon';
import { async } from 'q';

export class VCouponDetail extends VPage<CCoupon> {

    private coupon: any;
    async open(coupon: any) {

        this.coupon = coupon;
        this.openPage(this.page);
    }

    private renderisValid(param: any) {
        if (param == 1) {
            return "有效";
        } else {
            return "无效";
        }
    }

    private page = observer(() => {
        let { code, validitydate, discount, preferential, isValid } = this.coupon;
        let { showCouponCustomer } = this.controller;
        let onshowCouponCustomer = async () => await showCouponCustomer(this.coupon);

        var inviteCode = "";
        if (code) {
            code = String(code + 100000000);
            let p1 = code.substr(1, 4);
            let p2 = code.substr(5);
            inviteCode = p1 + ' ' + p2;
        }

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优惠编号：">
                    <div className="mx-3">{inviteCode}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="有 效 期 ：">
                    <div className="mx-3">{<EasyDate date={validitydate} />}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优惠力度：">
                    <div className="mx-3">折扣：{discount} 折  金额：{preferential}￥</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="当前状态：">
                    <div className="mx-3">  {this.renderisValid(isValid)}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCouponCustomer}
                    left={< div > <small><FA name='hand-o-right' className='text-info' /></small> &nbsp;指定客户</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >
            } as ComponentProp
        ];
        return <Page header="优惠码详情" headerClassName={consts.headerClass} footer={<button type="button" className="btn btn-danger flex-grow-1 mx-3 my-1" >作废</button>}>
            <PropGrid className="my-2" rows={rows} values={this.coupon} alignValue="right" />
        </Page>
    })
}