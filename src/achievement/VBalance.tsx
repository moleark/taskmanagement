import * as React from 'react';
import { VPage, Page, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';

export class VBalance extends VPage<CBalance> {


    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {

        let { salesAmont } = this.controller.cApp.cMe;
        let { totalReceivableAmount, totalaWithdrawal, waitWithdrawal } = salesAmont;
        let balance: number = totalReceivableAmount - totalaWithdrawal - waitWithdrawal;
        let right = <div className="cursor-pointer py-2 mx-3" onClick={this.controller.showBalanceHistory} >余额明细</div>;
        let buttondisabled = balance > 0 ? false : true;

        let onshowVWithdrawal = async () => await this.controller.showVWithdrawal(balance)
        return <Page header="" headerClassName={setting.pageHeaderCss} right={right}>
            <div className="text-center bg-white" style={{ height: "100%" }} >
                <i className="iconfont icon-zhichibizhong" style={{ margin: "50px", fontSize: "100px", color: "#f6ad15" }}></i>
                <div style={{ padding: "0px 80px 6px 80px" }}>我的余额</div>
                <strong>
                    <FA name="cny" className="h2"> </FA>
                    <span className="h1 mx-1">{balance.toFixed(2)}</span>
                </strong>
                <div>
                    <button type="button" disabled={buttondisabled} className="btn btn-primary" style={{ margin: "100px 10px 10px 10px", padding: "6px 80px 6px 80px" }} onClick={onshowVWithdrawal}>提现</button>
                </div>
            </div>
        </Page >
    });
}
