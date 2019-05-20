import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, List, EasyDate, SearchBox, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva';

export class VCustomerList extends VPage<CCustomer> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private renderCustomer(salesTask: any, index: number) {

        let { name } = salesTask;

        return <LMR className="px-3 py-2 " left={<FA name='user' className=' my-2 mr-3 text-info' />}>
            <div className="font-weight-bold">{}</div>
            <div>{name}</div>
        </LMR>

    }

    private onClickCustomer = async (model: any) => {

        await this.controller.showCustomerDetail(model.id);
    }

    private page = observer((customer: any) => {

        let { pageCustomer } = this.controller;
        let add = <div className="cursor-pointer"><FA name="plus" /></div>;
        let none = <div className="my-3 mx-2 text-warning">请搜索客户！</div>;
        return <Page header='客户' right={add} headerClassName='bg-primary py-1 px-3' >
            <SearchBox className="px-1 w-100  mt-2 mr-2  "
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索客户姓名、单位" />

            <List before={''} none={none} items={pageCustomer} item={{ render: this.renderCustomer, onClick: this.onClickCustomer }} />
        </Page>
    })
}