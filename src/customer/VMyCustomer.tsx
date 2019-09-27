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

    private renderCustomer = (customer: any, index: number) => {
        let onClickCustomer = async () => await this.controller.showCustomerDetail(customer.id);
        let { name, unit, validity, telephone } = customer;
        let nameShow = <span className="font-weight-bold" onClick={onClickCustomer}>{name}</span>;
        let unitShow = <div className="text-muted" onClick={onClickCustomer}><small> {tv(unit, s => s.name)}</small></div>;
        let date = <span className="small " ><EasyDate date={validity} /></span>
        let telephoneShow = <span className="small" ><FA name="phone" className="text-success py-1" /><a className="pl-2 text-default" href={"tel:" + telephone} style={{ lineClamp: "none" }} >{telephone}</a></span>

        return <LMR className="pl-2 pr-3 py-1">
            <LMR className="px-3 pt-2" left={nameShow} right={date}>
                <div className="w-100" onClick={onClickCustomer}>&nbsp;  </div>
            </LMR>
            <LMR className="px-3" left={unitShow} right={telephoneShow}></LMR>
        </LMR>
    }

    private page = observer(() => {
        let { pageMyCustomerActive } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;
        var header = <>客户</>;
        if (this.temp == 2) {
            header = <>活跃客户</>;
        }

        return <Page header={header} headerClassName='bg-primary' onScrollBottom={this.onScrollBottom}  >
            <List before={''} none={none} items={pageMyCustomerActive} item={{ render: this.renderCustomer }} />
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageMyCustomerActive.more();
    }
}