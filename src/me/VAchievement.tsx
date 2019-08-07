import * as React from 'react';
import { VPage, Page, ItemSchema, StringSchema, UiSchema, UiTextItem, Edit, LMR, List, EasyDate, tv } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CMe } from './CMe';

export class VAchievement extends VPage<CMe> {

    private achievements: any;
    async open(param: any) {
        this.achievements = param;
        this.openPage(this.page, param);
    }

    private renderItem(model: any, index: number) {
        let { date, webuser, product, pack, quantity, price } = model;
        let left = <small className="text-muted"><EasyDate date={date} /><span className="ml-3">{tv(webuser, v => v.name)}</span></small>;
        let right = <small className="text-muted"><div className="px-3"> {price}￥</div></small>;
        return <div className="d-block">
            <div>
                <LMR className="px-3 py-2 " left={left} right={right}></LMR>
            </div>
        </div>
    }

    private page = observer(() => {

        let none = <div className="my-3 mx-2 text-warning">无记录</div>;
        return <Page header="业绩" headerClassName={consts.headerClass}>
            <List none={none} items={this.achievements} item={{ render: this.renderItem, onClick: null }} />
        </Page>
    })
}
