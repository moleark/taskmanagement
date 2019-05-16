import * as React from 'react';
import { VPage, Page, nav } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate, FA } from 'tonva-react-form';
import { CSalesTask } from '../CSalesTask';
import { tv } from 'tonva-react-uq';

export class VCustomerHistory extends VPage<CSalesTask> {

    async open(tasks: any) {
        this.openPage(this.page, tasks);
    }

    private renderHistory = (taskhistory: any, index: number) => {
        let { task, date, status, principal, result } = taskhistory;
        // right={tv(principal)}
        return <div className="d-block p-3">
            <LMR>
                <div><small className="text-muted"><EasyDate date={date} /> {tv(status, (v) => v.name)}</small></div>
                {tv(task, (v) => tv(v.type, (vs) => vs.name))}
            </LMR>
            <small>{result}</small>
        </div >;
    }

    //选择任务
    private onSalesTaskClick = async (param: any) => {
        let tasks = param.task.obj;
        let task = {
            id: tasks.id,
            type: tasks.type,
            typeName: tasks.type.obj.name,
            description: null,
            remindDate: null,
            deadline: null,
            customer: tasks.customer
        }
        this.controller.showSalesTaskDetail(task);
    }

    private page = observer((tasks: any) => {

        let none = <div className="m-3 text-muted small">【无记录】</div>;
        return <Page header="沟通记录" >
            <List before={''} none={none} items={tasks.tasks} item={{ render: this.renderHistory, onClick: this.onSalesTaskClick }} />
        </Page>
    })
}