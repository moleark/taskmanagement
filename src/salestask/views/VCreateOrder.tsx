import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Schema, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import { CreateProduct, Task } from '../model';
import { CSalesTask } from '../CSalesTask';
import { setting } from 'appConfig';


const schema: Schema = [
    { name: 'order', type: 'string', required: false },
    //{ name: 'submit', type: 'submit' },
];

export class VCreateOrder extends VPage<CSalesTask> {

    private uiSchema: UiSchema = {
        items: {
            order: { widget: 'text', label: '订单', placeholder: '' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    private form: Form;
    private task: Task;
    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private page = observer((param: any) => {
        return <Page header="添加项目" footer={null} headerClassName={setting.pageHeaderCss}>
            <div className="mx-3">
                <Form ref={v => this.form = v}
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
                <button type="button" className="btn btn-primary w-100" onClick={this.onCreateTaskProject} >添加</button>
            </div>
        </Page >
    });

    private onCreateTaskProject = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let param = { id: this.task.id, ordertype: "order", orderid: context.data.order }
        await this.controller.createOrder(param);
        this.closePage();
    }

}