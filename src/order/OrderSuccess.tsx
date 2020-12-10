import * as React from 'react';
import { VPage, Page, FA, EasyDate, nav } from 'tonva';
import { COrder } from './COrder';
import { observable } from 'mobx';
import { GLOABLE } from "ui";

export class OrderSuccess extends VPage<COrder> {
    @observable showTips: any = "none"
    async open(orderCreateResult: any) {

        this.openPage(this.page, orderCreateResult);
    }
    private share = async (orderCreateResult: any) => {
        let { uqs } = this.controller.cApp;
        let { orderDraft } = uqs;
        let { result, couponNo } = orderCreateResult;
        let { id, no, date, flow, state } = result;
        await orderDraft.OrderDraft.action(id, flow, state, "Sended");

        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore  屏蔽错误
            window.plusShare(
                {

                    title: '您的订单', //订单号
                    content: '根据您的需要制订的订单',
                    href: GLOABLE.carturl + "?type=orderdraft & orderdraftid=" + id + "&coupons" + couponNo  //分享出去后，点击跳转地址
                },
                function (result) {
                    //分享回调
                }
            );
        } else {
            this.onTips();
        }
    };
    onTips = () => {
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    }
    private page = (orderCreateResult: any) => {
        return <Page header="下单成功" back="close">
            <div className="py-4 px-3 bg-white mb-3 d-flex">
                <FA name="list-alt" className="text-success mr-3" size="4x" />
                <div>
                    <p className="text-primary"><span className="h4">下单成功！</span></p>
                    <p className="">
                        订单: <span className="h5 text-info">{orderCreateResult.result.no}</span>
                    </p>
                    <p className='text-right mt-2'>
                        <button className="btn btn-outline-success  btn-sm" onClick={() => this.share(orderCreateResult)}>分享确认</button>
                    </p>
                </div>
            </div>
        </Page>
    }
}