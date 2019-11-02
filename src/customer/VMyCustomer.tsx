import * as React from 'react';
import { VPage, Page, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, List, EasyDate, FA } from 'tonva';
import { setting } from 'appConfig';


export class VMyCustomer extends VPage<CCustomer> {

    private temp: any;
    async open(temp: any) {
        this.temp = temp;
        this.openPage(this.page);
    }

    private renderCustomer = (customer: any, index: number) => {
        let onClickCustomer = async () => await this.controller.showCustomerDetail(customer.id);

        let { name, unit, validity, mobile } = customer;
        let nameShow = <span className="font-weight-bold" onClick={onClickCustomer}>{name}</span>;
        let unitShow = <div className="text-muted" onClick={onClickCustomer}><small> {tv(unit, s => s.name)}</small></div>;
        let date = <span className="small"><EasyDate date={validity} /></span>
        let telephoneShow = mobile && <span className="small" ><a className="text-default" href={"tel:" + mobile} style={{ textDecorationLine: "none" }} ><FA name="phone" className="text-success px-1" />{mobile}</a></span>

        return <LMR className="px-2 py-1">
            <LMR className="px-1 pt-2" left={nameShow} right={telephoneShow}>
                <div className="w-100" onClick={onClickCustomer}>&nbsp;  </div>
            </LMR>
            <LMR className="px-1" left={unitShow} right={date}></LMR>
        </LMR>
    }

    private page = observer(() => {
        let { pageMyCustomerActive } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;
        var header = <>客户</>;
        if (this.temp === 2) {
            header = <>活跃客户</>;
        }

        return <Page header={header} headerClassName={setting.pageHeaderCss} onScrollBottom={this.onScrollBottom}  >
            <List before={''} none={none} items={pageMyCustomerActive} item={{ render: this.renderCustomer }} />
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageMyCustomerActive.more();
    }
}