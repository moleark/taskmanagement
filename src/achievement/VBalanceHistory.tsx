import * as React from 'react';
import { VPage, Page, List, EasyDate, LMR, FA } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from '../consts';
import { CBalance } from './CBalance';

export class VBalanceHistory extends VPage<CBalance> {

    async open() {
        this.openPage(this.page);
    }

    private renderOrder = (balanceOrder: any, index: number) => {

        let { date, ordertype, amount, order } = balanceOrder;
        let amountshow = ordertype === "withdrawal" ? "-" + amount : amount;
        ordertype = ordertype === "withdrawal" ? "提现" : "回款";
        let dateshow = <div className="small text-muted">{<EasyDate date={date} />}</div>;
        let onshowWithdrawalDetail = async () => await this.controller.showWithdrawalDetail(order);

        return <LMR left={<FA name="credit-card" className="h3 mt-2 mx-2" />} className="pl-2 pr-3 py-1" onClick={onshowWithdrawalDetail} >
            <LMR left={ordertype} right={<strong>{amountshow}</strong>}></LMR>
            <LMR left={dateshow} ></LMR>
        </LMR >
    }

    private page = observer(() => {

        return <Page header="余额明细" headerClassName={consts.headerClass} onScrollBottom={this.onScrollBottom} >
            <List items={this.controller.balanceHistory} item={{ render: this.renderOrder }} none="" />
        </Page >
    });

    private onScrollBottom = async () => {
        await this.controller.pageBalanceHistory.more();
    }
}
