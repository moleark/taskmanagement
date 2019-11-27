import * as React from 'react';
import { nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VMe } from './VMe';
import { VMeDetail } from './VMeDetail';
import { VSet } from './VSet';
import { observable } from 'mobx';
import { VInvitationCode } from './VInvitationCode';
import { VAccount } from './VAccount';

export class CMe extends CUqBase {
    inviteCode: string;
    position: any;
    @observable salesAmont: any = {
        oneSaleVolume: 0.00, twoSaleVolume: 0.00, threeSaleVolume: 0.00,
        oneAchievement: 0.0, twoAchievement: 0.0, threeAchievement: 0.0,
        teamCount: 0.0, customerCount: 0.0, activeCustomerCount: 0.0,
        totalOrderCount: 0, totalReceivableAmount: 0.0, totalaWithdrawal: 0.0, waitWithdrawal: 0.0
    };

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
        await this.onComputeAchievement;
        let { cTeam } = this.cApp
        await cTeam.start();
    }

    showMyCustomer = async (type: number) => {
        await this.onComputeAchievement;
        let { showMyCustomer } = this.cApp.cCustomer;
        await showMyCustomer("", type);
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

    //计算更新业绩
    onComputeAchievement = async () => {
        this.salesAmont = await this.cApp.cBalance.getComputeAchievement();
    }

    showAccount = async () => {
        let data = {
            telephone: "",
            identityname: "",
            identitycard: "",
            identityicon: "",
            subbranchbank: "",
            bankaccountnumber: ""
        };
        let account = await this.uqs.salesTask.WebUserAccountMap.query({ webuser: this.user.id });
        if (account.ret.length > 0) {
            let { telephone, identityname, identitycard, identityicon, subbranchbank, bankaccountnumber } = account.ret[0];
            data.telephone = telephone === undefined ? "" : telephone;
            data.identityname = identityname === undefined ? "" : identityname;
            data.identitycard = identitycard === undefined ? "" : identitycard;
            data.identityicon = identityicon === undefined ? "" : identityicon;
            data.subbranchbank = subbranchbank === undefined ? "" : subbranchbank;
            data.bankaccountnumber = bankaccountnumber === undefined ? "" : bankaccountnumber;
        }
        this.openVPage(VAccount, data);
    }

    saveAccount = async (param: any) => {
        let data = {
            webuser: this.user.id,
            telephone: param.telephone,
            identityname: param.identityname,
            identitycard: param.identitycard,
            identityicon: param.identityicon,
            subbranchbank: param.subbranchbank,
            bankaccountnumber: param.bankaccountnumber,
        };
        await this.uqs.salesTask.AddWebUserAccountMap.submit(data);
    }

    IsCanUseCoupon = async () => {
        // let a = await this.uqs.salesTask.IsCanUseCoupon.submit({ code: "14658995", customer: "46627" });
    }
    render = () => {
        return this.renderView(VMe);
    }

    tab = () => {

        return <this.render />;
    }
}
