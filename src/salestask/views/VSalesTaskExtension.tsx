import * as React from 'react';
import { VPage, Page, PageItems, Form, UiSchema, UiInputItem, Context } from 'tonva';
import { CSalesTask } from '../CSalesTask';
import { observer } from 'mobx-react';
import { UiTextAreaItem } from 'tonva';
import { Schema } from 'tonva';
import { Task } from '../model';

const schema: Schema = [
    { name: 'resulttype', type: 'string', required: false },
    { name: 'date', type: 'date', required: true },
    { name: 'result', type: 'string', required: false },
];

export class VSalesTaskExtension extends VPage<CSalesTask> {

    private form: Form;
    private task: Task;
    private uiSchema: UiSchema = {
        items: {
            resulttype: { visible: false },
            date: { widget: 'date', label: '日期', placeholder: '请输入日期！' } as UiInputItem,
            result: { widget: 'textarea', label: '原因', placeholder: '请输入处理结果！', rows: 12 } as UiTextAreaItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private onExtensionTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { result, resulttype, date } = context.form.data;
        await this.controller.extensionTask(this.task, result, resulttype, date);
        this.closePage(2);
    }

    private page = observer((product: any) => {
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onExtensionTask} >完结</button>;
        return <Page header="推迟" footer={footer} >
            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                />
            </div>
        </Page >
    })
}