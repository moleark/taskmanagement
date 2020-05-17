import * as React from 'react';
import {
    VPage, Page, ItemSchema, UiSchema, Form, Context, ArrSchema, ObjectSchema, ButtonSchema,
    NumSchema, UiArr, tv, FormField, Edit, UiRange, UiButton, Tuid, FA
} from 'tonva';
import { CCoupon } from './CCoupon';
import { MinusPlusWidget } from '../tools/minusPlusWidget';
import { observable, reaction } from 'mobx';
import { GLOABLE } from 'ui';
import { observer } from 'mobx-react';

const schema: ItemSchema[] = [
    {
        name: "vipCardDiscountSetting",
        type: "arr",
        arr: [
            { name: 'brand', type: 'object' } as ObjectSchema,
            { name: 'discount', type: 'number' } as NumSchema
        ]
    } as ArrSchema,
]

const eachSchema: ItemSchema[] = [
    { name: 'discount', type: 'number' } as NumSchema
]

export class VCreateVIPCardDiscount extends VPage<CCoupon> {

    private vipCardDiscountSetting: any[] = [];
    private vipCardLevelDiscountSetting: any[];
    private webUser: any;
    @observable tips: string;
    private form: Form;

    async open(param: any) {
        let { webUser, vipCardLevelDiscountSetting } = param;
        this.webUser = webUser;
        vipCardLevelDiscountSetting.forEach(v => v.discount = 100 - v.discount * 100);
        this.vipCardLevelDiscountSetting = vipCardLevelDiscountSetting;

        for (let i = 0; i < vipCardLevelDiscountSetting.length; i++) {
            this.vipCardDiscountSetting.push(vipCardLevelDiscountSetting[i]); // = vipCardLevelDiscountSetting.slice(0);
        }
        this.vipCardDiscountSetting.sort((a: any, b: any) => { return a.brand.name > b.brand.name ? 0 : 1 });

        this.openPage(this.page);
    }

    private renderBrandDiscount = (item: any) => {
        let { brand, discount } = item;
        return <div>
            <div className="row">
                <div className="col-7">
                    {tv(brand, v => v.name)}
                </div>
                <div className="col-5">
                    <FormField name="discount"></FormField>
                </div>
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
                        className: 'text-center',
                        WidgetClass: MinusPlusWidget,
                        // onChanged: this.controller.onDiscountChanged as any
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
            let stdBrandDiscount = this.vipCardLevelDiscountSetting.find((v: any) => Tuid.equ(v.brand, e.brand));
            let stdDiscount = stdBrandDiscount && stdBrandDiscount.discount;
            return e.discount >= stdDiscount;
        })) {
            this.tips = "有些品牌折扣设置低于规定值，请修改后提交。";
            setTimeout(() => { this.tips = undefined; }, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        let vipCardDiscountSettingCopy = [];
        for (let i = 0; i < vipCardDiscountSetting.length; i++) {
            vipCardDiscountSettingCopy.push(vipCardDiscountSetting[i]); // = vipCardLevelDiscountSetting.slice(0);
        }
        vipCardDiscountSettingCopy.forEach(v => v.discount = (100 - v.discount) / 100);
        await createVIPCardDiscountCallback(this.webUser, vipCardDiscountSettingCopy);
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

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        // this.vipCardDiscountSetting.list[name] = newValue;
    }

    private renderEditBrandDiscount = (item: any) => {
        let { brand, discount } = item;
        let eachUISchema: UiSchema = {
            items: {
                discount: {
                    widget: 'range',
                    placeholder: "discount",
                    labelHide: true,
                    min: discount,
                    max: 100,
                    step: 1,
                    defaultValue: discount,
                    // onChanged: this.controller.onDiscountChanged as any
                } as UiRange
            }
        }
        return <div className="d-flex px-3 justify-content-between">
            <div className="">{<>{tv(brand, v => v.name)}</>}</div>
            <Edit className="bg-white p-3"
                schema={eachSchema} uiSchema={eachUISchema} data={item} onItemChanged={this.onItemChanged} />
        </div>
    }

    /*
            <List items={this.vipCardDiscountSetting} item={{ render: this.renderEditBrandDiscount }}>
            </List>
    */
    private page = () => {
        let submitButton = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSubmit}>提交</button>;
        return <Page header="设置品牌折扣">
            <Form ref={v => this.form = v} className="bg-white p-3"
                schema={schema} uiSchema={this.uiSchema} formData={{ vipCardDiscountSetting: this.vipCardDiscountSetting }}
                onButtonClick={this.onFormButtonClick} />
            {React.createElement(this.tipsUi)}
            {submitButton}
        </Page>
    }
}