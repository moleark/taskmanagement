import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Map, Tuid, Action, nav, loadAppUqs } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observer } from 'mobx-react';
import { VMe } from './VMe';
import { VTeam } from '../team/VTeam';
import { async } from 'q';
import { VMeDetail } from './VMeDetail';
import { VTeamDetail } from '../team/VTeamDetail';
import { VAchievement } from './VAchievement';
import { VSet } from './VSet';

/**
 *
 */
export class CMe extends Controller {

    cApp: CSalesTaskApp;
    inviteCode: string;
    position: any;
    achievemen: number;

    private querySearchPosition: Query;
    private querySearchAchievement: Query;
    private querySearchAchievementHistory: Query;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.querySearchPosition = cUqSalesTask.query("searchposition");
        this.querySearchAchievement = cUqSalesTask.query("SearchAchievement");
        this.querySearchAchievementHistory = cUqSalesTask.query("SearchAchievementHistory");
    }

    //初始化
    protected async internalStart(param: any) {
        await this.load();
        nav.clear();
        this.openVPage(VMe, param);
    }

    //加载邀请码
    load = async () => {
        this.position = await this.querySearchPosition.table({});
        let code = String(this.position[0].code + 100000000);
        let p1 = code.substr(1, 4);
        let p2 = code.substr(5);
        this.inviteCode = p1 + ' ' + p2;
        await this.searchAchievement(this.user.id);
    }

    //显示我的个人信息
    showMeDetail = async () => {
        this.openVPage(VMeDetail)
    }

    //搜索我的邀请码
    searchPosition = async () => {
        let position = await this.querySearchPosition.table({});
        return position;
    }

    //显示我的团队
    showTeam = async () => {
        let { cTeam } = this.cApp
        await cTeam.start();
    }

    //显示业绩
    showAchievement = async (param: any) => {
        this.openVPage(VAchievement, param);
    }

    //搜索业绩
    searchAchievement = async (userid: number) => {
        let param = { user: userid };
        let achievement = await this.querySearchAchievement.table(param);
        if (achievement.length > 0) {
            this.achievemen = achievement[0].SaleVolume
        }
    }

    //显示订单历史记录
    showOrderHistory = async (userid: number) => {
        let list = await this.searchOrderHistory(userid);
        this.openVPage(VAchievement, list);
    }

    //订单记录
    searchOrderHistory = async (userid: number) => {
        let param = { user: 47 };
        let list = await this.querySearchAchievementHistory.table(param);
        return list;
    }
    //显示消息
    showMessage = async () => {
        await this.cApp.cMessage.start();
    }

    //显示消息
    showSet = async () => {
        this.openVPage(VSet)
    }

    /*
    render = observer(() => {
        return this.renderView(VMe);
    })
    */
    render = () => {
        return this.renderView(VMe);
    }

    tab = () => {
        return <this.render />;
    }
}
