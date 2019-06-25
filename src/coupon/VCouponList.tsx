import * as React from 'react';
import * as _ from 'lodash';
import { VPage, Page, LMR, SearchBox, FA, List, EasyDate, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { consts } from 'consts';

export class VCouponList extends VPage<CCoupon> {


    async open(param: any) {
        this.openPage(this.page);
    }

    private renderItem = (coupon: any, index: number) => {
        let { showCouponDetail } = this.controller;
        let onshowCouponDetail = async () => await showCouponDetail(coupon.id);
        var inviteCode = "";
        let { code, validitydate, discount, preferential } = coupon;
        if (code) {
            code = String(code + 100000000);
            let p1 = code.substr(1, 4);
            let p2 = code.substr(5);
            inviteCode = p1 + ' ' + p2;
        }

        let aleft = <div><FA name='th-large' className=' my-2 mr-3 text-warning' />{inviteCode}</div>;
        let aright = <div className="text-muted"><small>有效期：<EasyDate date={validitydate} /></small></div>;
        var bcenter: any;
        var bleft: any;
        if (discount) {
            bleft = <div><small>折扣：<span className=" mx-3 ">{discount} 折</span></small></div>;
        }
        if (preferential) {
            bcenter = <div className="text-muted"><small>优惠：<span className="mx-3">￥{preferential}</span></small></div>;
        }

        return <LMR className="px-3 py-2" onClick={onshowCouponDetail}>
            <LMR left={aleft} right={aright}></LMR>
            <LMR left={bleft}>
                {bcenter}
            </LMR>
        </LMR >
    }

    private page = observer(() => {
        let { pageCoupon, showCreateCoupon } = this.controller;
        let onshowCreateCoupon = async () => await showCreateCoupon();

        let right = <div onClick={onshowCreateCoupon} className="cursor-pointer py-2"><FA name="plus" /></div>;
        let none = <div className="my-3 mx-2 text-warning">还没有优惠码哦！马上添加招揽客户吧！</div>;
        return <Page header='优惠码' headerClassName={consts.headerClass} >
            <SearchBox className="px-1 w-100  mt-2 mr-2  "
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索优惠编码"
            />
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} />
        </Page>
    })
}
