import * as React from "react";
import { observer } from "mobx-react";
import { LMR, VPage, Image, FA } from 'tonva-react';
import { CMe } from "./CMe";
import classNames from "classnames";
import copy from "copy-to-clipboard";
import { makeObservable, observable } from "mobx";
import { GLOABLE } from "ui";
import { appSettings } from "appConfig";
import { EnumCouponType } from "uq-app/uqs/JkCoupon";

/* eslint-disable */
export class VMe extends VPage<CMe> {
    private inviteCode: any;
    showTips: any = "none";
    constructor(cMe: CMe) {
        super(cMe);
        makeObservable(this, {
            showTips: observable
        })
    }

    async open() {
        this.openPage(this.page);
    }

    render(member: any): JSX.Element {
        let { inviteCode } = this.controller;
        this.inviteCode = inviteCode.substr(1, 9);
        this.controller.cApp.cBalance.getComputeAchievement();
        return <this.page />;
    }

    copyClick = (e: any) => {
        copy(this.inviteCode);
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    };

    private userSpan(name: string, nick: string, level: number): JSX.Element {
        let shownick = nick ? <b>{nick}</b> : <b>{name}</b>;
        let showlevel = <span></span>;
        if (level === 1) {
            showlevel = (
                <i
                    className="iconfont icon-xiaoren mx-3"
                    style={{ fontSize: "15px", color: "#1296db" }}
                ></i>
            );
        } else if (level === 2) {
            showlevel = (
                <i
                    className="iconfont icon-jinpai2 mx-3"
                    style={{ fontSize: "17px", color: "#f6ad15" }}
                ></i>
            );
        } else if (level === 3) {
            showlevel = (
                <i
                    className="iconfont icon-zuanshi mx-3"
                    style={{ fontSize: "15px", color: "#35ebfd" }}
                ></i>
            );
        }
        return (
            <div>
                {shownick}
                {showlevel}
            </div>
        );
    }

    private teamSpan = observer(() => {
        let { showTeam, showMyCustomer, cApp } = this.controller;
        let { salesAmont } = cApp.cBalance;
        let { teamCount, innerteamCount, customerCount, activeCustomerCount } = salesAmont;
        let onshowMyCustomer = async () => await showMyCustomer(1);
        let onshowMyCustomerActive = async () => await showMyCustomer(2);
        if (appSettings.isInner) {
            return (
                <div className="row mt-2">
                    <div
                        className="col text-center"
                        onClick={() => cApp.cInnerTeam.start()}
                    >
                        <div>{innerteamCount}</div>
                        <small>
                            <small>团队</small>
                        </small>
                    </div>
                    <div className="col text-center" onClick={onshowMyCustomer}>
                        <div>{customerCount}</div>
                        <small>
                            <small>客户</small>
                        </small>
                    </div>
                    <div
                        className="col text-center"
                        onClick={onshowMyCustomerActive}
                    >
                        <div>{activeCustomerCount}</div>
                        <small>
                            <small>活跃客户</small>
                        </small>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row mt-2">
                    <div className="col text-center" onClick={showTeam}>
                        <div>{teamCount}</div>
                        <small>
                            <small>团队</small>
                        </small>
                    </div>
                    <div className="col text-center" onClick={onshowMyCustomer}>
                        <div>{customerCount}</div>
                        <small>
                            <small>客户</small>
                        </small>
                    </div>
                    <div className="col text-center" onClick={onshowMyCustomerActive}>
                        <div>{activeCustomerCount}</div>
                        <small>
                            <small>活跃客户</small>
                        </small>
                    </div>
                </div>

            );
        }
    });

