import * as React from 'react';
import { VPage, Page, PageItems, Form, UiSchema, UiInputItem, Context } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { observer } from 'mobx-react';
import { UiTextAreaItem } from 'tonva-tools/ui/form/uiSchema';
import { Schema } from 'tonva-tools/ui/form/schema';

const schema: Schema = [
    { name: 'resulttype', type: 'string', required: false },
    { name: 'result', type: 'string', required: true },
    { name: 'date', type: 'date', required: true },
];

export class VSalesTaskExtension extends VPage<CSalesTask> {

    private form: Form;
    private taskid: number;
    private uiSchema: UiSchema = {
        items: {
            resulttype: { visible: false },
            result: { widget: 'textarea', label: '结果', placeholder: '请输入处理结果！', rows: 12 } as UiTextAreaItem,
            date: { widget: 'date', label: '日期', placeholder: '请输入日期！' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    async open(salestask: any) {
        this.taskid = salestask.id;
        this.openPage(this.page, salestask);
    }

    private onExtensionTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }


    private onFormButtonClick = async (name: string, context: Context) => {

        let { result, resulttype, date } = context.form.data;
        await this.controller.extensionTask(this.taskid, result, resulttype, date);
        this.closePage(2);
    }

    private page = observer((product: any) => {

        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onExtensionTask} >完结</button>;
        return <Page header="延期任务" footer={footer} >
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