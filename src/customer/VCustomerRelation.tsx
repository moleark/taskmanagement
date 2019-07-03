import * as React from 'react';
import { VPage, Page, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { consts } from 'consts';


export class VCustomerRelation extends VPage<CCustomer> {

    private relesion: any;
    async open(relesion: any) {
        this.relesion = relesion;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { showCustomerSelect } = this.controller;
        let { webuser, myCustomer } = this.relesion;

        let onshowCustomerSelect = async () => await showCustomerSelect(myCustomer.obj);
        let { name } = webuser.obj;
        let footer = <button type="button" className="btn btn-primary flex-grow-1 mx-3 my-1 w-100" onClick={onshowCustomerSelect}>修改</button>;
        return <Page header="平台账户" headerClassName={consts.headerClass} footer={footer}>
            <LMR className="cursor-pointer w-100 py-3 px-3" left="账户" right={name}></LMR>
        </Page>
    })
}