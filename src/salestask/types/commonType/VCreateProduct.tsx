import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Schema, Form, Context } from 'tonva';
import { observer } from 'mobx-react';
import { CreateProduct } from '../../model';
import { CSalesTask } from 'salestask/CSalesTask';

const schema: Schema = [
    { name: 'note', type: 'string', required: false },
    //{ name: 'submit', type: 'submit' },
];

export class VCreateProduct extends VPage<CSalesTask> {

    private uiSchema: UiSchema = {
        items: {
            note: { widget: 'textarea', label: '备注', placeholder: '' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }
    private form: Form;
    private createproduct: CreateProduct
    async open(param: CreateProduct) {
        this.createproduct = param;
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });


    private onCreateTaskProduct = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        this.createproduct.note = context.data.note;
        await this.controller.createProduct(this.createproduct);
        this.closePage(2);
    }

    render(param: CreateProduct) {
        return <Page header="添加产品" footer={null} headerClassName='bg-primary'>
            <div className="mx-3">
                <Form ref={v => this.form = v}
                    schema={schema}
                    uiSchema={this.uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
                <button type="button" className="btn btn-primary w-100" onClick={this.onCreateTaskProduct} >添加</button>
            </div>
        </Page >
    }
}