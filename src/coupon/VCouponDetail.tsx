import * as React from 'react';
import { VPage, Page, StringProp, Prop, PropGrid, ComponentProp, tv, LMR, EasyDate, FA } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CCoupon } from './CCoupon';

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
        let { type, code, value, startdate, enddate, isValid } = this.coupon
        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优惠编号：">
                    <div className="mx-3">{code}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优惠类型：">
                    <div className="mx-3">{tv(type, v => v.name)}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优惠力度：">
                    <div className="mx-3">{value}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="起止日期：">
                    <div className="mx-3">  {<EasyDate date={startdate} />} - {<EasyDate date={enddate} />}</div>
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
                component: <LMR className="cursor-pointer w-100 py-3" onClick={null}
                    left={< div > <small><FA name='hand-o-right' className='text-info' /></small> &nbsp;指定客户</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={null}
                    left={< div > <small><FA name='hand-o-right' className='text-info' /></small> &nbsp;指定产品</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >
            } as ComponentProp
        ];
        return <Page header="优惠码详情" headerClassName={consts.headerClass} footer={<button type="button" className="btn btn-danger flex-grow-1 mx-3 my-1" >作废</button>}>
            <PropGrid className="my-2" rows={rows} values={this.coupon} alignValue="right" />
        </Page>
    })
}