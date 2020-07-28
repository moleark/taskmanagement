import * as React from 'react';
import {
    VPage, Page, ItemSchema, UiSchema, Form, Context, ArrSchema, ObjectSchema,
    NumSchema, UiArr, tv, FormField, FA
} from 'tonva';
import { CCoupon } from './CCoupon';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { observable } from 'mobx';
import { GLOABLE } from 'ui';
import { observer } from 'mobx-react';

const schema: ItemSchema[] = [
    {
        name: "vipCardDiscountSetting",
        type: "arr",
        arr: [
            { name: 'brand', type: 'object' } as ObjectSchema,
            { name: 'stdDiscount', type: 'number' } as NumSchema,
            { name: 'discount', type: 'number' } as NumSchema
        ]
    } as ArrSchema,
]

export class VCreateVIPCardDiscount extends VPage<CCoupon> {

    private vipCardDiscountSetting: any[] = [];
    private vipCardLevelDiscountSetting: any[];
    private vipCardLevel: any;
    private vipCardType: any;
    private webUser: any;
    private product: any;
    @observable tips: string;
    private form: Form;

    async open(param: any) {
        let { webUser, vipCardLevel, vipCardType, product, vipCardLevelDiscountSetting } = param;
        this.webUser = webUser;
        this.vipCardLevel = vipCardLevel;
        this.vipCardType = vipCardType;
        this.product = product;
        vipCardLevelDiscountSetting.forEach(v => { v.stdDiscount = 100 - v.discount * 100; v.discount = 100; });
        this.vipCardLevelDiscountSetting = vipCardLevelDiscountSetting;

        for (let i = 0; i < vipCardLevelDiscountSetting.length; i++) {
            this.vipCardDiscountSetting.push(vipCardLevelDiscountSetting[i]); // = vipCardLevelDiscountSetting.slice(0);
        }
        this.vipCardDiscountSetting.sort((a: any, b: any) => { return a.brand.name > b.brand.name ? 0 : 1 });

        this.openPage(this.page);
    }

    private renderBrandDiscount = (item: any) => {
        let { brand, stdDiscount } = item;
        return <div className="row">
            <div className="col-5">
                {tv(brand, v => v.name)}
            </div>
            <div className="col-4">
                <FormField name="discount"></FormField>
            </div>
            <div className="col-3">
                <small className=" ml-3 text-primary">≥{stdDiscount}%</small>
            </div>
        </div>
    }

    private uiSchema: UiSchema = {
        items: {
            vipCardDiscountSetting: {
                widget: 'arr',
                Templet: this.renderBrandDiscount,
                ArrContainer: (label: any, content: JSX.Element) => content,
                RowContainer: (content: JSX.Element) => content,
                RowSeperator: <div className="border border-gray border-top my-1" />,
                items: {
                    discount: {
                        widget: 'custom',
                        className: 'text-cente w-4c',
                        WidgetClass: MinusPlusWidget,
                    }
                }
            } as UiArr,
        }
    }

    private onSubmit = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { createVIPCardDiscountCallback } = this.controller;
        let { vipCardDiscountSetting } = context.form.data;
        if (!vipCardDiscountSetting.every((e: any) => {
            return e.discount >= e.stdDiscount;
        })) {
            this.tips = "有些品牌折扣设置低于规定值，请修改后提交。";
            setTimeout(() => { this.tips = undefined; }, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        let vipCardDiscountSettingCopy = [];
        vipCardDiscountSetting.forEach(element => {
            if (element.discount < 100) vipCardDiscountSettingCopy.push(element);
        });

        vipCardDiscountSettingCopy.forEach(v => v.discount = (100 - v.discount) / 100);
        await createVIPCardDiscountCallback(this.webUser, this.vipCardLevel, this.vipCardType, this.product, vipCardDiscountSettingCopy);
    }

    private tipsUi = observer(() => {
        if (this.tips) {
            return <div className="alert alert-primary" role="alert">
                <FA name="exclamatin-circle" className="text-warning float-left mr-3" size="2x" />
                {this.tips}
            </div>
        }
        return null;
    })

    private page = () => {

        let footer = <button type="button" className="btn btn-primary w-100 " onClick={this.onSubmit}>一键分享</button>;
        let right = <div className="cursor-pointer mx-3 small d-flex" onClick={() => this.controller.cApp.cCoupon.showCouponList("coupon")} >
            <i className="iconfont icon-qita" style={{ fontSize: "20px" }}></i>
        </div>;
        return <Page header="设置品牌折扣" right={right} footer={footer}>
            <Form ref={v => this.form = v} className="bg-white p-3"
                schema={schema} uiSchema={this.uiSchema} formData={{ vipCardDiscountSetting: this.vipCardDiscountSetting }}
                onButtonClick={this.onFormButtonClick} />
            {React.createElement(this.tipsUi)}
        </Page>
    }
}