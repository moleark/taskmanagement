import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, PageItems, Schema, UiSchema, UiInputItem, UiRadio, Edit, ItemSchema, nav, UiIdItem, Context } from 'tonva';
import { tv } from 'tonva';
import { LMR, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { CCustomer } from './CCustomer';
import { consts } from '../consts';

const schema: Schema = [
    { name: 'name', type: 'string' },
    { name: 'telephone', type: 'number' },
    { name: 'email', type: 'string' },
    { name: 'wechat', type: 'string' },
    { name: 'teacher', type: 'string' },
    { name: 'potential', type: 'string' },
    { name: 'research', type: 'string' },
    { name: 'addressString', type: 'string' },
];

export class VCustomerDetail extends VPage<CCustomer> {

    @observable private customer: any;
    private uiSchema: UiSchema = {
        items: {
            name: { widget: 'text', label: '姓名', placeholder: '请输入姓名' } as UiInputItem,
            telephone: { widget: 'text', label: '电话', placeholder: '请输入电话' } as UiInputItem,
            gender: { widget: 'radio', label: '潜力值', defaultValue: 1, list: [{ value: 0, title: '男' }, { value: 1, title: '女' }] } as UiRadio,
            birthDay: { widget: 'datetime', label: '生日', placeholder: '请输入生日' } as UiInputItem,
            email: { widget: 'text', label: '邮箱', placeholder: '请输入邮箱' } as UiInputItem,
            wechat: { widget: 'text', label: '微信', placeholder: '请输入微信号' } as UiInputItem,
            teacher: { widget: 'text', label: '老师', placeholder: '请输入老师' } as UiInputItem,
            addressString: { widget: 'text', label: '地址', placeholder: '请输地址' } as UiInputItem,
            potential: { widget: 'radio', label: '潜力值', defaultValue: 1, list: [{ value: 0, title: '小于10万' }, { value: 1, title: '10万-30万' }, { value: 2, title: '大于30万' }] } as UiRadio,
            research: { widget: 'radio', label: '研究方向', defaultValue: 1, list: [{ value: 0, title: '有机' }, { value: 1, title: '化学' }, { value: 1, title: '分析' }, { value: 1, title: '材料' }] } as UiRadio,
        }
    }

    async open(customer: any) {
        this.customer = customer;
        this.openPage(this.page, customer);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.customer[name] = newValue;
        await this.controller.updateMyCustomer(this.customer);

    }

    private page = observer((param: any) => {
        let { cSalesTask, cCustomerUnit, cCustomer } = this.controller.cApp
        let { showCustomerHistory } = cSalesTask;
        let { id: customerid, IsOccupy, unit } = param
        let { showCustomerUnitDetail } = cCustomerUnit;
        let { showInnerCustomerSelect: showCustomerSelect } = cCustomer;
        let { innerCustomer } = this.controller;

        let onshowCustomerHistory = async () => await showCustomerHistory(customerid);
        let onshowCustomerUnitDetail = async () => await showCustomerUnitDetail(unit);
        let onshowCustomerSelect = async () => await showCustomerSelect(customerid);

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCustomerUnitDetail}
                    left={< div > <small><FA name='university' className='text-info' /></small> &nbsp;{tv(unit, v => v.name)}</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right small" /></div >}>
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCustomerHistory}
                    left={< div > <small><FA name='hand-o-right' className='text-info' /></small> &nbsp;沟通记录</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right small " /></div >}>
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCustomerSelect}
                    left={< div > <small><FA name='share-alt' className='text-info' /></small> &nbsp;内部客户</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right small" /></div >}>
                    <div className="px-3"> {innerCustomer && tv(innerCustomer, v => v.name)}</div>
                </LMR >,
            } as ComponentProp
        ];

        var header: any = <span>客户详情</span>;
        if (IsOccupy == 1) {
            header = <span className="text-danger" >客户详情（被占用）</span>;
        }

        return <Page header={header} headerClassName={consts.headerClass}>
            <PropGrid className="my-2" rows={rows} values={this.customer} alignValue="right" />
            <Edit
                schema={schema}
                uiSchema={this.uiSchema}
                data={this.customer}
                onItemChanged={this.onItemChanged} />
        </Page>
    })
}