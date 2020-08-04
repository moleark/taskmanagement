import * as React from 'react';
import { VPage, Page, LMR, List, tv, EasyDate, UserIcon } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { setting } from 'appConfig';
import smile from '../images/smile-face.jpg';

export class VCustomerList extends VPage<CCustomer> {

    async open() {
        this.openPage(this.page);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private imgSmile = <div className="mt-1 mx-2 w-3c h-3c p-1"><img className="w-100 h-100" src={smile} alt="" /></div>;
    private renderCustomer = (customer: any, index: number) => {
        (customer as any)._source = 'VCustomerList';
        let { name, unit, validity, webuser } = customer;
        let nameShow = <div className="cursor-pointer font-weight-bold w-100">{name}</div>;
        let unitShow = <div className=" cursor-pointer text-muted"><small> {tv(unit, s => s.name)}</small></div>;
        let date = <div className=" cursor-pointer small"><EasyDate date={validity} /></div>
        let left = webuser ?
            <UserIcon className="mt-1 mx-2 w-3c h-3c" id={webuser.id} style={{ borderRadius: '8px' }} />
            :
            this.imgSmile;
        return <LMR onClick={() => this.controller.showCustomerDetail(customer)} className="px-2 py-1" left={left} >
            <LMR className="px-1 pt-2" left={nameShow} ></LMR>
            <LMR className="px-1" left={unitShow} right={date}></LMR>
        </LMR>
    }

    private page = observer(() => {

        let { pageCustomer, showSelectOrganization, showCustomerSearch, showNewCustomerList, onScrollBottom, cApp } = this.controller;
        let right = <div className="cursor-pointer py-1">
            <span onClick={() => showCustomerSearch(null)} className="iconfont icon-icon-chaxun mx-2" style={{ fontSize: "20px", color: "#ffffff" }}></span>
            <span onClick={() => showSelectOrganization(1)} className="iconfont icon-tianjia mx-3" style={{ fontSize: "20px", color: "#ffffff" }}></span>
        </div>;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;

        return <Page header="客户" onScrollBottom={onScrollBottom} headerClassName={setting.pageHeaderCss} right={right} >
            {branch("单位", "icon-photo", () => cApp.cCustomerUnit.start(3))}
            {branch("新客户", "icon-xinyonghu", showNewCustomerList)}
            {(setting.sales.isInner) ? null : branch("任务", "icon-renwuwancheng", () => cApp.cSalesTask.showTask())}

            {
                (pageCustomer && pageCustomer.items && (pageCustomer.items.length > 0)) ?
                    <List before={''} none={none} items={pageCustomer} item={{ render: this.renderCustomer }} />
                    : < div className="m-2 text-warning text-center"> 您还没客户呢,可以添加创建新客户</div>
            }
        </Page >
    })
}

function branch(name: string, icon: string, action: any): JSX.Element {
    let vicon = "iconfont " + icon;
    return <LMR className="bg-white px-3 py-1 "
        left={<div className="mx-2"><i className={vicon} style={{ fontSize: "2rem", color: "#1296db" }}></i></div>}
        right={<i className="pt-2 px-2 iconfont icon-fangxiang1"></i>}
        onClick={action}>
        <div className="mx-3 pt-2 font-weight-bold"  >{name}</div>
    </LMR>;
}