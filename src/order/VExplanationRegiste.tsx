import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VPage, Page } from 'tonva-react';
import { COrder } from "./COrder";


export class VExplanationRegiste extends VPage<COrder> {
    @observable private customer: any;
    async open(param: any) {
        this.customer = param;
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {

        return (
            <Page header={'客户未注册'}>
                <div className='text-secondary m-2'>该客户还未注册，为了方便帮您制作订单，请先去百灵威商城注册，注册成功后方可下单</div>
            </Page>
        );
    });
}
export class VExplanationRegiste1 extends VPage<COrder> {
    @observable private customer: any;
    async open(param: any) {
        this.customer = param;
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {

        return (
            <Page header={''}>
                <div className='text-secondary m-2'>该客户还未绑定，请绑定该客户</div>
            </Page>
        );
    });
}
