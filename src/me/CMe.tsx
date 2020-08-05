import * as React from "react";
import { nav, QueryPager } from "tonva";
import { CUqBase } from "../CBase";
import { VMe } from "./VMe";
import { VMeDetail } from "./VMeDetail";
import { VSet } from "./VSet";
import { VInvitationCode } from "./VInvitationCode";
import { VAccount } from "./VAccount";
import { VAbout } from "./VAbout";
import { observable } from "mobx";
import { VClassRoom } from "./VClassRoom";
import { VClassRoomDetail } from "./VClassRoomDetail";
import { VClassRoomList } from "./VClassRoomList";

export class CMe extends CUqBase {
    inviteCode: string;
    position: any;
    @observable account: any;
    @observable pagePost: QueryPager<any>;
    @observable RecommendPost: QueryPager<any>;

    //初始化
    protected async internalStart(param: any) {
        await this.load();
        nav.clear();
        this.openVPage(VMe, param);
    }

    //加载邀请码
    load = async () => {
        await nav.loadMe();
        await this.lodeAccount();
        this.position = await this.uqs.salesTask.SearchPosition.obj({ position: undefined });
        if (this.position !== undefined) {
            let code = String(this.position.code + 100000000);
            this.inviteCode = code;
        } else {
            this.inviteCode = "100000000";
        }
    };

    getMyPositionCode = async () => {
        let position = await this.uqs.salesTask.SearchPosition.obj({ position: undefined });
        if (position !== undefined) {
            let code = String(position.code + 100000000);
            return code;
        } else {
            return "100000000";
        }
    }

    //显示我的个人信息
    showMeDetail = async () => {
        this.openVPage(VMeDetail);
    };

    //搜索我的邀请码
    searchPosition = async () => {
        let position = await this.uqs.salesTask.SearchPosition.table({});
        return position;
    };

    //显示我的团队
    showTeam = async () => {
        await this.cApp.cBalance.getComputeAchievement();
        let { cTeam } = this.cApp;
        await cTeam.start();
    };

    showMyCustomer = async (type: number) => {
        await this.cApp.cBalance.getComputeAchievement();
        let { showMyCustomer } = this.cApp.cCustomer;
        await showMyCustomer("", type);
    };

    //显示消息
    showMessage = async () => {
        await this.cApp.cMessage.start();
    };

    //显示消息
    showSet = async () => {
        this.openVPage(VSet);
    };

    showInvitationCode = (param: string) => {
        this.openVPage(VInvitationCode, param);
    };

    //加载银行账户
    lodeAccount = async () => {
        let result = await this.uqs.salesTask.WebUserAccountMap.query({
            webuser: this.user.id
        });
        if (result.ret.length > 0) {
            this.account = result.ret[0];
        }
    };

    showAccount = async () => {
        await this.lodeAccount();
        let data = {
            telephone: "",
            identityname: "",
            identitycard: "",
            identityicon: "",
            subbranchbank: "",
            bankaccountnumber: ""
        };
        if (this.account) {
            let {
                telephone,
                identityname,
                identitycard,
                identityicon,
                subbranchbank,
                bankaccountnumber
            } = this.account;
            data.telephone = telephone === undefined ? "" : telephone;
            data.identityname = identityname === undefined ? "" : identityname;
            data.identitycard = identitycard === undefined ? "" : identitycard;
            data.identityicon = identityicon === undefined ? "" : identityicon;
            data.subbranchbank =
                subbranchbank === undefined ? "" : subbranchbank;
            data.bankaccountnumber =
                bankaccountnumber === undefined ? "" : bankaccountnumber;
        }
        this.openVPage(VAccount, data);
    };

    saveAccount = async (param: any) => {
        let data = {
            webuser: this.user.id,
            telephone: param.telephone,
            identityname: param.identityname,
            identitycard: param.identitycard,
            identityicon: param.identityicon,
            subbranchbank: param.subbranchbank,
            bankaccountnumber: param.bankaccountnumber
        };
        await this.uqs.salesTask.AddWebUserAccountMap.submit(data);
        await this.lodeAccount();
    };

    showAbout = () => {
        this.openVPage(VAbout);
    };

    showClassRoom = async () => {
        this.RecommendPost = new QueryPager(this.uqs.webBuilder.SearchClassRoomPost, 5, 5);
        this.RecommendPost.first({ classroomType: 0 });
        this.openVPage(VClassRoom);
    }

    showClassRoomDetail = async (param: any) => {
        this.openVPage(VClassRoomDetail, param);
    }

    showClassRoomList = async (type: any) => {
        this.pagePost = new QueryPager(this.uqs.webBuilder.SearchClassRoomPost, 30, 30);
        this.pagePost.first({ classroomType: type });
        this.openVPage(VClassRoomList, type);
    };


    render = () => {
        return this.renderView(VMe);
    };

    tab = () => {
        return <this.render />;
    };
}
