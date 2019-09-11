import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, UiSchema, UiInputItem, UiCheckItem, Context, UiRadio, toUiSelectItems, LMR, FA, Prop, ComponentProp, PropGrid } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { consts } from '../consts';



const schema: Schema = [
    { name: 'Name', type: 'string', required: true },
    { name: 'Salutation', type: 'string', required: false },
    { name: 'Gender', type: 'number', required: false },
    { name: 'BirthDay', type: 'date', required: false },
    { name: 'submit', type: 'submit' },
];

export class VCreateCustomer extends VPage<CCustomer> {
    private customerunit: any;
    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            Name: { widget: 'text', label: '姓名', placeholder: '请输入姓名' } as UiInputItem,
            Salutation: { widget: 'text', label: '称谓', placeholder: '请输入称谓' } as UiInputItem,
            Gender: {
                widget: 'radio', label: '性别', placeholder: '性别',
                defaultValue: 1,
                list: toUiSelectItems(['1:男', '2:女']),
                radioClassName: 'w-min-6c d-inline-block'
            } as UiRadio,
            BirthDay: { widget: 'date', label: '生日', placeholder: '' } as UiInputItem,
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

    private itemss = "cursor-pointer mx-3 my-2 w-100";
    private page = observer(() => {

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'unit',
                component: <LMR className={this.itemss}
                    left={<div> <FA name="university" className="text-info mr-2 pt-1 " /> </div>}>
                    {this.customerunit.name}
                </LMR>,
            } as ComponentProp,
        ];
        return <Page header="新建客户" headerClassName={consts.headerClass} >
            <PropGrid className="my-2" rows={rows} values={null} />
            <Form ref={v => this.form = v} className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
            />
        </Page >
    })
}