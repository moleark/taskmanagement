import * as React from 'react';
import { VPage, Page, Schema, Form, UiSchema, UiInputItem, Context, UiRadio, toUiSelectItems, Widget, UiCustom, FA, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CCoupon } from './CCoupon';
import { observable } from 'mobx';

const schema: Schema = [
    { name: 'validitydate', type: 'date', required: true },
    { name: 'discount', type: 'string', required: false },
    { name: 'preferential', type: 'string', required: false },
    //{ name: 'submit', type: 'submit' },
];


class ValidityDate extends Widget {
    @observable dateVisible = false;
    private list = [{ value: 1, title: '一周' }, { value: 2, title: '两周' }, { value: 3, title: '一月' }];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        this.dateVisible = val === '0';
        var day2 = new Date();
        if (val === '1') {
            day2.setDate(day2.getDate() + 7);
        } else if (val === '2') {
            day2.setDate(day2.getDate() + 14);
        }
        else if (val === '3') {
            day2.setDate(day2.getDate() + 30);
        }
        let ss = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
        this.setValue(ss);
    }

    render = () => {
        return <div className="form-control" style={{ height: 'auto' }}>
            {this.list.map((v, index) => {
                return <label className="my-1 mx-2"><input type="radio" value={v.value} name="a" onChange={this.onChange} /> {v.title} &nbsp; </label>
            })}
        </div>
    };
}

class Discount extends Widget {
    @observable dateVisible = false;
    private list = [{ value: 9.5, title: '95折' }, { value: 9, title: '9折' }, { value: 8.5, title: '85折' }, { value: 8, title: ' 8  折  ' }, { value: 7, title: '7折' }, { value: 6, title: '6折' }];

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
                return <label className="my-1 mx-2"><input type="radio" value={v.value} name="a" onChange={this.onChange} /> {v.title} &nbsp; </label>
            })}
            <div>
                <label className="my-1 mx-2"><input type="radio" value={-1} name="a" onChange={this.onChange} /> 无 &nbsp;&nbsp;&nbsp;&nbsp; </label>
                <label className="my-1 mx-2"><input type="radio" value={0} name="a" onChange={this.onChange} /> 其他 &nbsp;</label>
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
            customer: { widget: 'text', label: '客户', placeholder: '', onclick: null } as UiInputItem,
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
        let { cCoupon } = this.controller.cApp
        let onshowCreateCoupon = async () => await cCoupon.start();
        let { showAddCouponCustomer, customers } = this.controller;
        let onshowAddCouponCustomer = async () => await showAddCouponCustomer();

        let right = <div onClick={onshowCreateCoupon} className="cursor-pointer py-2 mx-3"><FA name="ellipsis-h" /></div>;
        return <Page header="产生优惠码" headerClassName={consts.headerClass} right={right} >
            <Form ref={v => this.form = v} className="my-3 mx-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
            />
            <LMR className="cursor-pointer w-100 py-3"
                left={< div > <small><FA name='user' className='text-info' /></small> &nbsp;指定客户</div>}
                right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
            </LMR >
        </Page >
    })
}