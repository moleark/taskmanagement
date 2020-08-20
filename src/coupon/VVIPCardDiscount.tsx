import * as React from 'react';
import { VPage, List, Page, tv } from 'tonva';
import { CCoupon } from './CCoupon'

export class VVIPCardDiscount extends VPage<CCoupon>{

    private vipCardDiscountSetting: any[];
    async open(param: any) {
        this.vipCardDiscountSetting = param;
        this.openPage(this.page);
    }

    private renderVIPCardDiscountSetting = (item: any) => {
        let { brand, discount } = item;
        return <div className="row">
            <div className="col-7">
                {tv(brand, v => v.name)}
            </div>
            <div className="col-5">
                {100 - discount * 100}%
            </div>
        </div>
    }

    private page = () => {
        return <Page header="品牌折扣">
            <List items={this.vipCardDiscountSetting} item={{ render: this.renderVIPCardDiscountSetting, className: "px-3 py-2" }}></List>
        </Page>
    }
}