import * as React from 'react';
import { VPage, Page, Form, Schema, UiSchema, Context, UiTextAreaItem } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { observer } from 'mobx-react';
import { UiIdItem, UiInputItem } from 'tonva-tools/ui/form/uiSchema';

const schema: Schema = [
    { name: 'resulttype', type: 'id', required: false },
    { name: 'result', type: 'string', required: true },
];


export class VSalesTaskComplet extends VPage<CSalesTask> {

    private form: Form;
    private taskid: number;
    private uiSchema: UiSchema = {
        items: {
            resulttype: { visible: false },
            result: { widget: 'textarea', label: '结果', placeholder: '请输入处理结果！', rows: 12 } as UiTextAreaItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    async open(salestask: any) {
        this.taskid = salestask.id;
        this.openPage(this.page, salestask);
    }

    private onCompletionTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {

        let { result, resulttype } = context.form.data;
        await this.controller.completionTask(this.taskid, result, resulttype);
        this.closePage(2);
    }

    private page = observer((salestask: any) => {

        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onCompletionTask} >完结</button>;
        return <Page header="完结任务" footer={footer} >
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