import * as React from 'react';
import { VPage, Page, Schema, Form, UiSchema, UiInputItem, Context, UiRadio, toUiSelectItems, Widget, UiCustom } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CCoupon } from './CCoupon';
import { observable } from 'mobx';

const schema: Schema = [
    { name: 'validitydate', type: 'date', required: true },
    { name: 'discount', type: 'string', required: true },
    { name: 'preferential', type: 'string', required: true },
    { name: 'submit', type: 'submit' },
];


class ValidityDate extends Widget {
    @observable dateVisible = false;
    private list = [{ value: 1, title: '一周' }, { value: 2, title: '一月' }];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        this.dateVisible = val === '0';
        var day2 = new Date();
        if (val === '1') {
            day2.setDate(day2.getDate() + 7);
            let ss = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
            this.setValue(ss);
        } else if (val === '2') {
            day2.setDate(day2.getDate() + 30);
            let ss = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
            this.setValue(ss);
        }
    }

    private onDateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setValue(evt.currentTarget.value);
    }

    render = () => {
        return <div className="form-control" style={{ height: 'auto' }}>
            {this.list.map((v, index) => {
                return <label className="my-1"><input type="radio" value={v.value} name="a" onChange={this.onChange} /> {v.title} &nbsp; </label>
            })}
            <div>
                <label className="my-1"><input type="radio" value={0} name="a" onChange={this.onChange} /> 日期 &nbsp; </label>
                {this.dateVisible && <input type="date" defaultValue={(new Date).toDateString()} onChange={this.onDateChange} />}
            </div>
        </div>
    };
}

class Discount extends Widget {
    @observable dateVisible = false;
    private list = [{ value: 9.5, title: '95折' }, { value: 9, title: '9折' }, { value: 8.5, title: '85折' }, { value: 8, title: '8折' }, { value: 7, title: '7折' }, { value: 6, title: '6折' }, { value: 5, title: '5折' }];

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
                return <label className="my-1"><input type="radio" value={v.value} name="a" onChange={this.onChange} /> {v.title} &nbsp; </label>
            })}
            <div>
                <label className="my-1"><input type="radio" value={0} name="a" onChange={this.onChange} /> 其他 &nbsp; </label>
                {this.dateVisible && <input type="text" className="m-10" onChange={this.onDateChange} />}
            </div>
        </div>
    };
}

export class VCreateCoupon extends VPage<CCoupon> {
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
            } as UiCustom,
            preferential: { widget: 'text', label: '金额', placeholder: '请输入优惠金额' } as UiInputItem,
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