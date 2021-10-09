import * as React from 'react';
import { VPage, Page, LMR, SearchBox, List, EasyDate, FA, DropdownActions, DropdownAction } from 'tonva-react';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { Coupon, EnumCouponType } from 'uq-app/uqs/JkCoupon';

export class VCouponList extends VPage<CCoupon> {

    protected showExpiredCoupon: boolean = false;
    types: EnumCouponType;
    async open(param: any) {
        this.types = param
        this.openPage(this.page);
    }

    protected renderItem = (coupon: Coupon, index: number) => {
        let { showCouponDetail } = this.controller;
        let onshowCouponDetail = async () => await showCouponDetail(coupon.id);

        var inviteCode = "";
        let couponCount = 0;
        let { code, validityDate, isValid } = coupon;
        if (code) {
            code = String(parseInt(code) + 100000000);
            let p1 = code.substr(1, 4);
            let p2 = code.substr(5);
            inviteCode = p1 + ' ' + p2;
        }

        let aleft = <div><i className="iconfont icon-youhuiquantuangou pr-2" style={{ fontSize: "20px", color: "#f6ad15" }}></i>{inviteCode}</div>;
        let aright = <div className="text-muted"><small>有效期：<EasyDate date={validityDate} /></small></div>;
        let bright: any;
        let bleft: any;
        if (couponCount > 0) {
            bleft = <small style={{ borderRadius: "15%/48%" }} className="bg-secondary small text-white px-3" >已使用 {couponCount} 次</small>;
        } else {
            bleft = <span className="mr-1 small px-1" >未使用</span>;
        }
        let nowValue = Date.now();
        let endValue = new Date(validityDate).valueOf();

        if (!this.showExpiredCoupon) {
            if ((nowValue < endValue && isValid === 1)) {
                bright = <small style={{ borderRadius: "15%/48%" }} className="bg-success small text-white px-3" >有效</small>;
                return <LMR className="px-3 py-2" onClick={onshowCouponDetail}>
                    <LMR left={aleft} right={aright}></LMR>
                    <LMR left={bleft} right={bright}></LMR>
                </LMR >
            };
        } else
            if ((nowValue > endValue)) {
                bright = <small style={{ borderRadius: "15%/48%" }} className="bg-danger small text-white px-3" >失效</small>;
                return <LMR className="px-3 py-2" onClick={onshowCouponDetail}>
                    <LMR left={aleft} right={aright}></LMR>
                    <LMR left={bleft} right={bright}></LMR>
                </LMR >
            };

    }

    protected page = observer(() => {
        let { pageCoupon, showCreateCredits, searchByKey, openExpiredCouponHistory } = this.controller;
        let typename: string = "优惠券", right: any;
        if (this.types !== EnumCouponType.Coupon) {
            typename = "积分券";
            right = <div className="cursor-pointer"
                onClick={() => showCreateCredits()} >
                <span className="iconfont ml-1 mr-2 icon-tianjia" style={{ fontSize: "20px", color: "#ffffff" }}></span>
            </div >;
        }
        let header = <div className='d-flex w-100'>
            <span className='pt-1' style={{ width: '5rem' }}>{typename}</span>
            <SearchBox className="px-1 w-100"
                size='sm'
                onSearch={(key: string) => searchByKey(key, this.types)}
                placeholder={"搜索" + typename}
            />
            {right}
            <div className="cursor-pointer px-2" style={{ fontSize: "20px", color: "#ffffff" }}
                onClick={() => openExpiredCouponHistory(this.types)}>
                <FA name="bars" className="small" />
            </div>
        </div>
        let none = <div className="my-3 mx-2 text-warning">还没有{typename}哦！马上添加招揽客户吧！</div>;

        return <Page header={header} onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} />
        </Page >
    })

    protected onScrollBottom = async () => {
        this.controller.pageCoupon.more();
    };
}


export class VExpiredCouponList extends VCouponList {
    showExpiredCoupon: boolean = true;
    async open(param?: any) {
        this.types = param;
        this.openPage(this.page);
    }

    page = observer(() => {
        let { pageCoupon } = this.controller;
        let typename: string = "失效优惠券";
        if (this.types !== EnumCouponType.Coupon) {
            typename = "失效积分券";
        }
        let none = '无';
        return <Page header={typename} onScrollBottom={this.onScrollBottom} >
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} />
        </Page >
    })
}