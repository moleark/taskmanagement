import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, List, EasyDate, SearchBox, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';

export class VCustomerDetail extends VPage<CCustomer> {


    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    private page = observer((customer: any) => {

        let { cSalesTask } = this.controller.cApp
        let { showCustomerHistory } = cSalesTask;
        let onshowCustomerHistory = async () => await showCustomerHistory(17);


        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3"
                    left={< div > <small><FA name='university' className='text-info' /></small> &nbsp;北京大学</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowCustomerHistory}
                    left={< div > <small><FA name='hand-o-right' className='text-info' /></small> &nbsp;沟通记录</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >,
            } as ComponentProp,
            {
                type: 'string',
                name: 'no',
                label: '编号'
            } as StringProp,
            {
                type: 'string',
                name: 'name',
                label: '姓名'
            } as StringProp,

            {
                type: 'string',
                name: 'gender',
                label: '性别',
            } as StringProp,
            {
                type: 'string',
                name: 'birthday',
                label: '生日'
            } as StringProp,
            {
                type: 'string',
                name: 'birthday',
                label: '领域'
            } as StringProp,
            {
                type: 'string',
                name: 'birthday',
                label: 'TOP单位'
            } as StringProp
        ];


        return <Page header="客户详情">
            <PropGrid className="my-2" rows={rows} values={customer} alignValue="right" />
        </Page>
    })
}