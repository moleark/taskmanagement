import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, UiSchema, UiInputItem, UiCheckItem, Context, UiRadio, toUiSelectItems } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { consts } from 'consts';



const schema: Schema = [
    { name: 'Name', type: 'string', required: true },
    { name: 'FirstName', type: 'string', required: false },
    { name: 'LastName', type: 'string', required: false },
    { name: 'Salutation', type: 'string', required: false },
    { name: 'Gender', type: 'number', required: true },
    { name: 'BirthDay', type: 'date', required: false },
    { name: 'submit', type: 'submit' },
];

export class VCreateCustomer extends VPage<CCustomer> {
    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            Name: { widget: 'text', label: 'Name', placeholder: ' ' } as UiInputItem,
            FirstName: { widget: 'text', label: 'FirstName', placeholder: ' ' } as UiInputItem,
            LastName: { widget: 'text', label: 'LastName', placeholder: ' ' } as UiInputItem,
            Salutation: { widget: 'text', label: '称谓', placeholder: ' ' } as UiInputItem,
            Gender: {
                widget: 'radio', label: '性别', placeholder: '性别',
                defaultValue: 1,
                list: toUiSelectItems(['1:男', '2:女']),
                radioClassName: 'w-min-6c d-inline-block'
            } as UiRadio,
            BirthDay: { widget: 'date', label: '生日', placeholder: ' ' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    }

    async open(param: any) {
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.createMyCustomer(context.data);
    }

    private page = observer((param: any) => {
        return <Page header="新建客户" headerClassName={consts.headerClass} >
            <Form ref={v => this.form = v} className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
            />
        </Page >
    })
}