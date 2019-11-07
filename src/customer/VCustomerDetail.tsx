import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, Schema, UiSchema, UiInputItem, UiRadio, tv, LMR, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { CCustomer } from './CCustomer';
import { mobileValidation, nameValidation, emailValidation } from 'tools/inputValidations';
import { GLOABLE } from 'ui';
import { setting } from 'appConfig';

/* eslint-disable */
export const myCustomerSchema: Schema = [
    { name: 'name', type: 'string', required: true },
    { name: 'salutation', type: 'string' },
    { name: 'telephone', type: 'number', required: true },
    { name: 'gender', type: 'number' },
    { name: 'email', type: 'string' },
    { name: 'wechat', type: 'string' },
    // { name: 'teacher', type: 'string' },
    { name: 'potential', type: 'string' },
    { name: 'research', type: 'string' },
    { name: 'addressString', type: 'string' },
];

export const myCustomerUISchema: UiSchema = {
    items: {
        name: { widget: 'text', label: '姓名', placeholder: '请输入姓名', rules: nameValidation } as UiInputItem,
        salutation: { widget: 'text', label: '称谓', placeholder: '请输入称谓' } as UiInputItem,
        telephone: { widget: 'text', label: '手机号', placeholder: '请输入手机号', rules: mobileValidation } as UiInputItem,
        gender: { widget: 'radio', label: '性别', list: [{ value: '1', title: '男' }, { value: '0', title: '女' }] } as UiRadio,
        birthDay: { widget: 'datetime', label: '生日', placeholder: '请输入生日' } as UiInputItem,
        email: { widget: 'text', label: 'Email', placeholder: '请输入Email', rules: emailValidation } as UiInputItem,
        wechat: { widget: 'text', label: '微信', placeholder: '请输入微信号' } as UiInputItem,
        teacher: { widget: 'text', label: '老师', placeholder: '请输入老师姓名' } as UiInputItem,
        addressString: { widget: 'text', label: '地址', placeholder: '请输地址' } as UiInputItem,
        potential: {
            widget: 'radio', label: '潜力值',
            list: [{ value: 0, title: '小于10万' }, { value: 1, title: '10万-30万' }, { value: 2, title: '大于30万' }]
        } as UiRadio,
        research: {
            widget: 'radio', label: '研究方向',
            list: [{ value: 0, title: '有机' }, { value: 1, title: '化学' }, { value: 2, title: '分析' }, { value: 3, title: '材料' }]
        } as UiRadio,
    }
}

const potentialText: { [v: number]: string } = {
    0: "小于10万",
    1: "10万-30万",
    2: "大于30万",
};

const researchText: { [v: number]: string } = {
    0: "有机",
    1: "化学",
    2: "分析",
    3: "材料",
};

const genderText: { [v: number]: string } = {
    0: "女",
    1: "男",

};

export class VCustomerDetail extends VPage<CCustomer> {

    @observable private customer: any;
    @observable isBinded: boolean = false;
    @observable bindTip: any = "";

    async open(customer: any) {
        this.customer = customer;
        this.openPage(this.page, customer);
    }

    private checkBinding = async () => {
        let binded = await this.controller.checkBinding(this.customer);
        if (binded) {
            this.bindTip = <div className="alert alert-danger py-2" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                该客户可能已被绑定</div>
        }
        else {
            this.bindTip = <div className="alert alert-success py-2" role="alert">
                <FA name="check-circle" className="text-warning float-left mr-3" size="2x"></FA>
                可以绑定</div>
        }
        setTimeout(() => {
            this.bindTip = "";
        }, GLOABLE.TIPDISPLAYTIME);
    }

    private page = observer((param: any) => {
        let { cSalesTask } = this.controller.cApp
        let { showCustomerHistory } = cSalesTask;
        let { id: customerid, unit, name, salutation, telephone, gender, email, wechat, teacher, addressString, potential, research, mobile } = param

        var genderShow = gender === undefined ? "" : genderText[gender];
        var potentialShow = potential === undefined ? "[无]" : potentialText[potential];
        var researchShow = research === undefined ? "[无]" : researchText[research];
        let onshowCustomerHistory = async () => await showCustomerHistory(customerid);

        let rows: Prop[] = [];
        if (unit) rows.push(
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3"
                    left={<div><small><FA name='university' className='text-info mr-2' /></small>{tv(unit)}</div>}>
                </LMR >,
            } as ComponentProp
        );
        rows.push({
            type: 'component',
            name: 'customer',
            component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCustomerHistory}
                left={<div><small><FA name='hand-o-right' className='text-info mr-2' /></small>沟通记录</div>}
                right={<div className="w-2c text-right"><i className="fa fa-chevron-right small" /></div >}>
            </LMR >,
        } as ComponentProp
        );
        rows.push({
            type: 'component',
            name: 'name',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>姓名</div>}
                right={<div className="text-right">{name}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (salutation) rows.push({
            type: 'component',
            name: 'salutation',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>称谓</div>}
                right={<div className="text-right">{salutation}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (gender) rows.push({
            type: 'component',
            name: 'salutation',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>性别</div>}
                right={<div className="text-right">{genderShow}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (mobile) rows.push({
            type: 'component',
            name: 'mobile',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>手机号</div>}
                right={<div className="text-right">{mobile}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (telephone) rows.push({
            type: 'component',
            name: 'telephone',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>固话</div>}
                right={<div className="text-right">{telephone}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (email) rows.push({
            type: 'component',
            name: 'email',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>Email</div>}
                right={<div className="text-right">{email}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (wechat) rows.push({
            type: 'component',
            name: 'wechat',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>微信</div>}
                right={<div className="text-right">{wechat}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (teacher) rows.push({
            type: 'component',
            name: 'teacher',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>老师</div>}
                right={<div className="text-right">{teacher}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (addressString) rows.push({
            type: 'component',
            name: 'addressString',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>地址</div>}
                right={<div className="text-right">{addressString}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (potential) rows.push({
            type: 'component',
            name: 'potential',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>潜力值</div>}
                right={<div className="text-right">{potentialShow}</div >}>
            </LMR >,
        } as ComponentProp
        );
        if (research) rows.push({
            type: 'component',
            name: 'research',
            component: <LMR className="cursor-pointer w-100 py-2"
                left={<div><small></small>研究方向</div>}
                right={<div className="text-right">{researchShow}</div >}>
            </LMR >,
        } as ComponentProp
        );

        let { cancelCustomer } = this.controller;
        let { showCustomerEdit } = this.controller;
        let onshowCustomerEdit = async () => await showCustomerEdit(this.customer);
        let oncancelCustomer = async () => await cancelCustomer(this.customer);
        let right = <div className="cursor-pointer" onClick={onshowCustomerEdit}>
            <span><FA name="pencil" className="mr-3" /></span>
        </div>;
        let header: any = <span>{this.customer.name}</span>;
        let footer = <div className="d-block">
            {this.bindTip}
            <div className="w-100  justify-content-end" >
                <button type="button" className="btn btn-primary mx-1 my-1 " onClick={this.checkBinding}>查询绑定</button>
                <button type="button" className="btn btn-primary mx-1 my-1  " onClick={oncancelCustomer}>作废客户</button>
            </div>
        </div>
        return <Page header={header} headerClassName={setting.pageHeaderCss} right={right} footer={footer} >
            <PropGrid className="my-2" rows={rows} values={this.customer} alignValue="right" />
        </Page >
    })
}