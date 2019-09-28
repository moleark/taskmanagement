import * as React from 'react';
import { VPage, Page, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { consts } from '../consts';


export class VCustomerRelation extends VPage<CCustomer> {

    private model: any;
    async open(model: any) {
        this.model = model;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { showInnerCustomerSelect: showCustomerSelect } = this.controller;
        let { webuser, myCustomer } = this.model;

        let onshowCustomerSelect = async () => await showCustomerSelect(myCustomer.obj);
        let { name } = webuser.obj;
        let footer = <div className="d-flex px-1">
            <div className="flex-grow-1 align-self-center justify-content-end">
                <button type="button" className="btn btn-outline-info ml-2 align-self-center">关联客户</button>
                <button type="button" className="btn btn-primary ml-2 align-self-center">新建客户</button>
            </div>
        </div>;;
        return <Page header="新客户" headerClassName={consts.headerClass} footer={footer} >
            <LMR className="cursor-pointer w-100 py-3 px-3" left="账户" right={name}></LMR>
        </Page>
    })
}