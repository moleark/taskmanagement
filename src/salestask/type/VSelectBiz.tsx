import * as React from 'react';
import { VPage, Page, LMR, List, FA, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CSelectBiz } from './CSelectBiz';

export class VSelectBiz extends VPage<CSelectBiz> {

    async open() {
        this.openPage(this.page);
    }

    private renderItem = (model: any, index: number) => {
        let { biz, type } = model;
        let left = <div className='text-info mr-3' >{tv(type, (obj) => this.controller.cSalesTask.getTaskIcon(biz.obj.name))}</div>
        return <LMR className="px-3 py-2" left={left}>
            <div className="font-weight-bold">{tv(biz, obj => obj.description)}</div>
        </LMR>
    }

    private onClickTaskBiz = async (model: any) => {
        await this.controller.selectTaskBiz(model);
        //this.ceasePage(1);
    }

    private ai = () => {
        return <LMR className="p-3 bg-white mb-1 cursor-pointer" left={<FA className="text-success mr-3 mt-1" name="android" size="lg" fixWidth={true} />}
            onClick={this.controller.aiClick}>
            <div className="font-weight-bold">帮我找找机会</div>
        </LMR>

    }

    private page = () => {
        let { taskType, taskBizs } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">正在筹备中</div>;
        return <Page header={taskType.description || taskType.name} headerClassName='bg-primary' >
            {this.ai()}
            <List none={none} items={taskBizs} item={{ render: this.renderItem, onClick: this.onClickTaskBiz }} />
        </Page>
    };
}