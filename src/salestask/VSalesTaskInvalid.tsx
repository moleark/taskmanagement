import * as React from 'react';
import { VPage, Page, Form, Schema, UiSchema, Context, UiTextAreaItem } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { observer } from 'mobx-react';
import { UiIdItem, UiInputItem } from 'tonva-tools/ui/form/uiSchema';
import { Task } from './model';

const schema: Schema = [
    { name: 'resulttype', type: 'id', required: false },
    { name: 'result', type: 'string', required: true },
];


export class VSalesTaskInvalid extends VPage<CSalesTask> {

    private form: Form;
    private task: Task;
    private uiSchema: UiSchema = {
        items: {
            resulttype: { visible: false },
            result: { widget: 'textarea', label: '结果', placeholder: '请输入处理结果！', rows: 12 } as UiTextAreaItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private onInvalidTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { result, resulttype } = context.form.data;
        await this.controller.onInvalidTask(this.task, result, resulttype);
        this.closePage(2);
    }

    private page = observer((salestask: any) => {
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onInvalidTask} >完结</button>;
        return <Page header="拒绝" footer={footer} >
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