    private meInfo = observer(() => {
        let {
            user,
            showMeDetail,
            showMessage,
            showInvitationCode,
            cApp
        } = this.controller;
        if (user === undefined) return null;
        let { name, nick, icon } = user;

        let { cMessage, cBalance } = cApp;
        let { salesAmont } = cBalance;

        let count: any = cMessage.count.get();
        let pointer, badge;
        if (count > 0) {
            pointer = "cursor-pointer";
            if (count < 100) badge = <u>{count}</u>;
            else badge = <u>99+</u>;
        }
        let aright = (
            <div
                className={classNames("jk-cart ml-1 mr-2", pointer)}
                onClick={showMessage}
            >
                <FA className="fa-lg" name="commenting-o" />
                {badge}
            </div>
        );
        let onshowInvitationCode = async () =>
            await showInvitationCode(this.inviteCode);

        let left = (
            <div onClick={showMeDetail}>
                {" "}
                <Image className="w-3c h-3c mr-3" src={icon} />{" "}
            </div>
        );
        let right = appSettings.isInner ? (
            <span></span>
        ) : (
            <span onClick={onshowInvitationCode}>
                <FA className="h2" name="qrcode" />
            </span>
        );
        let contener = (
            <div>
                <div onClick={showMeDetail}>
                    {this.userSpan(name, nick, salesAmont.level)}
                </div>
                {appSettings.isInner ? (
                    <></>
                ) : (
                    <div className="small mt-1">
                        <span>邀请码:</span>
                        <span className="px-1">{this.inviteCode}</span>
                        <span
                            style={{ border: "1px solid #999999" }}
                            className="px-1 mx-1"
                            onClick={this.copyClick}
                        >
                            <FA name="clone" className="mr-1" />
                            复制
                        </span>
                    </div>
                )}
            </div>
        );

        return (
            <div className="px-4 py-3 cursor-pointer"
                style={{
                    backgroundColor: "#f9f9f9",
                    width: "90%",
                    borderRadius: "8px",
                    margin: "-4rem auto 2rem auto",
                    boxShadow: "2px 2px 15px #333333"
                }}
            >
                <LMR left={left} right={right}> {contener}</LMR>
                <this.teamSpan />
            </div>
        );
    });

    private achievement = observer(() => {
        let { salesAmont } = this.controller.cApp.cBalance;
        return appSettings.achievement(salesAmont);
    });

    private myService() {
        let { showSet, showClassRoom, cApp } = this.controller;
        let { cSalesTask, cCoupon, cOrder } = cApp;
        let { showMyTasksCompleted } = cSalesTask;
        let { orderMangement } = cOrder
        let onShowMyTasksCompleted = async () => await showMyTasksCompleted();

        let vcoupon = <div className="col text-center" onClick={() => cCoupon.showCreateCoupon({})} >
            <div>
                <i className="iconfont icon-youhuiquantuangou" style={{ fontSize: "25px", color: "#f6ad15" }}></i>
            </div>
            <small>
                <small>优惠券</small>
            </small>
        </div>;

        let vassist = <div className="col text-center" onClick={() => cCoupon.showCouponList(EnumCouponType.Credits)} >
            <div>
                <i className="iconfont icon-youhuiquantuangou" style={{ fontSize: "25px", color: "#f6ad15" }} ></i>
            </div>
            <small>
                <small>积分券</small>
            </small>
        </div>;


        let agentclassroom = <div className="col text-center" onClick={showClassRoom} >
            <div>
                <i className="iconfont icon-xuexi" style={{ fontSize: "25px", color: "#2aa515" }}></i>
            </div>
            <small>
                <small>空中课堂</small>
            </small>
        </div>;

        let assistclassroom = <div className="col text-center" onClick={showClassRoom} >

        </div>

        let vsp = appSettings.isInner ? vassist : null;
        let room = appSettings.isInner ? assistclassroom : agentclassroom;

        return (
            <>
                <div className="text-left h6 mx-4">
                    <strong>我的服务</strong>
                </div>
                <div className="row p-2 cursor-pointer">
                    {vcoupon}
                    {vsp}
                    <div className="col text-center" onClick={onShowMyTasksCompleted}  >
                        <div>
                            <i className="iconfont icon-renwuwancheng" style={{ fontSize: "25px", color: "#2aa515" }}></i>
                        </div>
                        <small>
                            <small>历史任务</small>
                        </small>
                    </div>
                    <div className="col text-center" onClick={orderMangement} >
                        <div className="text-primary">
                            <i style={{ fontSize: "25px" }} className="iconfont icon-kejian-zimulu"></i>
                        </div>
                        <div><small>订单管理</small></div>
                    </div>
                    <div className="col text-center" onClick={showSet}>
                        <div>
                            <i className="iconfont icon-shezhi2" style={{ fontSize: "25px", color: "#0e6ff7" }}></i>
                        </div>
                        <small>
                            <small>设置</small>
                        </small>
                    </div>
                </div>
                <div className="row p-2 cursor-pointer mt-3">
                    {room}
                    <div className="col text-center">
                    </div>
                    <div className="col text-center">
                    </div>
                    <div className="col text-center">
                    </div>
                </div>
            </>
        );
    }

    private page = observer(() => {

        return (
            <div>
                <div className="bg-white">
                    <this.achievement />
                    <this.meInfo />
                    {this.myService()}
                </div>

                <div
                    className="text-center text-white small px-2"
                    style={{ width: "30%", margin: "-100px auto 0 auto", padding: "4px", borderRadius: "3px", backgroundColor: "#505050", display: this.showTips }}
                >
                    已复制到剪切板
                </div>
            </div>
        );
    });
}
