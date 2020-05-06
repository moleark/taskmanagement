import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CCustomer } from './CCustomer';

export class VCreateVIPCard extends VPage<CCustomer>{

    private customer: any;
    async open(param: any) {
        this.customer = param;
        this.openPage(this.page, param);
    }

    private page = () => {
        return <Page header="创建VIP卡">
            <div>{this.customer.name}</div>
            {this.controller.renderVIPCardTypes()}
            <button className="btn btn-primary">提交</button>
        </Page>
    }
}