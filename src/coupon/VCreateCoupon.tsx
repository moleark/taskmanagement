import * as React from 'react';
import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, Schema, Form, UiSchema, Context, Widget, UiCustom, FA } from 'tonva';
import { consts } from '../consts';
import { CCoupon } from './CCoupon';
import { GLOABLE } from 'ui';

const schema: Schema = [
    { name: 'validitydate', type: 'date', required: false },
    { name: 'discount', type: 'string', required: false },
    { name: 'submit', type: 'submit' },
];

class ValidityDate extends Widget {
    @observable dateVisible = false;
    private list = [
        { value: 1, title: '    一周', name: 'b', checked: true },
        { value: 2, title: '两周', name: 'b', checked: undefined }
    ];

    render = () => {
        return <div className="form-control" style={{ height: 'auto' }}>
            {this.list.map((v, index) => {
                let { value, title } = v;
                return <label className="my-1 mx-3" key={index}>
                    <input type="radio" value={value} name={this.name}
                        defaultChecked={value === this.value} /> {title} &nbsp;
                </label>
            })}
        </div>
    };
}

class Discount extends Widget {
    @observable dateVisible = false;
    private list = [
        { value: 9.5, title: '9.5折', name: 'a', checked: true },
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

const oneWeek = new Date(Date.now() + 7 * 24 * 3600 * 1000);
const twoWeeks = new Date(Date.now() + 7 * 24 * 3600 * 1000);
export class VCreateCoupon extends VPage<CCoupon> {
    @observable showTip: boolean = false;
    tip: string = "";

    private uiSchema: UiSchema = {
        items: {
            validitydate: {
                widget: 'custom',
                label: '有效期',
                WidgetClass: ValidityDate,
                defaultValue: 1,
            } as UiCustom,
            discount: {
                widget: 'custom',
                label: '折扣',
                WidgetClass: Discount,
                defaultValue: 9.5,
            } as UiCustom,
            submit: { widget: 'button', label: '提交', className: 'btn btn-primary w-8c' },
        }
    }

    createParam: any;
    async open(param: any) {
        this.createParam = param;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let data = _.clone(context.data)
        let { validitydate, discount } = data;
        if (validitydate === undefined || discount === undefined) {
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
            return;
        }

        this.showTip = false;
        data.validitydate = this.validDateFrom(validitydate);
        data.discount = _.round(1 - disc * 0.1, 2);


        await this.controller.createCoupon(data, this.createParam);
    }

    private validDateFrom(v: any) {
        let d: Date;
        switch (v) {
            default: return undefined;
            case 1:
                d = oneWeek;
                break;
            case 2:
                d = twoWeeks;
                break;
        }
        return `${d.getFullYear()}-${(d.getMonth() + 1)}-${d.getDate()}`;
    }

    private page = observer((param: any) => {

        let { cCoupon } = this.controller.cApp
        let onshowCreateCoupon = async () => await cCoupon.start();

        let right = <div onClick={onshowCreateCoupon} className="cursor-pointer py-2 mx-3"><FA name="ellipsis-h" /></div>;

        return <Page header="生成优惠券" headerClassName={consts.headerClass} right={right} >
            <Form className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false} />
            {this.showTip && <div className="small text-danger mx-4">{this.tip}</div>}
        </Page >
    })
}