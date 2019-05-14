import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, List, EasyDate, SearchBox } from 'tonva-react-form';

export class VCustomerSelect extends VPage<CCustomer> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }


    private renderCustomer(salesTask: any, index: number) {

        let { name } = salesTask;

        return <LMR className="px-3 py-2" >
            <div className="font-weight-bold">{}</div>
            <div>{name}</div>
        </LMR>

    }

    private onClickCustomer = async (model: any) => {

        await this.controller.selectCustomer(model);
        this.ceasePage();
    }

    private page = observer((customer: any) => {

        let { pageCustomer } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">请搜索客户！</div>;

        let size: any = "sm";

        return <Page header="选择客户">
            <SearchBox className="px-1 w-100  mt-2 mr-2"
                size={size}
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索客户姓名、单位" />
            <List before={''} none={none} items={pageCustomer} item={{ render: this.renderCustomer, onClick: this.onClickCustomer }} />
        </Page>
    })
}