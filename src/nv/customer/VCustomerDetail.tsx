import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, PageItems, Schema, UiSchema, UiInputItem, UiRadio, Edit, ItemSchema, nav, UiIdItem, Context } from 'tonva';
import { tv } from 'tonva';
import { LMR, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { CCustomer } from './CCustomer';
import { consts } from '../consts';
import { mobileValidation, nameValidation, emailValidation } from 'nv/tools/inputValidations';
import { GLOABLE } from 'nv/ui';

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

export class VCustomerDetail extends VPage<CCustomer> {

    @observable private customer: any;
    @observable isBinded: boolean = false;
    @observable bindTip: any = "";

    async open(customer: any) {
        this.customer = customer;
        this.openPage(this.page, customer);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.customer[name] = newValue;
        await this.controller.updateMyCustomer(this.customer);
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
        let { cSalesTask, cCustomerUnit, cCustomer } = this.controller.cApp
        let { showCustomerHistory } = cSalesTask;
        let { id: customerid, unit } = param
        let { showCustomerUnitDetail } = cCustomerUnit;

        let onshowCustomerHistory = async () => await showCustomerHistory(customerid);
        let onshowCustomerUnitDetail = async () => await showCustomerUnitDetail(unit);

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3"
                    left={<div><small><FA name='university' className='text-info mr-2' /></small>{tv(unit, v => v.name)}</div>}>
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCustomerHistory}
                    left={<div><small><FA name='hand-o-right' className='text-info mr-2' /></small>沟通记录</div>}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right small" /></div >}>
                </LMR >,
            } as ComponentProp,
            /**{
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCustomerSelect}
                    left={< div > <small><FA name='share-alt' className='text-info' /></small> &nbsp;内部客户</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right small" /></div >}>
                    <div className="px-3"> {innerCustomer && tv(innerCustomer, v => v.name)}</div>
                </LMR >,
            } as ComponentProp**/
        ];

        let header: any = <span>{this.customer.name}</span>;
        let footer = <div className="d-block">
            {this.bindTip}
            <div>
                <button type="button" className="btn btn-danger flex-grow-1 mx-3 my-1 w-100" onClick={this.checkBinding}>查询绑定关系</button>
            </div>
        </div>
        return <Page header={header} headerClassName={consts.headerClass} footer={footer}>
            <PropGrid className="my-2" rows={rows} values={this.customer} alignValue="right" />
            <Edit
                schema={myCustomerSchema}
                uiSchema={myCustomerUISchema}
                data={this.customer}
                onItemChanged={this.onItemChanged} />
        </Page>
    })
}