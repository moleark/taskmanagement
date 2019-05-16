import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CSelectType } from './CSelectType';
import { LMR, List, FA } from 'tonva-react-form';

export class VSelectType extends VPage<CSelectType> {

    async open(customer: any) {
        this.openPage(this.page, customer);
    }

    private renderList = (model: any, index: number) => {
        let { description, name } = model;
        let left = <div className='text-info mr-3' >{this.controller.cSalesTask.taskIcon(name)}</div>
        return <LMR className="px-3 py-2" left={left}>
            <div className="font-weight-bold">{name}</div>
        </LMR>
    }

    private onClickTaskType = async (model: any) => {
        await this.controller.selectTaskType(model);
        this.ceasePage(1);
    }

    private ai = () => {
        return <LMR className="p-3 bg-white mb-1 cursor-pointer" left={<FA className="text-success mr-3 mt-1" name="android" size="lg" fixWidth={true} />}
            onClick={this.controller.aiClick}>
            <div className="font-weight-bold">帮我找找机会</div>
        </LMR>
    }

    private page = observer((customer: any) => {
        let { tasktypelist, selectTaskType } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关产品，请重新搜索！</div>;
        return <Page header="新建任务" >
            {this.ai()}
            <List before={''} none={none} items={tasktypelist} item={{ render: this.renderList, onClick: this.onClickTaskType }} />
        </Page>
    })
}