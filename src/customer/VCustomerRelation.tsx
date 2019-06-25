import * as React from 'react';
import { VPage, Page, PageItems, Schema, UiSchema, UiInputItem, UiRadio, Edit, ItemSchema, nav } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { tv } from 'tonva';
import { consts } from 'consts';


export class VCustomerRelation extends VPage<CCustomer> {

    async open(customer: any) {
        this.openPage(this.page);
    }


    private page = observer(() => {


        return <Page header="客户关系" headerClassName={consts.headerClass}>
            123
        </Page>
    })
}