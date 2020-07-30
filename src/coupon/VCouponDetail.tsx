import * as React from 'react';
import { VPage, Page, Prop, PropGrid, ComponentProp, tv, LMR, EasyDate, List, UserView, User, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { setting } from 'appConfig';

export class VCouponDetail extends VPage<CCoupon> {

    private coupon: any;
    async open(coupon: any) {

        this.coupon = coupon;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { code, validitydate, discount, isValid, customer } = this.coupon;
        var inviteCode: string = "";
        if (code) {
            let p1 = code.substr(0, 4);
            let p2 = code.substr(4);
            inviteCode = p1 + ' ' + p2;
        }
        var discountShow: any;
        discountShow = (1 - discount) * 10;

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优 惠 码：">
                    <div className="mx-3">{inviteCode}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="有 效 期：">
                    <div className="mx-3">{<EasyDate date={validitydate} />}</div>
                </LMR >
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="优 &nbsp; &nbsp; 惠：">
                    <div className="mx-3">折扣：{discountShow.toFixed(1)} 折 </div>
                </LMR >
            } as ComponentProp
        ];
        if (customer !== undefined) {
            rows.push(
                {
                    type: 'component',
                    name: 'customer',
                    component: <>
                        {
                            tv(
                                customer, v =>
                                <LMR className="cursor-pointer w-100 py-3"
                                    left="指定客户："
                                    right={<div>{tv(v.unit, s => s.name)}</div>}>
                                    <div className="mx-3">{v.name}</div>
                                </LMR >
                            )
                        }
                    </>
                } as ComponentProp
            )
        }

        rows.push(
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" left="状 &nbsp; &nbsp; 态：" >
                    <div className="mx-3">  {isValid ? '有效' : '无效'}</div>
                </LMR >
            } as ComponentProp,
        );

        let { invalidCoupon, showShareCoupon, pageCouponReceiveUsed } = this.controller;
        let footer = <div>
            <button onClick={() => invalidCoupon(this.coupon)} type="submit" className="btn btn-danger flex-grow-1 px-3 mx-3">&nbsp; &nbsp; 作废&nbsp; &nbsp; </button>
            <button onClick={() => showShareCoupon({ code: this.coupon.code, type: this.coupon.types, product: undefined })} type="submit" className="btn btn-primary  px-3">&nbsp; &nbsp; 分享&nbsp; &nbsp; </button>
        </div>;
        return <Page header="详情" headerClassName={setting.pageHeaderCss} footer={footer}>
            <PropGrid className="my-2" rows={rows} values={this.coupon} alignValue="right" />
            {pageCouponReceiveUsed.length > 0 &&
                <>
                    <LMR className="cursor-pointer bg-white w-100 mt-2 py-2 pl-3" left="使用记录" ></LMR >
                    <div className="sep-product-select" style={{ margin: "0 auto" }} />
                </>
            }
            {pageCouponReceiveUsed.length > 0 && <List before={''} items={pageCouponReceiveUsed} item={{ render: this.renderItem, onClick: null }} />}
        </Page>
    })

    private renderItem = (itme: any, index: number) => {
        let { receive, used, webuser } = itme;
        return <table className="table text-center small">
            <thead className="text-primary">
                <tr className="bg-white">
                    <th></th>
                    <th>领用</th>
                    <th>使用</th>
                </tr>
            </thead>
            <tbody>
                <tr className="col dec px-3 py-2 bg-white" >
                    <td className="w-3">{<UserView user={webuser} render={this.renderTop} />}</td>
                    <td className="w-3">{receive && <FA name="check" />}</td>
                    <td className="w-3">{used && <FA name="check" />}</td>
                </tr >
            </tbody>
        </table>

    }

    renderTop = (user: User): JSX.Element => {
        let { name, nick } = user;
        return <div>{nick || name}</div>
    }

}