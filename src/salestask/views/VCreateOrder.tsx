import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Schema, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import { CSalesTask } from '../CSalesTask';
import { setting } from 'appConfig';
import { Task } from 'salestask/model';


const schema: Schema = [
    { name: 'order', type: 'string', required: false },
    //{ name: 'submit', type: 'submit' },
];

export class VCreateOrder extends VPage<CSalesTask> {

    private uiSchema: UiSchema = {
        items: {
            order: { widget: 'text', label: '编号', placeholder: '编号' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    private form: Form;
    private task: any;
    async open(param: any) {
        this.task = param;
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let header = param.type === "order" ? "添加订单" : "添加询单";
        return <Page header={header} footer={null} headerClassName={setting.pageHeaderCss}>
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
        let param = { id: this.task.id, ordertype: this.task.type, orderid: context.data.order }
        await this.controller.createOrder(param);
        this.closePage();
    }

}