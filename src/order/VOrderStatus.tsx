import * as React from 'react';
import { VPage, TabProp, Tabs, TabCaptionComponent, List, EasyDate, nav, tv, LMR, Page } from 'tonva';
import { COrder } from './COrder';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { GLOABLE } from "ui";

export const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
export class VOrderStatus extends VPage<COrder> {

    @observable private list: any[];
    private currentState: string;

    private tabs: TabProp[];
    @observable showTips: any = "none"

    async open() {
        this.openPage(this.page);
    }

    orderStatus: any = [
        { caption: '待确认', state: 'BeingReviewed', toolTip: '无' },
        { caption: '已取消', state: 'Cancel', toolTip: '无' },
        { caption: '已确认', state: 'Pass', toolTip: '无' }
    ];
    private getTabs = async () => {
        let { showMyOrders } = this.controller;
        this.tabs = this.orderStatus.map((v: any) => {
            let { caption, state, icon, toolTip } = v;
            let none = <div>{`${toolTip}`}</div>
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                content: () => {
                    return <List items={this.list} item={{ render: this.renderOrder }} none={none} />
                },
                isSelected: this.currentState === state,
                load: async () => {
                    this.currentState = state;
                    this.list = await showMyOrders(this.currentState);
                }
            };
        });
    }

    private renderOrder = (order: any, index: number) => {
        let { openOrderDetail, cApp } = this.controller;
        let { id, no, date, webUser, counts } = order;
        let { id: webUserId } = webUser;
        let orderName = cApp.cWebUser.renderWebuserName(webUserId);
        let shareCounts = (counts && counts > 0) ? <i>( {counts} )</i> : null;
        let orderno = <div onClick={() => openOrderDetail(id, "draftName")}><span className="small text-muted"></span><strong>{no}</strong></div>
        let orders = (this.currentState === 'BeingReviewed') ? <div className="small cursor-pointer text-primary">
            <span className="text-primary" onClick={() => this.share(order)}>分享 {shareCounts} </span>
        </div> : null;
        let unitShow = <div>{orderName}</div>
        let datetime = <div className="small text-muted"><EasyDate date={date} /></div>
        return <div className='d-flex flex-column  m-2'>
            <LMR className="px-1" left={orderno} right={orders}></LMR>
            <LMR className="px-1" left={unitShow}></LMR>
        </div>
    }

    private onTips = () => {
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    }
    private share = async (order: any) => {
        let { id } = order;
        let result = await this.controller.getResultCode(id)
        let { code } = result;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            this.controller.orderDraftAction(id)
            // @ts-ignore  屏蔽错误
            window.plusShare(
                {
                    title: '您的订单',
                    content: '根据您的需要制订的订单',
                    href: GLOABLE.carturl + "?type=orderdraft&orderdraftid=" + id + "&coupon=" + code
                },
                function (result) {
                    //分享回调
                }
            );
        } else {
            this.onTips();
        }
    };

    private page = observer(() => {
        this.getTabs();
        return <Page header="订单管理" >
            <Tabs tabs={this.tabs} tabPosition="top" />
        </Page>
    })
}
