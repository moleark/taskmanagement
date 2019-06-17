import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem, UiCheckItem, LMR, FA, List, tv } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../../model';
import { CNewCustomer } from './CNewCustomer';

export class VFinish extends VPage<CNewCustomer> {

    private customer: any;
    private form: Form;

    async open(customer: any) {
        this.customer = customer;
        this.openPage(this.page);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    private onClickItem = async (model: any) => {

        // await this.controller.showCustomerDetail(model.id);
    }


    private renderItem = (item: any, index: number) => {
        let { name, unit } = item;
        let left = <div><FA name='user' className=' my-2 mr-3 text-info' /> <span className="font-weight-bold">{name}</span></div>
        let right = <div className="text-muted  my-2 mr-3 "><small> {tv(unit, s => s.name)}</small></div>;
        return <LMR className="px-3 py-2 " left={left} right={right}></LMR>
    }

    render(task: Task) {
        let none = <div className="my-3 mx-2 text-warning">未找到客户！</div>;
        return <Page headerClassName='bg-primary' header="新客户关联"  >
            <List before={''} none={none} items={this.customer} item={{ render: this.renderItem, onClick: this.onClickItem }} />
        </Page >
    }
}
