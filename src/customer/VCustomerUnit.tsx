import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate, SearchBox, FA } from 'tonva';
import { CCustomerUnit } from './CCustomerUnit';

export class VCustomerUnit extends VPage<CCustomerUnit> {

    async open(customer: any) {
        this.openPage(this.page, customer);
    }

    private renderItem(salesTask: any, index: number) {
        let { name } = salesTask;
        return <LMR className="px-3 py-1 " left={<FA name='university' className=' my-2 mr-3 text-info' />}>
            <div className="font-weight-bold"></div>
            <div>{name}</div>
        </LMR >
    }

    private onClickRow = async (model: any) => {
        await this.controller.showCreateCustomer(model);
        //this.ceasePage();
    }

    private page = observer((customer: any) => {
        let { pageUnit, showCreateUnit } = this.controller;
        let onshowCreateUnit = async () => await showCreateUnit();

        let none = <div className="my-3 mx-2 text-warning">没有搜索到单位！</div>;
        let right = <div onClick={onshowCreateUnit} className="cursor-pointer px-3 py-2"><FA name="plus" /></div>;
        return <Page header="选择单位" headerClassName='bg-primary' right={right}>
            <SearchBox className="px-1 w-100  mt-2 mr-2"
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索单位" />
            <List before={''} none={none} items={pageUnit} item={{ render: this.renderItem, onClick: this.onClickRow }} />
        </Page>
    })
}