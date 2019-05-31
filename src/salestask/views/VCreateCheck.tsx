import * as React from 'react';
import { VPage, Page, LMR, Prop, ComponentProp, FA, tv, PropGrid } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../model';
import { CSalesTask } from 'salestask/CSalesTask';

export class VCreateCheck extends VPage<CSalesTask> {

    private task: Task
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private onAddTask = async (model: any) => {
        this.task.description = undefined;
        this.task.deadline = undefined;
        this.controller.getCTaskType(this.task.bizName).showCreate(this.task);
    }

    private onFinishTask = async () => {
        this.task.priorty = 0;
        await this.controller.createAndFinishTask(this.task);
        this.closePage();
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    private itemss = "cursor-pointer my-2 w-100";
    render(task: Task) {
        let { showCustomerDetail } = this.controller.cApp.cSalesTask;
        let { customer, type, biz } = task;

        let onClickCustoemr = async () => await showCustomerDetail(customer.id);
        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className={this.itemss} onClick={onClickCustoemr}
                    left={<div> <FA name="user" className="text-info mr-2 pt-1 " /> </div>}
                    right={<div className="text-right"><i className="fa fa-chevron-right" /></div>}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
            } as ComponentProp,
            {
                type: 'component',
                name: 'type',
                component: <LMR className={this.itemss} onClick={onClickCustoemr}
                    left={<div> <FA name="circle" className="text-info mr-2 pt-1" /> </div>}>
                    {tv(type, v => <>{v.description}</>)}
                </LMR>,
            } as ComponentProp,
        ];
        let footer = <div className="d-flex px-1">
            <div className="flex-grow-1 align-self-center justify-content-start">
                <button type="button" className="btn btn-primary" onClick={this.onAddTask} >&nbsp;新建&nbsp;</button>
            </div>
            <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={this.onFinishTask} >处理</button>
        </div>

        let header = <div>{this.task.description}&nbsp;</div>;

        return <Page header={header} footer={footer} headerClassName='bg-primary'>
            <PropGrid className="my-2" rows={rows} values={task} />
        </Page>
    }

}