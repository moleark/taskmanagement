import { nav, QueryPager } from "tonva";
import { CUqBase } from "CBase";
import { VBalance } from "./VBalance";
import { VWithdrawal } from "./VWithdrawal";
import { VWithdrawalEnd } from "./VWithdrawalEnd";
import { VBalanceHistory } from "./VBalanceHistory";
import { observable } from "mobx";
import { VAchievementDetail } from "./VAchievementDetail";
import { VWithdrawalDetail } from "./VWithdrawalDetail";
import { VAssistAchievementDetail } from "./VAssistAchievementDetail";
import { VExplanation } from "./VExplanation";

export class CBalance extends CUqBase {
    @observable pageBalanceHistory: QueryPager<any>;
    @observable balanceHistory: any;
    @observable salesAmont: any = {
        oneSaleVolume: 0.0,
        twoSaleVolume: 0.0,
        threeSaleVolume: 0.0,
        oneAchievement: 0.0,
        twoAchievement: 0.0,
        threeAchievement: 0.0,
        teamCount: 0.0,
        inerteamCount: 0.0,
        customerCount: 0.0,
        activeCustomerCount: 0.0,
        totalOrderCount: 0,
        totalReceivableAmount: 0.0,
        totalaWithdrawal: 0.0,
        waitWithdrawal: 0.0,
        level: 0
    };

    //初始化
    protected async internalStart(param: any) {
        nav.clear();
    }

    //计算更新业绩
    getComputeAchievement = async () => {
        await this.uqs.salesTask.ComputeAchievement.submit({});
        await this.uqs.salesTask.ComputeBalance.submit({});
        let query = { user: this.user.id };
        let result = await this.uqs.salesTask.SearchAchievement.obj(query);
        if (result) {
            this.salesAmont = result;
        }
    };

    //搜索业绩历史记录
    searchAchievementDetail = async (type: number, status: number) => {
        let param = { types: type, state: status };
        let list = await this.uqs.salesTask.SearchAchievementHistory.table(
            param
        );
        return list;
    };

    //显示业绩历史记录
    showAchievementDetail = async (param: any) => {
        await this.getComputeAchievement();
        this.openVPage(VAchievementDetail, param);
    };

    //显示业绩历史记录
    showAssistAchievementDetail = async (param: any) => {
        await this.getComputeAchievement();
        this.openVPage(VAssistAchievementDetail, param);
    };

    //显示余额
    showBalance = async () => {
        await this.openVPage(VBalance);
    };

    //提交取款
    submitWithdrawal = async (amount: any) => {
        if (this.cApp.cMe.account) {
            let withdraw = {
                webUser: this.user,
                amount: amount,
                currency: "1"
            };
            let result: any = await this.uqs.salesTask.Withdrawal.save(
                "withdrawal",
                withdraw
            );
            await this.uqs.salesTask.Withdrawal.action(
                result.id,
                result.flow,
                result.state,
                "submit"
            );
            await this.getComputeAchievement();
            this.salesAmont.waitWithdrawal += parseFloat(amount);
            this.openVPage(VWithdrawalEnd, amount);
        } else {
            await this.cApp.cMe.showAccount();
        }
    };

    //显示提款页面
    showVWithdrawal = async (balance: number) => {
        let account = await this.uqs.salesTask.WebUserAccountMap.query({
            webuser: this.user.id
        });
        if (account.ret.length > 0) {
            let {
                telephone,
                identityname,
                identitycard,
                identityicon,
                subbranchbank,
                bankaccountnumber
            } = account.ret[0];
            if (
                telephone &&
                identityname &&
                identitycard &&
                identityicon &&
                subbranchbank &&
                bankaccountnumber
            ) {
                await this.openVPage(VWithdrawal, balance);
            } else {
                await this.cApp.cMe.showAccount();
            }
        } else {
            await this.cApp.cMe.showAccount();
        }
    };

    //显示提款记录
    showBalanceHistory = async () => {
        await this.searchBalanceHistory("");
        this.openVPage(VBalanceHistory);
    };

    //显示提款明细
    showWithdrawalDetail = async (orderId: any) => {
        let order = await this.uqs.salesTask.Withdrawal.getSheet(orderId);
        let list = await this.uqs.salesTask.SearchWithdrawalStateQuery.query({
            withdrawal: orderId
        });
        let { comments, state } = list.ret[0];
        order.state = state;
        order.comments = comments;
        this.openVPage(VWithdrawalDetail, order);
    };

    searchBalanceHistory = async (ordertype: string) => {
        let list = await this.uqs.salesTask.SearchBalanceHistory.query({
            ordertype: ordertype
        });
        this.balanceHistory = list.ret;
    };

    /**累计收益，贷到款解释说明 */
    showexplanation = async () => {
        this.openVPage(VExplanation);
    }
}
