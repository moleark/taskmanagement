//=== UqApp builder created on Tue Jan 05 2021 18:41:24 GMT-0500 (GMT-05:00) ===//
import { setting } from 'appConfig';
import React from 'react';
import { observable } from 'mobx';
import { VPage, TabProp, TabCaptionComponent, t, TabsProps, PageWebNav, Image, Page } from 'tonva-react';
import { browser } from 'tools/browser';
import { CApp } from './CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
function caption(label: string | JSX.Element, icon: string) {
    return (selected: boolean) => TabCaptionComponent(label, icon, color(selected));
}

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
    /*
protected get tabsProps(): TabsProps {
    let { cHome } = this.controller;
    let tabs: TabProp[] = [
        { name: 'home', caption: caption(t('home'), 'home'), content: cHome.tab },
    ];
    return { tabs };
}
    */


    protected get webNav(): PageWebNav {
        return {
            navHeader: <div>webNav header</div>,
            navFooter: <div>webNav footer</div>,
        };
    }

    count = observable.box<number>(0);
    protected calcSum = () => {
        this.count.set(0);
    }
}
