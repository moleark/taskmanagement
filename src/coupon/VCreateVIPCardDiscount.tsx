import * as React from 'react';
import {
    VPage, Page, ItemSchema, UiSchema, Form, Context, ArrSchema, ObjectSchema, ButtonSchema,
    NumSchema, UiArr, tv, FormField, Edit, UiRange, UiButton
} from 'tonva';
import { CCoupon } from './CCoupon';
import { MinusPlusWidget } from '../tools/minusPlusWidget';

const schema: ItemSchema[] = [
    {
        name: "vipCardDiscountSetting",
        type: "arr",
        arr: [
            { name: 'brand', type: 'object' } as ObjectSchema,
            { name: 'discount', type: 'number' } as NumSchema
        ]
    } as ArrSchema,
    { name: "submit", type: "submit" } as ButtonSchema
]

const eachSchema: ItemSchema[] = [
    { name: 'discount', type: 'number' } as NumSchema
]

export class VCreateVIPCardDiscount extends VPage<CCoupon> {

    private vipCardDiscountSetting: any[];
    async open(param: any) {
        param.forEach(v => v.discount = 100 - v.discount * 100);
        this.vipCardDiscountSetting = param.sort((a: any, b: any) => { return a.brand.name > b.brand.name ? 0 : 1 });

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
            submit: {
                widget: 'button',
                className: "btn btn-primary w-50",
                label: '提交'
            } as UiButton
        }
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { createVIPCardDiscountCallback } = this.controller;
        let { vipCardDiscountSetting } = context.form.data;
        let vipCardDiscountSettingCopy = Array.of(...vipCardDiscountSetting);
        vipCardDiscountSettingCopy.map((v: any) => {
            v.discount = (100 - v.discount) / 100;
            return v;
        }); //.forEach(v => v.discount = (100 - v.discount) / 100);
        await createVIPCardDiscountCallback(vipCardDiscountSettingCopy);
    }

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
        return <Page header="设置品牌折扣">
            <Form className="bg-white p-3"
                schema={schema} uiSchema={this.uiSchema} formData={{ vipCardDiscountSetting: this.vipCardDiscountSetting }} onButtonClick={this.onFormButtonClick} />
        </Page>
    }
}