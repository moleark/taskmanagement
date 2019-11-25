
import { nav, PageItems, Query } from 'tonva';
import { CUqBase } from 'CBase';
import { VBalance } from './VBalance';
import { VWithdrawal } from './VWithdrawal';
import { VWithdrawalEnd } from './VWithdrawalEnd';
import { VBalanceHistory } from './VBalanceHistory';
import { observable } from 'mobx';
import { VAchievementDetail } from './VAchievementDetail';
import { VWithdrawalDetail } from './VWithdrawalDetail';

class PageBalanceHistory extends PageItems<any> {

    private searchBalanceHistory: Query;

    constructor(searchBalanceHistory: Query) {
        super();
        this.firstSize = this.pageSize = 11;
        this.searchBalanceHistory = searchBalanceHistory;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchBalanceHistory.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}


export class CBalance extends CUqBase {

    @observable pageBalanceHistory: PageBalanceHistory;
    @observable balanceHistory: any;
    @observable salesAmont: any = {
        oneSaleVolume: 0.00, twoSaleVolume: 0.00, threeSaleVolume: 0.00,
        oneAchievement: 0.0, twoAchievement: 0.0, threeAchievement: 0.0,
        teamCount: 0.0, customerCount: 0.0, activeCustomerCount: 0.0,
        totalOrderCount: 0
    };

    //初始化
    protected async internalStart(param: any) {
        nav.clear();
    }

    //计算更新业绩
    getComputeAchievement = async () => {
        await this.uqs.salesTask.ComputeAchievement.submit({});
        let query = { user: this.user.id };
        let result = await this.uqs.salesTask.SearchAchievement.obj(query);
        if (result) {
            return result;
        }
    }

    //搜索业绩历史记录
    searchAchievementDetail = async (type: number, status: number) => {
        this.salesAmont = await this.getComputeAchievement();
        let param = { types: type, state: status };
        let list = await this.uqs.salesTask.SearchAchievementHistory.table(param);
        return list;
    }

    //显示业绩历史记录
    showAchievementDetail = async (param: any) => {
        this.openVPage(VAchievementDetail, param);
    }

    //显示余额
    showBalance = async (balance: number) => {
        await this.openVPage(VBalance, balance);
    }

    //显示提款页面
    showVWithdrawal = async (balance: number) => {
        await this.openVPage(VWithdrawal, balance);
    }

    //提交取款
    submitWithdrawal = async (amount: number) => {
        let withdraw = {
            webUser: this.user,
            amount: amount,
            currency: "RMB"
        }
        let result: any = await this.uqs.salesTask.Withdrawal.save("withdrawal", withdraw);
        await this.uqs.salesTask.Withdrawal.action(result.id, result.flow, result.state, "submit");
        this.salesAmont = await this.getComputeAchievement();
        this.openVPage(VWithdrawalEnd, amount);
    }

    //显示提款记录
    showBalanceHistory = async () => {
        await this.searchBalanceHistory("");
        this.openVPage(VBalanceHistory);
    }

    //显示提款明细
    showWithdrawalDetail = async (orderId: any) => {

        let order = await this.uqs.salesTask.Withdrawal.getSheet(orderId);
        let list = await this.uqs.salesTask.SearchWithdrawalStateQuery.query({ withdrawal: orderId })
        order.state = list.ret[0].state;
        this.openVPage(VWithdrawalDetail, order);
    }

    searchBalanceHistory = async (ordertype: string) => {
        let list = await this.uqs.salesTask.SearchBalanceHistory.query({ ordertype: ordertype });
        this.balanceHistory = list.ret;
    }

}