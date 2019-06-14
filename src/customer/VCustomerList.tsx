import * as React from 'react';
import { VPage, Page, LMR, List, SearchBox, FA, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { async } from 'q';

export class VCustomerList extends VPage<CCustomer> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private renderCustomer(customer: any, index: number) {
        let { name, unit } = customer;
        let left = <div><FA name='user' className=' my-2 mr-3 text-info' /> <span className="font-weight-bold">{name}</span></div>
        let right = <div className="text-muted  my-2 mr-3 "><small> {tv(unit, s => s.name)}</small></div>;
        return <LMR className="px-3 py-2 " left={left} right={right}></LMR>
    }

    private onClickCustomer = async (model: any) => {
        await this.controller.showCustomerDetail(model.id);
    }

    private page = observer((customer: any) => {
        let { pageCustomer, showSelectCustomerUnit } = this.controller;
        let onshowSelectCustomerUnit = async () => await showSelectCustomerUnit();

        let right = <div onClick={onshowSelectCustomerUnit} className="cursor-pointer py-2"><FA name="plus" /></div>;
        let none = <div className="my-3 mx-2 text-warning">未找到客户！</div>;
        return <Page header='客户' headerClassName='bg-primary py-1 px-3' right={right} >
            <SearchBox className="px-1 w-100  mt-2 mr-2  "
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索客户姓名、单位" />
            <List before={''} none={none} items={pageCustomer} item={{ render: this.renderCustomer, onClick: this.onClickCustomer }} />
        </Page>
    })
}