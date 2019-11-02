import * as React from 'react';
import { nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VMe } from './VMe';
import { VMeDetail } from './VMeDetail';
import { VAchievement } from './VAchievement';
import { VSet } from './VSet';
import { VAchievementDetail } from './VAchievementDetail';
import { observable } from 'mobx';
import { VInvitationCode } from './VInvitationCode';

export class CMe extends CUqBase {
    inviteCode: string;
    position: any;
    @observable salesAmont: any = { oneSaleVolume: 0.00, twoSaleVolume: 0.00, threeSaleVolume: 0.00, oneAchievement: 0.0, twoAchievement: 0.0, threeAchievement: 0.0, teamCount: 0.0, customerCount: 0.0, activeCustomerCount: 0.0 };

    //初始化
    protected async internalStart(param: any) {
        await this.load();
        nav.clear();
        this.openVPage(VMe, param);
    }

    //加载邀请码
    load = async () => {
        await nav.loadMe();
        this.position = await this.uqs.salesTask.SearchPosition.table({ position: undefined });
        let code = String(this.position[0].code + 100000000);
        this.inviteCode = code;
    }

    //显示我的个人信息
    showMeDetail = async () => {
        this.openVPage(VMeDetail)
    }

    //搜索我的邀请码
    searchPosition = async () => {
        let position = await this.uqs.salesTask.SearchPosition.table({});
        return position;
    }

    //显示我的团队
    showTeam = async () => {
        await this.onComputeAchievement();
        let { cTeam } = this.cApp
        await cTeam.start();
    }

    showMyCustomer = async (type: number) => {
        await this.onComputeAchievement();
        let { showMyCustomer } = this.cApp.cCustomer;
        await showMyCustomer("", type);
    }

    //显示业绩
    showAchievement = async () => {
        await this.uqs.salesTask.ComputeAchievement.submit({});
        let query = { user: this.user.id };
        let achievement = await this.uqs.salesTask.SearchAchievement.table(query);
        this.openVPage(VAchievement, achievement);
    }

    //显示业绩历史记录
    showAchievementDetail = async (param: any) => {
        this.openVPage(VAchievementDetail, param);
    }

    //搜索业绩历史记录
    searchAchievementDetail = async (type: number, status: number) => {
        await this.onComputeAchievement();
        let param = { types: type, status: status };
        let list = await this.uqs.salesTask.SearchAchievementHistory.table(param);
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

    showInvitationCode = async (param: string) => {
        this.openVPage(VInvitationCode, param);
    }

    onComputeAchievement = async () => {
        await this.uqs.salesTask.ComputeAchievement.submit({});
        let query = { user: this.user.id };

        let result = await this.uqs.salesTask.SearchAchievement.obj(query);
        if (result) {
            this.salesAmont = result;
        }
    }

    render = () => {
        return this.renderView(VMe);
    }

    tab = () => {

        return <this.render />;
    }
}