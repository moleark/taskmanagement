import * as React from 'react';
import { VPage, Page, ItemSchema, StringSchema, UiSchema, UiRadio, Form, Context, ButtonSchema, UiButton } from 'tonva';
import { CCustomer } from './CCustomer';
import { VCreateCouponEnd } from 'coupon/VCreateCouponEnd';

const schema: ItemSchema[] = [
    { name: "vipCardType", type: "string", required: true } as StringSchema,
    { name: "submit", type: "submit" } as ButtonSchema
]

const uiSchema: UiSchema = {
    items: {
        vipCardType: { widget: 'radio', label: "级别" } as UiRadio,
        submit: { widget: 'button', label: '提交', className: 'btn btn-primary' } as UiButton
    }
}

export class VCreateVIPCard extends VPage<CCustomer>{

    private customer: any;
    async open(param: any) {
        this.customer = param.customer;
        ((uiSchema.items.vipCardType) as UiRadio).list = param.vipCardTypes.map(v => { return { value: v.id, title: v.name + ' - ' + v.description } });
        this.openPage(this.page, param);
    }

    private onFormButtonClick = async (name: string, context: Context) => {

        let { createVIPCard, showSharedVIPCard, backPage } = this.controller;
        let vipCard = await createVIPCard(this.customer.user, context.form.data.vipCardType);
        // 跳转到分享界面
        backPage();
        showSharedVIPCard(vipCard);
    }

    private page = () => {
        return <Page header="创建VIP卡">
            <div>{this.customer.name}</div>
            <Form className="my-3"
                schema={schema}
                uiSchema={uiSchema}
                formData={{ vipCardType: 1 }}
                onButtonClick={this.onFormButtonClick}
            />
        </Page>
    }
}