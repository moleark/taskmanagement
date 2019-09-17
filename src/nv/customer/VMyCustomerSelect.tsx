import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, List, EasyDate, SearchBox, FA } from 'tonva';

export class VMyCustomerSelect extends VPage<CCustomer> {

    private temp: any;
    async open(temp: any) {
        this.temp = temp;
        this.openPage(this.page);
    }

    private renderCustomer(salesTask: any, index: number) {
        let { name } = salesTask;
        return <LMR className="px-3 py-2 " left={<FA name='user' className=' my-2 mr-3 text-info' />}>
            <div className="font-weight-bold"></div>
            <div>{name}</div>
        </LMR >
    }

    private onClickCustomer = async (model: any) => {
        await this.controller.returnCustomer(model);
        this.closePage();
    }

    private page = observer((customer: any) => {
        let { pageCustomer } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">请搜索客户！</div>;
        return <Page header="选择客户" headerClassName='bg-primary'>
            <SearchBox className="px-1 w-100  mt-2 mr-2"
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索客户姓名、单位" />
            <List before={''} none={none} items={pageCustomer} item={{ render: this.renderCustomer, onClick: this.onClickCustomer }} />
        </Page>
    })
}