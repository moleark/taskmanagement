import * as React from 'react';
import { VPage, Page, List } from 'tonva-react';
import { CVIPCardType } from 'vipCardType/CVIPCardType';

/*
export class VCreateVIPCard extends VPage<CVIPCardType>{

    private customer: any;
    private vipCardTypes: any[];
    async open(param: any) {
        this.vipCardTypes = param;
        this.openPage(this.page);
    }

    private renderVIPCardType(vipCardType: any) {
        let { name, description } = vipCardType;
        return <div>
            {name} - {description}
        </div>
    }

    private onVIPCardTypeClick = (vipCardType: any) => {

        this.controller.showCreateVIPCardDiscount(vipCardType);
    }

    private page = () => {
        return <Page header="创建VIP卡">
            <List items={this.vipCardTypes} item={{ render: this.renderVIPCardType, onClick: this.onVIPCardTypeClick }} />
        </Page>
    }
}
*/