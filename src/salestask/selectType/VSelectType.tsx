import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CSelectType } from './CSelectType';
import { LMR, List } from 'tonva-react-form';

export class VSelectType extends VPage<CSelectType> {


    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    private renderList(model: any, index: number) {

        let { description, name } = model;
        let right = <small className="text-muted">{description}</small>;
        return <LMR className="px-3 py-2" right={right} >
            <div className="font-weight-bold">{name}</div>
        </LMR>
    }

    private onClickTaskType = async (model: any) => {
        await this.controller.selectTaskType(model);
        this.ceasePage(1);
    }

    private page = observer((customer: any) => {

        let { tasktypelist, selectTaskType } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关产品，请重新搜索！</div>;
        return <Page header="选择任务类型" >
            <List before={''} none={none} items={tasktypelist} item={{ render: this.renderList, onClick: this.onClickTaskType }} />
        </Page>
    })
}