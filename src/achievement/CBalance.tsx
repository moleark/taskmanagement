import { nav, QueryPager } from 'tonva-react';
import { VBalance } from "./VBalance";
import { VWithdrawal } from "./VWithdrawal";
import { VWithdrawalEnd } from "./VWithdrawalEnd";
import { VBalanceHistory } from "./VBalanceHistory";
import { makeObservable, observable } from "mobx";
import { VAchievementDetail } from "./VAchievementDetail";
import { VWithdrawalDetail } from "./VWithdrawalDetail";
import { VAssistAchievementDetail } from "./VAssistAchievementDetail";
import { VExplanation } from "./VExplanation";
import { CApp, CUqBase } from 'uq-app';

export class CBalance extends CUqBase {
    pageBalanceHistory: QueryPager<any>;
    balanceHistory: any;
    salesAmont: any = {
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

    constructor(cApp: CApp) {
        super(cApp);
        makeObservable(this, {
            pageBalanceHistory: observable,
            balanceHistory: observable,
            salesAmont: observable
        })
    }

    //初始化
    protected async internalStart(param: any) {
        nav.clear();
    }

    //计算更新业绩
    /**
     * 
     */
    getComputeAchievement = async () => {
        let { salesTask } = this.uqs;
        await salesTask.ComputeAchievement.submit({});
        await salesTask.ComputeBalance.submit({});
        let query = { user: this.user.id };
        let result = await salesTask.SearchAchievement.obj(query);
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

    /**
     * 显示轻代理业绩历史记录
     * @param param 
     */
    showAchievementDetail = async (param: any) => {
        await this.getComputeAchievement();
        this.openVPage(VAchievementDetail, param);
    };

    /**
     * 显示内部销售业绩历史记录
     * @param param 
     */
    showAssistAchievementDetail = async (param: any) => {
        await this.getComputeAchievement();
        this.openVPage(VAssistAchievementDetail, param);
    };

    /**
     * 显示余额
     */
    showBalance = async () => {
        await this.openVPage(VBalance);
    };

    /**
     * 申请提现 
     * @param amount 申请提现额
     */
    submitWithdrawal = async (amount: any) => {
        if (this.cApp.cMe.account) {
            let withdraw = {
                webUser: this.user,
                amount: amount,
                currency: "1"
            };

            let { salesTask } = this.uqs;
            let result: any = await salesTask.Withdrawal.save("withdrawal", withdraw);
            await salesTask.Withdrawal.action(result.id, result.flow, result.state, "submit");
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
        let { salesTask } = this.uqs;
        let withDrawal = await salesTask.Withdrawal.getSheet(orderId);
        let withDrawalState = await salesTask.SearchWithdrawalStateQuery.obj({
            withdrawal: orderId
        });
        let { comments, state } = withDrawalState;
        // withDrawal.state = state;
        // withDrawal.comments = comments;
        this.openVPage(VWithdrawalDetail, withDrawal);
    };

    searchBalanceHistory = async (ordertype: string) => {
        let list = await this.uqs.salesTask.SearchBalanceHistory.query({
            ordertype: ordertype
        });
        this.balanceHistory = list.ret;
    };

    /**累计收益，贷到款解释说明 */
    showexplanation = async (e: any) => {
        e.preventDefault();
        e.stopPropagation()
        this.openVPage(VExplanation);
    }
}
