import * as React from 'react';
import { VPage, Page, LMR, SearchBox, FA, List, EasyDate, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';

export class VCouponList extends VPage<CCoupon> {


    async open(param: any) {
        this.openPage(this.page);
    }

    private renderItem = (coupon: any, index: number) => {
        let { showCouponDetail } = this.controller;
        let onshowCouponDetail = async () => await showCouponDetail(coupon.id);

        let { code, startdate, enddate, type, value } = coupon;
        let aleft = <div><FA name='th-large' className=' my-2 mr-3 text-warning' />{code}</div>;
        let aright = <div className="text-muted"><small><EasyDate date={startdate} /> 起</small></div>;

        let bleft = <div><small>{tv(type, v => v.name)}<span className=" mx-3 ">{value}</span></small></div>;
        let bright = <div className="text-muted"><small><EasyDate date={enddate} /> 止</small></div>;
        return <LMR className="px-3 py-2" onClick={onshowCouponDetail}>
            <LMR className="" left={aleft} right={aright}>
            </LMR>
            <LMR className="" right={bright}
                left={bleft}>
            </LMR>
        </LMR >
    }

    private page = observer(() => {
        let { pageCoupon, showCreateCoupon } = this.controller;
        let onshowCreateCoupon = async () => await showCreateCoupon();

        let right = <div onClick={onshowCreateCoupon} className="cursor-pointer py-2"><FA name="plus" /></div>;
        let none = <div className="my-3 mx-2 text-warning">未找到客户！</div>;
        return <Page header='优惠码' headerClassName='bg-primary py-1 px-3' right={right} >
            <SearchBox className="px-1 w-100  mt-2 mr-2  "
                size='md'
                onSearch={null}
                placeholder="搜索客户姓名、单位" />
            <List before={''} none={none} items={pageCoupon} item={{ render: this.renderItem, onClick: null }} />
        </Page>
    })
}
