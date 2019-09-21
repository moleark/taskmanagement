import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, PageItems } from 'tonva';
import { LMR, List, EasyDate, SearchBox, FA } from 'tonva';
import { CCustomerUnit } from './CCustomerUnit';

export class VCustomerUnitSelect extends VPage<CCustomerUnit> {

    private title: any;
    private type: any; //显示类型

    async open(param: any) {
        this.type = param;
        this.openPage(this.page);
    }

    private renderItem(salesTask: any, index: number) {
        let { name } = salesTask;
        return <LMR className="px-3 py-1 " left={<FA name='university' className=' my-2 mr-3 text-info' />}>
            <div className="font-weight-bold"></div>
            <div>{name}</div>
        </LMR >
    }

    private onClickRow = async (model: any) => {
        if (this.type == 1) {
            await this.controller.showCreateCustomer(model);
        } else {
            await this.controller.cApp.cCustomer.showCustomerSearch(model.name);
        }
    }

    private page = observer(() => {
        let { pageUnit, showCreateUnit } = this.controller;
        let onshowCreateUnit = async () => await showCreateUnit();

        let none, text, right;
        if (this.type == 1) {
            none = <div className="my-3 mx-2 text-warning">没有搜索到单位！</div>;
            text = <div className="my-3 mx-2 text-warning">新建客户前先选择单位，或点击右上角加号新建单位！</div>;
            right = <div onClick={onshowCreateUnit} className="cursor-pointer px-3 py-2"><FA name="plus" /></div>;
            this.title = "选择单位";
        } else {
            text = "";
            this.title = "选择单位";
            none = <div className="my-3 mx-2 text-warning">你还没有创建单位，无法根据单位搜索！</div>;
        }
        return <Page header={this.title} onScrollBottom={this.onScrollBottom} headerClassName='bg-primary' right={right}>
            <SearchBox className="px-1 w-100  mt-2 mr-2"
                size='md'
                onSearch={(key: string) => this.controller.searchByKey(key)}
                placeholder="搜索单位" />
            <List before={''} none={none} items={pageUnit} item={{ render: this.renderItem, onClick: this.onClickRow }} />
            {(!pageUnit) && text}
        </Page>
    })

    private onScrollBottom = async () => {
        await this.controller.pageUnit.more();
    }
}