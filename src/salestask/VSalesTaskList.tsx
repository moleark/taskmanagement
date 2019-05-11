import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { List, LMR, EasyDate, FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';

export class VSalesTaskList extends VPage<CSalesTask> {

    async open(param: any) {

    }

    render(member: any): JSX.Element {

        return <this.page />;
    }
    private onScrollBottom = async () => {

    }

    //选择任务
    private onSalesTaskClick = async (salestask: any) => {

        this.controller.showSalesTaskDetail(salestask);
    }

    //添加任务
    private onSalesTaskAdd = async (salestask: any) => {

        this.controller.showSalesTaskAdd(salestask);
    }

    private renderSalesTask(salesTask: any, index: number) {

        let { description, deadline, createTime, customer, type } = salesTask;
        let divDeadline: any;
        if (deadline) divDeadline = <div><small className="text-muted">预定：<EasyDate date={deadline} /></small></div>;
        let right = <div className="text-right">
            <div><small className="text-muted"><EasyDate date={createTime} /></small></div>
            {divDeadline}
        </div>;
        return <LMR className="px-3 py-2" right={right}>
            <div className="row">
                <div className="col-sm-4">{tv(type, (v) => <>{v.name}</>)}</div>
                <div className="col-sm-8 font-weight-bold">{tv(customer, (v) => <>{v.name}</>)}</div>
            </div>
            <div>{description}</div>
        </LMR>
    }

    private page = observer(() => {

        let { tasks: pageSalesTask } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关任务！</div>;
        let add = <div onClick={this.onSalesTaskAdd} className="cursor-pointer px-2 py-1"><FA name="plus" /></div>;
        let header = <LMR className="px-3 py-2 bg-primary text-white" right={add} >
            <div >销售任务</div>
        </LMR>
        return <Page header={header} onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={pageSalesTask} item={{ render: this.renderSalesTask, onClick: this.onSalesTaskClick }} />
        </Page>
    });

}

