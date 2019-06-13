import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva';
import { observer } from 'mobx-react';
import { CSelectType } from './CSelectType';
import { LMR, List, FA } from 'tonva';
import { async } from 'q';

export class VSelectType extends VPage<CSelectType> {

    async open(customer: any) {
        this.openPage(this.page, customer);
    }

    private renderList = (model: any, index: number) => {
        let { description, name } = model;
        let left = <div className='text-info mr-3' >{this.controller.cSalesTask.getTaskIcon(name)}</div>
        return <LMR className="px-3 py-2" left={left}>
            <div className="font-weight-bold">{description}</div>
        </LMR>
    }

    private onClickTaskType = async (model: any) => {
        await this.controller.selectTaskType(model);
        //this.ceasePage(1);
    }

    private ai = () => {
        let { cCustomer } = this.controller.cSalesTask.cApp;
        let onshowCreateCustomer = async () => await cCustomer.showSelectCustomerUnit();

        return <div>
            <LMR className="p-3 bg-white mb-1 cursor-pointer" left={<FA className="text-success mr-3 mt-1" name="android" size="lg" fixWidth={true} />}
                onClick={this.controller.aiClick}>
                <div className="font-weight-bold">帮我找找机会</div>
            </LMR>
            <LMR className="p-3 bg-white mb-1 cursor-pointer" left={<FA className="text-success mr-3 mt-1" name="vcard" size="lg" fixWidth={true} />}
                onClick={onshowCreateCustomer}>
                <div className="font-weight-bold">新建客户</div>
            </LMR>
        </div>
    }

    private page = ((customer: any) => {
        let { tasktypelist } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">无任务类型！</div>;
        return <Page header="新建任务" headerClassName='bg-primary' >
            {this.ai()}
            <List none={none} items={tasktypelist} item={{ render: this.renderList, onClick: this.onClickTaskType }} />
        </Page>
    })
}