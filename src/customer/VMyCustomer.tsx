import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';
import { LMR, List, EasyDate, SearchBox, FA } from 'tonva';

export class VMyCustomer extends VPage<CCustomer> {

    private temp: any;
    async open(temp: any) {
        this.temp = temp;
        this.openPage(this.page);
    }

    private renderCustomer(salesTask: any, index: number) {
        let { name } = salesTask;
        return <LMR className="px-3 py-2 " left={<FA name='user' className=' my-2 mr-3 text-info' />}>
            <div className="font-weight-bold"></div>
            <div>{name}</div>
        </LMR >
    }

    private onClickCustomer = async (model: any) => {
        await this.controller.showCustomerDetail(model.id);
    }

    private page = observer(() => {
        let { pageMyCustomerActive } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;
        var header = <>客户</>;
        if (this.temp == 2) {
            header = <>活跃客户</>;
        }

        return <Page header={header} headerClassName='bg-primary' onScrollBottom={this.onScrollBottom}  >
            <List before={''} none={none} items={pageMyCustomerActive} item={{ render: this.renderCustomer, onClick: this.onClickCustomer }} />
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageMyCustomerActive.more();
    }
}