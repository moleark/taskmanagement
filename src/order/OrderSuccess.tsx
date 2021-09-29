import * as React from 'react';
import { VPage, Page, FA, EasyDate, nav } from 'tonva-react';
import { COrder } from './COrder';
import { observable } from 'mobx';
import { GLOABLE } from "ui";

export class OrderSuccess extends VPage<COrder> {
    @observable showTips: any = "none"
    async open(orderCreateResult: any) {
        this.openPage(this.page, orderCreateResult);
    }

    private share = async (orderCreateResult: any) => {
        let { result } = orderCreateResult;
        let { id } = result;
        this.controller.cApp.currentMyCustomer = null;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            this.controller.orderDraftAction(id)
            // @ts-ignore  屏蔽错误  
            window.plusShare(
                {
                    title: '您的订单',
                    content: '根据您的需要制订的订单',
                    href: GLOABLE.carturl + "?type=orderdraft&orderdraftid=" + id
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
        let { cApp } = this.controller;
        return <Page header="下单成功" back="close">
            <div className="py-4 px-3 bg-white mb-3 d-flex">
                <FA name="list-alt" className="text-success mr-3" size="4x" />
                <div>
                    <p className="text-primary">代客户<span className="h4 px-1">{cApp.currentMyCustomer.name}</span>下单成功！</p>
                    <p className="">
                        订单: <span className="h5 text-info">{orderCreateResult.result.no}</span>
                    </p>
                    <p className='text-right mt-2'>
                        <button className="btn btn-outline-success  btn-sm" onClick={() => this.share(orderCreateResult)}>分享</button>
                    </p>
                </div>
            </div>
        </Page>
    }
}