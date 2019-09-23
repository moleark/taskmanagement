import * as React from 'react';
import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, Schema, Form, UiSchema, UiInputItem, Context, UiRadio, toUiSelectItems, Widget, UiCustom, FA, LMR, UiIdItem, tv } from 'tonva';
import { consts } from '../consts';
import { CCoupon } from './CCoupon';
import { GLOABLE } from 'nv/ui';

const schema: Schema = [
    { name: 'validitydate', type: 'date', required: false },
    { name: 'discount', type: 'string', required: false },
    /*
    { name: 'preferential', type: 'string', required: false },
    { name: 'customer', type: 'id', required: false },
    */
    { name: 'submit', type: 'submit' },
];


class ValidityDate extends Widget {
    @observable dateVisible = false;
    private list = [
        { value: 1, title: '    一周', name: 'b', checked: undefined },
        { value: 2, title: '两周', name: 'b', checked: undefined }
    ];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        this.dateVisible = val === '0';
        var day2 = new Date();
        if (val === '1') {
            day2.setDate(day2.getDate() + 7);
        } else if (val === '2') {
            day2.setDate(day2.getDate() + 14);
        }
        let ss = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
        this.setValue(ss);
    }

    render = () => {
        return <div className="form-control" style={{ height: 'auto' }}>
            {this.list.map((v, index) => {
                let { value, title } = v;
                return <label className="my-1 mx-3" key={index}>
                    <input type="radio" value={value} name={this.name} defaultChecked={value === this.value}
                        onChange={this.onChange} /> {title} &nbsp;
                </label>
            })}
        </div>
    };
}

class Discount extends Widget {
    @observable dateVisible = false;
    private list = [
        { value: 9.5, title: '9.5折', name: 'a', checked: undefined },
        { value: 9, title: '9.0折', name: 'a', checked: undefined },
        { value: 8.5, title: '8.5折', name: 'a', checked: undefined },
        { value: 8, title: '8.0折', name: 'a', checked: undefined },
        { value: 7, title: '7.0折', name: 'a', checked: undefined },
        { value: 6, title: '6.0折', name: 'a', checked: undefined }
    ];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        this.dateVisible = val === '0';
        this.setValue(val);
    }

    private onDateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(evt.currentTarget.value);
        if (value < 10) {
            let as = evt.target.value;
            this.setValue(evt.currentTarget.value);
        } else {
            this.setValue(0);
        }
    }

    render = () => {
        return <div className="form-control" style={{ height: 'auto' }}>
            {this.list.map((v, index) => {
                let { value, name, title } = v;
                return <label key={index} className="my-1 mx-3">
                    <input type="radio" value={value}
                        name={name} defaultChecked={value === this.value}
                        onChange={this.onChange} /> {title} &nbsp; </label>
            })}
            <div className="d-flex">
                <label className="my-1 mx-3"><input type="radio" value={10} name="a" onChange={this.onChange} /> 无</label>
                <label className="my-1 mx-3"><input type="radio" value={0} name="a" onChange={this.onChange} /> 其他</label>
                {this.dateVisible && <label className="my-1 mx-3 d-flex"><input type="number" className="form-control w-4c h-2c" onChange={this.onDateChange} /> 折</label>}
            </div>
            <div className="small text-muted px-3 py-2">说明：折扣表示可享最大折扣，具体折扣以下单时为准</div>
        </div>
    };
}

export class VCreateCoupon extends VPage<CCoupon> {
    @observable showTip: boolean = false;
    tip: string = "";

    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            validitydate: {
                widget: 'custom',
                label: '有效期',
                WidgetClass: ValidityDate,
            } as UiCustom,
            discount: {
                widget: 'custom',
                label: '折扣',
                WidgetClass: Discount,
                //discription: '最小折扣',
            } as UiCustom,
            /*
            preferential: { widget: 'text', label: '优惠金额', placeholder: '请输入优惠金额', rules: numberValidation } as UiInputItem,
            customer: {
                widget: 'id', label: '客户', placeholder: '请选择客户',
                pickId: async (context: Context, name: string, value: number) => await this.controller.showAddCouponCustomer(context, name, value),
                Templet: (item: any) => {
                    let { name, unit } = item;
                    if (!item) return <small className="text-muted">请选择客户</small>;
                    return <div>
                        {name}
                        <small className=" mx-3" >{tv(unit, (v) => <>{v.name}</>)}</small>
                    </div>;
                }
            } as UiIdItem,
            */
            submit: { widget: 'button', label: '提交', className: 'btn btn-primary w-8c' },
        }
    }

    async open(param: any) {
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {

        let { validitydate, discount } = context.data;
        if (validitydate == undefined || discount == undefined) {
            this.tip = "提示：请选择有效期和折扣！";
            this.showTip = true;
            setTimeout(() => this.showTip = false, GLOABLE.TIPDISPLAYTIME);
            return;
        }

        let disc = parseFloat(discount);
        if (isNaN(disc) || disc > 10 || disc <= 0) {
            this.tip = "提示：折扣必须是数字，且介于0和10之间！";
            this.showTip = true;
            setTimeout(() => this.showTip = false, GLOABLE.TIPDISPLAYTIME);
        } else {
            this.showTip = false;
            context.data.discount = _.round(1 - disc * 0.1, 2);
            await this.controller.createCoupon(context.data);
        }
    }

    private page = observer((param: any) => {
        let { cCoupon } = this.controller.cApp
        let onshowCreateCoupon = async () => await cCoupon.start();

        let right = <div onClick={onshowCreateCoupon} className="cursor-pointer py-2 mx-3"><FA name="ellipsis-h" /></div>;

        return <Page header="产生优惠码" headerClassName={consts.headerClass} right={right} >
            <Form ref={v => this.form = v} className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false} />
            {this.showTip && <div className="small text-danger mx-4">{this.tip}</div>}
        </Page >
    })
}