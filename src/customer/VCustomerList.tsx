import * as React from 'react';
import { VPage, Page, LMR, List, SearchBox, FA, tv, PropGrid, ComponentProp, Prop, EasyDate } from 'tonva';
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

    private renderCustomer(customer: any, index: number) {
        let { name, unit, validity } = customer;

        let left = <span className="font-weight-bold">{name}</span>;
        let right = <div className="text-muted mr-3 "><small> {tv(unit, s => s.name)}</small></div>;
        let date = <span className="small mr-3 " ><EasyDate date={validity} /></span>
        return <LMR className="pl-2 pr-3 py-1">
            <LMR className="px-3 pt-2" left={left} right={right}></LMR>
            <LMR className="px-3" right={date}></LMR>
        </LMR>
    }

    private onClickCustomer = async (model: any) => {
        await this.controller.showCustomerDetail(model.id);
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
                item={{ render: this.renderCustomer, onClick: this.onClickCustomer }} />}
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageCustomer.more();
    }
}