import * as React from 'react';
import { VPage, Page, List, LMR, EasyTime } from 'tonva-react';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';

export class VBalanceHistory extends VPage<CBalance> {

    async open() {
        this.openPage(this.page);
    }

    private renderOrder = (balanceOrder: any, index: number) => {

        let { date, amount, order, ordertype } = balanceOrder;
        let right = ordertype === "withdrawal" ? <strong>{"－" + amount.toFixed(2)}</strong> : <strong>{"＋" + amount.toFixed(2)}</strong>;
        let left = ordertype === "withdrawal" ? "提现" : "回款";
        let dateshow = <div className="small text-muted">{<EasyTime date={date} />}</div>;
        return <LMR className="pl-2 px-4 py-2" onClick={() => this.controller.showWithdrawalDetail(order)} >
            <LMR className="py-1" left={left} right={right}></LMR>
            <LMR left={dateshow} ></LMR>
        </LMR >
    }

    private page = observer(() => {

        return <Page header="历史记录" headerClassName={setting.pageHeaderCss}   >
            <List items={this.controller.balanceHistory} item={{ render: this.renderOrder }} none="" />
        </Page >
    });
}
