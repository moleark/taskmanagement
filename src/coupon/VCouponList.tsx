import * as React from 'react';
import { VPage, Page, LMR, SearchBox, List, EasyDate, FA, DropdownActions, DropdownAction } from 'tonva';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { setting } from 'appConfig';
import { observable } from 'mobx';

export class VCouponList extends VPage<CCoupon> {
    @observable protected isShowCoupon: boolean = false;
    @observable types: any;
    async open(param: any) {
        this.types = param
        this.openPage(this.page);
    }

    protected renderItem = (coupon: any, index: number) => {
        let { showCouponDetail } = this.controller;
        let onshowCouponDetail = async () => await showCouponDetail(coupon.id);

        var inviteCode = "";
        let { code, validitydate, couponCount, isValid } = coupon;
        if (code) {
            code = String(code + 100000000);
            let p1 = code.substr(1, 4);
            let p2 = code.substr(5);
            inviteCode = p1 + ' ' + p2;
        }

        let aleft = <div><i className="iconfont icon-youhuiquantuangou pr-2" style={{ fontSize: "20px", color: "#f6ad15" }}></i>{inviteCode}</div>;
        let aright = <div className="text-muted"><small>有效期：<EasyDate date={validitydate} /></small></div>;
        let bright: any;
        let bleft: any;
        if (couponCount > 0) {
            bleft = <small style={{ borderRadius: "15%/48%" }} className="bg-secondary small text-white px-3" >已使用 {couponCount} 次</small>;
        } else {
            bleft = <span className="mr-1 small px-1" >未使用</span>;
        }
        let nowValue = Date.now();
        let endValue = new Date(validitydate).valueOf();

        if (!this.isShowCoupon) {
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
        let expiredCoupon = <button type="button" className="btn btn-primary btn-sm p-0 mr-1" style={{ width: '5rem' }}
            onClick={() => this.controller.openExpiredCouponHistory(this.types)}>失效券</button>

        let typename: string = "优惠券", right: any; if (this.types !== "coupon") {
            typename = "积分券";
            right = < div className="cursor-pointer"
                onClick={() => cApp.cCoupon.showCreateCredits({ type: this.types, product: undefined })} >
                <span className="iconfont ml-1 mr-1 icon-tianjia" style={{ fontSize: "20px", color: "#ffffff" }}></span>
            </div >;
        }
        let search = <div className='d-flex w-100'>
            <span className='pt-1' style={{ width: '5rem' }}>{typename}</span>
            <SearchBox className="px-1 w-100"
                size='sm'
                onSearch={(key: string) => this.controller.searchByKey(key, this.types)}
                placeholder={"搜索" + typename}
            />
            {expiredCoupon}
            {right}
        </div>
        let { pageCoupon, cApp } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">还没有{typename}哦！马上添加招揽客户吧！</div>;

        return <Page header={search} onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss}>
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} />
        </Page >
    })

    private onScrollBottom = async () => {
        this.controller.pageCoupon.more();
    };
}


export class VExpiredCouponList extends VCouponList {
    isShowCoupon: boolean = true;
    async open(param?: any) {
        this.types = param;
        this.openPage(this.page);
    }

    page = observer(() => {
        let { pageCoupon } = this.controller;
        let typename: string = "失效优惠券";
        if (this.types !== "coupon") {
            typename = "失效积分券";
        }
        let none = '无';
        return <Page header={typename}>
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} />
        </Page >
    })
}