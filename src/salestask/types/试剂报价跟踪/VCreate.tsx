import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem, UiCheckItem } from 'tonva-tools';
import { observer } from 'mobx-react';
import { UiSchema, UiInputItem } from 'tonva-tools/ui/form/uiSchema';
import { tv } from 'tonva-react-uq';
import { CTaskType, Task } from '../CTaskType';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'customer', type: 'id', required: true },
    { name: 'type', type: 'id', required: true },
    { name: 'description', type: 'string', required: false },
    { name: 'priorty', type: 'number', required: false },
    { name: 'deadline', type: 'string', required: true },
    //{ name: 'submit', type: 'submit' },
];

export class VCreate extends VPage<CTaskType> {
    private task: Task;
    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' } as UiInputItem,
            priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' } as UiCheckItem,
            deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }

    async open(salestask: any) {
        this.task = salestask;
        this.openPage(this.page, salestask);
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.cSalesTask.addSalesTask(context.form.data, this.task);
        this.closePage(1);
    }

    private page = observer((product: any) => {
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onAddSalesTask}>保存</button>;
        return <Page header={this.controller.caption} footer={footer} >
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