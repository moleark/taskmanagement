import * as React from 'react';
import { VPage, Page, PageItems, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, List, EasyDate, SearchBox, FA } from 'tonva';

export class VMyCustomer extends VPage<CCustomer> {

    private temp: any;
    async open(temp: any) {
        this.temp = temp;
        this.openPage(this.page);
    }

    private renderCustomer(customer: any, index: number) {
        let { name, unit, validity } = customer;

        let left = <span className="font-weight-bold">{name}</span>;
        let right = <div className="text-muted mr-3 "><small> {tv(unit)}</small></div>;
        let date = <span className="small mr-3 " ><EasyDate date={validity} /></span>
        return <LMR className="pl-2 pr-3 py-1">
            <LMR className="px-3 pt-2" left={left} right={right}></LMR>
            <LMR className="px-3" right={date}></LMR>
        </LMR>
    }

    private onClickCustomer = async (model: any) => {
        await this.controller.showCustomerDetail(model.id);
    }

    private page = observer(() => {
        let { pageMyCustomerActive } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;
        var header = <>客户</>;
        if (this.temp == 2) {
            header = <>活跃客户</>;
        }

        return <Page header={header} headerClassName='bg-primary' onScrollBottom={this.onScrollBottom}  >
            <List before={''} none={none} items={pageMyCustomerActive} item={{ render: this.renderCustomer, onClick: this.onClickCustomer }} />
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageMyCustomerActive.more();
    }
}