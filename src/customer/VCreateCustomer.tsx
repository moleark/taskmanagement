import * as React from 'react';
import {
    VPage, Page, Schema, Form, UiSchema, UiInputItem, Context,
    UiRadio, toUiSelectItems, LMR, FA, tv, BoxId
} from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { consts } from '../consts';
import { mobileValidation, nameValidation } from 'tools/inputValidations';

const schema: Schema = [
    { name: 'Name', type: 'string', required: true },
    { name: 'Salutation', type: 'string', required: false },
    { name: 'telephone', type: 'string', required: true },
    { name: 'Gender', type: 'number', required: false },
    //{ name: 'BirthDay', type: 'date', required: false },
    { name: 'submit', type: 'submit' },
];

export class VCreateCustomer extends VPage<CCustomer> {
    private customerunit: BoxId;
    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            Name: { widget: 'text', label: '姓名', placeholder: '请输入姓名', rules: nameValidation } as UiInputItem,
            Salutation: { widget: 'text', label: '称谓', placeholder: '请输入称谓' } as UiInputItem,
            telephone: { widget: 'text', label: '手机号', placeholder: '请输入手机号', rules: mobileValidation } as UiInputItem,
            Gender: {
                widget: 'radio', label: '性别', placeholder: '性别',
                defaultValue: 1,
                list: toUiSelectItems(['1:男', '0:女']),
                radioClassName: 'w-min-6c d-inline-block'
            } as UiRadio,
            //BirthDay: { widget: 'date', label: '生日', placeholder: '' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: 'btn btn-primary w-8c' },
        }
    }

    async open(param: any) {
        this.customerunit = param;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.createMyCustomer(context.data, this.customerunit);
    }

    private page = observer(() => {
        return <Page header="新建客户" headerClassName={consts.headerClass} >
            <LMR className="cursor-pointer pm-3 py-2 bg-white"
                left={<div className="pl-3"><FA name="university" className="text-info mr-2 pt-1" /></div>}>
                {tv(this.customerunit, (v) => v.name)}
            </LMR>
            <Form ref={v => this.form = v} className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
            />
        </Page >
    })
}