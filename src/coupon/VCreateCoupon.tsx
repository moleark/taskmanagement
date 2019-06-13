import * as React from 'react';
import { VPage, Page, Schema, Form, UiSchema, UiInputItem, Context, UiRadio, toUiSelectItems } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CCoupon } from './CCoupon';

const schema: Schema = [
    { name: 'type', type: 'string', required: true },
    { name: 'value', type: 'string', required: true },
    { name: 'startdate', type: 'date', required: true },
    { name: 'enddate', type: 'date', required: true },
    { name: 'submit', type: 'submit' },
];

export class VCreateCoupon extends VPage<CCoupon> {
    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            type: {
                widget: 'radio', label: '类型', placeholder: '请选择类型',
                defaultValue: 1,
                list: toUiSelectItems(['1:打折优惠', '2:金额优惠']),
                radioClassName: 'w-min-6c d-inline-block'
            } as UiRadio,
            value: { widget: 'text', label: '优惠幅度', placeholder: '请输入优惠幅度' } as UiInputItem,
            startdate: { widget: 'date', label: '开始时间', placeholder: '请输入单位名称' } as UiInputItem,
            enddate: { widget: 'date', label: '结束时间', placeholder: '请输入单位名称' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: 'btn btn-primary w-8c' },
        }
    }

    async open(param: any) {
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.createCoupon(context.data);
    }

    private page = observer((param: any) => {
        return <Page header="新建优惠码" headerClassName={consts.headerClass} >
            <Form ref={v => this.form = v} className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
            />
        </Page >
    })
}