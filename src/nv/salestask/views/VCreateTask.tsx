import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Schema, Form, Context, tv, UiIdItem, UiRadio } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../model';
import { CSalesTask } from '../CSalesTask';

export class VCreateTask extends VPage<CSalesTask> {

    private task: Task;
    private form: Form;
    private saveType: any = 1;
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page);
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
        this.saveType = 1;
    }

    private onCreateAndFinishTask = async (model: any) => {
        if (!this.form) return;
        this.saveType = 0;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {

        let { customer, priorty, deadline, description } = context.form.data;
        this.task.customer = customer;
        this.task.priorty = priorty;
        this.task.deadline = deadline;
        this.task.description = description;
        if (this.saveType == 1) {
            await this.controller.createTask(context.form.data, this.task);
            this.closePage();
        } else {
            await this.controller.createAndFinishTask(this.task);
        }
    }

    private uiSchema: UiSchema = {
        items: {
            customer: {
                widget: 'id', label: '客户', placeholder: '请选择客户',
                pickId: async (context: Context, name: string, value: number) => await this.controller.cApp.cCustomer.call(context, name, value),
                Templet: (item: any) => {
                    let { name, unit } = item;
                    if (!item) return <small className="text-muted">请选择客户</small>;
                    return <div>
                        {name}
                        <small className=" mx-3" >{tv(unit, (v) => <>{v.name}</>)}</small>
                    </div>;
                }
            } as UiIdItem,
            priorty: { widget: 'radio', label: '重要性', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }] } as UiRadio,
            deadline: { widget: 'date', label: '完成时间', placeholder: '要求完成时间' } as UiInputItem,
            description: { widget: 'text', label: '备注', placeholder: '请填写任务备注' } as UiInputItem,
            submit: { widget: 'button', label: '提交' }
        }
    };

    private schema: Schema = [
        { name: 'customer', type: 'id', required: false },
        { name: 'priorty', type: 'string', required: false },
        { name: 'deadline', type: 'date', required: false },
        { name: 'description', type: 'string', required: false },
        //{ name: 'submit', type: 'submit' },
    ];

    private page = observer(() => {

        return <Page header="添加项目" footer={null} headerClassName='bg-primary' >
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    schema={this.schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
                <button type="button" className="btn btn-primary w-100 my-4" onClick={this.onAddSalesTask}>添加任务</button>
                <button type="button" className="btn btn-danger w-100" onClick={this.onCreateAndFinishTask}>处理任务</button>
            </div>
        </Page >
    });
}