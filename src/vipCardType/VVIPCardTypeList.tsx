import * as React from 'react';
import { List, LMR, FA, VPage, Page } from 'tonva-react';
import { CVIPCardType } from './CVIPCardType';

export class VVIPCardTypeList extends VPage<CVIPCardType>{

    private vipCardTypes: any[];
    async open(param: any) {
        this.vipCardTypes = param;
        this.openPage(this.page);
    }

    private renderVIPCardType = (cardtype: any) => {
        let { targetWebUserVIPLevel } = this.controller;
        let { id, name } = cardtype;
        if (id > targetWebUserVIPLevel.id)
            return <></>;
        let right = <FA name="chevron-right"></FA>
        return <LMR right={right} className="p-3">
            {name}
        </LMR>
    }

    private onVIPCardTypeClick = async (vipCardType: any) => {
        this.controller.showCreateVIPCardDiscount(vipCardType);
    }

    private page = (): JSX.Element => {
        return <Page header="选择VIP卡级别">
            <List items={this.vipCardTypes} item={{ render: this.renderVIPCardType, onClick: this.onVIPCardTypeClick }} />
        </Page>
    }
}