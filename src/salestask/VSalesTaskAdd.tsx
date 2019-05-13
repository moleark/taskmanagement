import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem, UiCheckItem } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CSalesTask } from './CSalesTask';
import { UiSchema, UiInputItem } from 'tonva-tools/ui/form/uiSchema';
import { tv } from 'tonva-react-uq';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'customer', type: 'id', required: true },
    { name: 'type', type: 'id', required: true },
    { name: 'description', type: 'string', required: false },
    { name: 'priorty', type: 'number', required: false },
    { name: 'deadline', type: 'string', required: true },
    //{ name: 'submit', type: 'submit' },
];

export class VSalesTaskAdd extends VPage<CSalesTask> {
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            customer: {
                widget: 'id', label: '客户', placeholder: '请选择客户',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickCustomer(context, name, value),
                Templet: (item: any) => {

                    let { obj } = item;
                    if (!obj) return <small className="text-muted">请选择客户</small>;
                    let { id, name } = obj;
                    return <>
                        {name}
                    </>;
                }
            } as UiIdItem,
            type: {
                widget: 'id', label: '类型', placeholder: '请选择任务类型',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickTaskType(context, name, value),
                Templet: (item: any) => {

                    let { obj } = item;
                    if (!obj) return <small className="text-muted">请选择任务类型</small>;
                    let { id, name } = obj;
                    return <>
                        {name}
                    </>;
                }
            } as UiIdItem,
            description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' } as UiInputItem,
            priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' } as UiCheckItem,
            deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }

    async open(salestask: any) {

        this.openPage(this.page, salestask);
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.addSalesTask(context.form.data);
        this.closePage(1);
    }

    private page = observer((product: any) => {
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onAddSalesTask}>保存</button>;
        return <Page header="添加任务" footer={footer} >
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
            </div>
        </Page >
    })
}