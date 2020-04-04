import * as React from 'react';
import { VPage, Page, LMR, List, tv, UserIcon } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { setting } from 'appConfig';

export class VNewCustomerList extends VPage<CCustomer> {

    async open() {
        this.openPage(this.page);
    }
    private renderNewCustomer = (model: any, index: number) => {
        let { showNewMyCustomerDetil } = this.controller;
        let onClik = () => showNewMyCustomerDetil(model);
        let { customer } = model;
        let left: any = <div>{tv(customer, v => v.name)}</div>;
        return <LMR className="pl-2 pr-3 py-1" left={<UserIcon className="mt-1 mx-2 w-2c h-2c" id={47} style={{ borderRadius: '8px' }} />} onClick={onClik}>
            <LMR className="py-2" left={left}>
            </LMR>
        </LMR >
    }

    private page = observer(() => {
        let { newMyCustomerList } = this.controller;
        let none = <div className="my-3 mx-2 text-warning"></div>;
        return <Page header="新客户" headerClassName={setting.pageHeaderCss} >
            <List className="py-2" before={''} none={none} items={newMyCustomerList} item={{ render: this.renderNewCustomer }} />
        </Page>
    })
}