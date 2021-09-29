import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Image } from 'tonva-react';
import { observable } from 'mobx';
import { CApp } from 'uq-app';
import { setting } from 'appConfig';
import { browser } from 'tools/browser';
/* eslint-disable */
const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.calcSum();
        this.openPage(this.render);
    }

    opensrc = () => {
        window.open(setting.sales.downloadAppurl);
    }

    render = (param?: any): JSX.Element => {
        let { cCustomer, cProduct, cMe, cMessage, cBalance, cPost, cHome, cSalesTask } = this.controller;
        let faceTabs: any[];
        if (setting.sales.isInner) {
            faceTabs = [
                { name: 'home', label: '任务', content: cSalesTask.tab, icon: 'tasks', onShown: cSalesTask.init, notify: undefined/*store.homeCount*/ },
                { name: 'member', label: '客户', content: cCustomer.tab, icon: 'vcard', onScrollBottom: cCustomer.onScrollBottom },
                { name: 'member', label: '产品', content: cProduct.tab, icon: 'gift', onScrollBottom: cProduct.onScrollBottom },
                { name: 'member', label: '我的', content: cMe.tab, icon: 'user', onShown: cBalance.getComputeAchievement, load: cMe.load, notify: cMessage.count },
            ].map(v => {
                let { name, label, icon, content, notify, load, onShown, onScrollBottom } = v;
                return {
                    name: name,
                    caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                    content: content,
                    notify: notify,
                    load: load,
                    onShown: onShown,
                    onScrollBottom,
                }
            });
        } else {
            faceTabs = [
                { name: 'member', label: '首页', content: cHome.tab, icon: 'home', notify: undefined },
                { name: 'member', label: '客户', content: cCustomer.tab, icon: 'vcard', onScrollBottom: cCustomer.onScrollBottom },
                { name: 'home', label: '帖文', content: cPost.tab, icon: 'tasks', onScrollBottom: cPost.onScrollBottom, notify: undefined },
                { name: 'member', label: '我的', content: cMe.tab, icon: 'user', onShown: cBalance.getComputeAchievement, load: cMe.load, notify: cMessage.count },
            ].map(v => {
                let { name, label, icon, content, notify, load, onShown, onScrollBottom } = v;
                return {
                    name: name,
                    caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                    content: content,
                    notify: notify,
                    load: load,
                    onShown: onShown,
                    onScrollBottom,
                }
            });
        }

        let header: any = false;
        if (!browser.versions.html5Plus && browser.versions.android) {
            header = <div className="w-100 mx-3 d-flex  justify-content-between">
                <div>
                    <Image src={setting.sales.logo} style={{ width: "25px", height: "25px" }} ></Image>
                    <span className="small mx-2" >{setting.sales.appName}APP</span>
                </div >
                <div>  <a download onClick={this.opensrc} className="small">立即打开</a></div>
            </div >;
        }

        return <Page header={header} headerClassName={"bg-info"} tabsProps={{ tabs: faceTabs }}>
        </Page>;
    }


    count = observable.box<number>(0);
    protected calcSum = () => {
        this.count.set(0);
    }
}
