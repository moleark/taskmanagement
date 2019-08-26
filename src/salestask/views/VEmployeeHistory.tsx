import * as React from 'react';
import { VPage, Page, nav, BoxId } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate, FA } from 'tonva';
import { CSalesTask } from '../CSalesTask';
import { tv } from 'tonva';
import { consts } from 'consts';

export class VEmployeeHistory extends VPage<CSalesTask> {

    private tasks: any;
    async open(tasks: any) {
        if (tasks.length > 0) {
            this.tasks = tasks;
        } else {
            this.tasks = null;
        }
        this.openPage(this.page);
    }

    private renderHistory = (taskhistory: any, index: number) => {
        let { task, date, status, biz, result } = taskhistory;

        return <div className="d-block p-3">
            <LMR >
                <div><small className="text-muted"><EasyDate date={date} /> </small></div>
                <LMR right={<small>  {tv(status, (v) => v.name)}</small>}
                    left={<div><span><FA name='user' className='mr-3 text-info' ></FA></span>{tv(task, (v) => tv(v.customer, (vs) => vs.name))}</div>} >
                </LMR>
                <LMR right={<small>{tv(task, (v) => tv(v.type, (vs) => vs.description || '#'))}</small>}
                    left={<small>{tv(task, (v) => tv(v.biz, (vs) => vs.description || '#'))}</small>}>
                </LMR>
            </LMR>
        </div >;
    }

    //选择任务
    private onTaskClick = async (param: any) => {
        this.controller.showDetailFromId(param.task.obj);
    }

    private page = observer(() => {
        let none = <div className="m-3 text-muted small">【无记录】</div>;
        return <Page header="已完成任务" headerClassName={consts.headerClass}>
            <List before={''} none={none} items={this.tasks} item={{ render: this.renderHistory, onClick: this.onTaskClick }} />
        </Page>
    })
}