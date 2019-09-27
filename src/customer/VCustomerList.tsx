import * as React from 'react';
import { VPage, Page, LMR, List, FA, tv, ComponentProp, Prop, EasyDate } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';

export class VCustomerList extends VPage<CCustomer> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private renderCustomer = (customer: any, index: number) => {
        let onClickCustomer = async () => await this.controller.showCustomerDetail(customer.id);

        let { name, unit, validity, telephone } = customer;
        let nameShow = <span className="font-weight-bold" onClick={onClickCustomer}>{name}</span>;
        let unitShow = <div className="text-muted" onClick={onClickCustomer}><small> {tv(unit, s => s.name)}</small></div>;
        let date = <span className="small"><EasyDate date={validity} /></span>
        let telephoneShow = <span className="small" ><FA name="phone" className="text-success py-1" /><a className="pl-2 text-default" href={"tel:" + telephone} style={{ textDecorationLine: "none" }} >{telephone}</a></span>

        return <LMR className="pl-2 pr-3 py-1">
            <LMR className="px-3 pt-2" left={nameShow} right={date}>
                <div className="w-100" onClick={onClickCustomer}>&nbsp;  </div>
            </LMR>
            <LMR className="px-3" left={unitShow} right={telephoneShow}></LMR>
        </LMR>
    }

    private page = observer((customer: any) => {
        let { pageCustomer, showSelectOrganization, showCustomerSearch } = this.controller;
        let { showCustomerSearchByUnit } = this.controller.cApp.cCustomerUnit;
        let onShowSelectOrganzation = async () => await showSelectOrganization();
        let onshowCustomerSearch = async () => await showCustomerSearch(null);
        let onshowCustomerSearchByCustomer = async () => await showCustomerSearchByUnit();

        let right = <div className="cursor-pointer py-2">
            <span onClick={onshowCustomerSearch}><FA name="search" className="mr-3" /></span>
            <span onClick={onShowSelectOrganzation}><FA name="plus" /></span>
        </div>;
        let none = <div className="my-3 mx-2 text-warning"></div>;
        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCustomerSearchByCustomer}
                    left={<div><small><FA name='university' className='text-info' /></small> &nbsp;按单位搜索</div>}
                    right={<div className="w-2c text-right" > <i className="fa fa-chevron-right small" /></div >}>
                </LMR >
            } as ComponentProp
        ];

        return <Page header="客户" onScrollBottom={this.onScrollBottom} headerClassName='bg-primary py-1 px-3' right={right} >
            {pageCustomer && pageCustomer.items && (pageCustomer.items.length > 0) && < List before={''} none={none} items={pageCustomer}
                item={{ render: this.renderCustomer }} />}
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageCustomer.more();
    }
}