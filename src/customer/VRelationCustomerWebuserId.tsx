import * as React from 'react';
import { VPage, Page, LMR, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { GLOABLE } from '../cartenv';
import { observable } from 'mobx';

export class VRelationCustomerWebuserId extends VPage<CCustomer> {
    private shopIdInput: HTMLInputElement;
    @observable tips: string;
    @observable webUser: any;
    @observable customerShopId: number;
    private myCustomer: any;
    async open(myCustomer) {
        this.myCustomer = myCustomer;
        this.openPage(this.page);
    }

    private correlationShopId = async () => {
        let { getWebUserValidationResult } = this.controller;
        this.customerShopId = parseFloat(this.shopIdInput.value);
        if (!this.customerShopId)
            this.tips = "请输入客户的商城ID";
        else {
            this.webUser = await getWebUserValidationResult(this.customerShopId);
            if (!this.webUser)
                this.tips = "输入错误，请输入正确的商城的ID";
        }
        if (this.tips) {
            setTimeout(() => this.tips = undefined, GLOABLE.TIPDISPLAYTIME);
        }
    }

    private tipsUI = observer(() => {
        let tipsUI = <></>;
        if (this.tips) {
            tipsUI = <div className="alert alert-primary" role="alert">
                <FA name="exclamation-circle" className="text-warning float-left mr-3" size="2x"></FA>
                {this.tips}
            </div>
        }
        return tipsUI;
    })

    private removeRelationShopId = () => {
        this.shopIdInput.value = null;
        this.closePage();
    }

    private webUserUI = observer(() => {
        let { addMycustomerRelationShopId } = this.controller;
        let webUserUI = <></>;
        if (this.webUser) {
            let { id, firstName } = this.webUser;
            webUserUI = <div className="card mt-2">
                <div className="card-body">
                    <h5 className="card-title"> 审核客户信息：</h5>
                    <div className='py-3 px-4'>
                        <p>客户名：{firstName}</p>
                        <p>商城ID：{id}</p>
                    </div>
                    <div className="w-100  d-flex justify-content-center py-2" >
                        <button type="button" className="btn btn-primary mx-1 my-1 px-3"
                            onClick={() => addMycustomerRelationShopId({ shopId: this.customerShopId, myCustomer: this.myCustomer })}>
                            关联
                        </button>
                        <button type="button" className="btn btn-primary mx-1 my-1 px-3"
                            onClick={this.removeRelationShopId}>取消
                        </button>
                    </div>
                </div>
            </div>
        }
        return webUserUI;
    })
    private page = observer(() => {
        let right = <button className="btn btn-primary w-100" onClick={this.correlationShopId}>查询</button>
        return <Page header='关联商城ID'>
            <div className="px-2 py-3">
                <LMR right={right}>
                    <input ref={v => this.shopIdInput = v} type="number" placeholder="请输入客户的商城账号ID" className="form-control" />
                </LMR>
                {React.createElement(this.tipsUI)}
                {React.createElement(this.webUserUI)}
            </div >
        </Page>
    })
}