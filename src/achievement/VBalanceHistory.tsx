import * as React from 'react';
import { VPage, Page, List, LMR, EasyTime } from 'tonva';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';

export class VBalanceHistory extends VPage<CBalance> {

    async open() {
        this.openPage(this.page);
    }

    private renderOrder = (balanceOrder: any, index: number) => {

        let { date, ordertype, amount, order } = balanceOrder;
        let amountshow = ordertype === "withdrawal" ? "-" + amount : amount;
        ordertype = ordertype === "withdrawal" ? "提现" : "回款";
        let dateshow = <div className="small text-muted">{<EasyTime date={date} />}</div>;
        let onshowWithdrawalDetail = async () => await this.controller.showWithdrawalDetail(order);

        return <LMR className="pl-2 px-4 py-2" onClick={onshowWithdrawalDetail} >
            <LMR className="py-1" left={ordertype} right={<strong>{amountshow}</strong>}></LMR>
            <LMR left={dateshow} ></LMR>
        </LMR >
    }

    private page = observer(() => {

        return <Page header="余额明细" headerClassName={setting.pageHeaderCss}   >
            <List items={this.controller.balanceHistory} item={{ render: this.renderOrder }} none="" />
        </Page >
    });
}
