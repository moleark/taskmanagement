import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem, UiCheckItem, LMR, Prop, ComponentProp, FA, tv, PropGrid } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../model';
import { CCommonType } from '../types/commonType/CCommonType';
import { CSalesTask } from 'salestask/CSalesTask';

export class VCreateCheck extends VPage<CSalesTask> {

    private task: Task
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private onAddTask = async (model: any) => {
        this.controller.getCTaskType(this.task.biz.name).showCreate(this.task);
    }

    private onFinishTask = async (model: any) => {
        this.controller.finishTask(this.task);
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
                component: <LMR className={this.itemss}
                    left={<div className="mr-2"> <FA name='circle text-info' ></FA></div>}>
                    {tv(type, v => <>{v.description}</>)}
                </LMR>,
            } as ComponentProp,
            {
                type: 'component',
                name: 'biz',
                component: <LMR className={this.itemss}
                    left={<div className="mr-2"><FA name='circle text-info' ></FA></div>}>
                    {tv(biz, v => <>{v.description}</>)}
                </LMR>,
            } as ComponentProp,
        ];
        let footer = <div  >
            <table className="w-100 text-center">
                <tr>
                    <td> <button type="button" className="btn btn-primary w-100" onClick={this.onAddTask}>保存</button></td>
                    <td> <button type="button" className="btn btn-primary w-100" onClick={this.onFinishTask}>处理</button></td>
                </tr>
            </table>
        </div>

        return <Page header="交流记录" footer={footer} >
            <PropGrid className="my-2" rows={rows} values={task} />
        </Page>
    }

}