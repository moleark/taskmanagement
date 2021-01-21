import * as React from "react";
import { VPage, Page, Loading, FA } from "tonva";
import { observer } from "mobx-react";
import { setting } from "appConfig";
import { CInnerTeam } from "./CInnerTeam";
import { observable } from "mobx";

/* eslint-disable */

export class VInnerTeamDetail extends VPage<CInnerTeam> {
    @observable year: any;
    @observable month: any;
    @observable teamAchievementMonthDetail: any[];
    async open(param: any) {
        this.month = param.montha;
        this.year = param.yeara;
        this.teamAchievementMonthDetail = param.teamAchievementMonthDetail;
        this.openPage(this.page);
    }

    private prevMonth = async () => {
        if (this.month - 1 === 0) {
            this.month = 12;
            this.year -= 1
        } else {
            this.month -= 1
        }
        this.teamAchievementMonthDetail = await this.controller.getTeamMonthDetail({ montha: this.month, yeara: this.year });
    }
    private nextMonth = async () => {
        if (this.month + 1 === 13) {
            this.month = 1;
            this.year += 1;
        } else {
            this.month += 1
        }
        this.teamAchievementMonthDetail = await this.controller.getTeamMonthDetail({ montha: this.month, yeara: this.year });
    }

    private page = observer(() => {
        let { cApp } = this.controller;
        this.teamAchievementMonthDetail.forEach(e => {
            cApp.useUser(e.usera);
        });
        let content = this.teamAchievementMonthDetail.map((v, index) => {
            let { usera, endTaskCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            let authorname = cApp.renderUser(usera.id);
            return <div className="row mx-0 py-2 px-1 small text-center bg-white border-bottom">
                <div className="col-w">{authorname}</div>
                <div className="col-w">{endTaskCount}</div>
                <div className="col-w">{couponsCreated}</div>
                <div className="col-w">{creditsCreated}</div>
                <div className="col-w">{sendPostCount}</div>
                <div className="col-w">{orderCount}</div>
                <div className="col-w">{saleVolume}</div>
            </div>;
        });

        return (
            <Page header={'月报表明细'} headerClassName={setting.pageHeaderCss}>
                <div>
                    <div className="bg-white py-2 d-flex justify-content-between px-3">
                        <div className=' text-primary small px-3' onClick={this.prevMonth}><FA name="chevron-left small" /></div>
                        {this.year + '年' + this.month + '月'}
                        {(this.year === new Date().getFullYear() && this.month < new Date().getMonth()) || (this.year < new Date().getFullYear())
                            ? <div className=' text-primary small px-3' onClick={this.nextMonth}><FA name="chevron-right small" /></div> : <div className=' px-3' ></div>}
                    </div>
                    <div>
                        <div className="row mx-0 py-2 small text-center text-primary bg-white border-bottom">
                            <div className="col-w"><strong>员工</strong></div>
                            <div className="col-w"><strong>任务</strong></div>
                            <div className="col-w"><strong>制优惠券</strong></div>
                            <div className="col-w"><strong>制积分券</strong></div>
                            <div className="col-w"><strong>发帖</strong></div>
                            <div className="col-w"><strong>订单</strong></div>
                            <div className="col-w"><strong>金额</strong></div>
                        </div>
                        <div> {content} </div>
                    </div>
                </div>
            </Page >
        );
    });
}
export class VInnerTeamMemberYearly extends VPage<CInnerTeam> {
    @observable year: any;
    @observable teamMemberYearlyDetail: any[];
    async open(param: any) {
        this.year = param.yeara;
        this.teamMemberYearlyDetail = param.teamMemberYearlyDetail;
        this.openPage(this.page);
    }

    private prevYear = async () => {
        let year = this.year;
        this.year = year - 1
        this.teamMemberYearlyDetail = await this.controller.getTeamMemberYearlyAchieve(this.year);
    }

    private nextYear = async () => {
        let nowYear = new Date().getFullYear();
        let year = this.year;
        if (nowYear > year) {
            this.year = year + 1
            this.teamMemberYearlyDetail = await this.controller.getTeamMemberYearlyAchieve(this.year);
        }
    }
    private page = observer(() => {
        let { cApp } = this.controller;
        this.teamMemberYearlyDetail.forEach(e => {
            cApp.useUser(e.usera);
        });
        let content = this.teamMemberYearlyDetail.map((v, index) => {
            let { usera, endTaskCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            let authorname = cApp.renderUser(usera);
            return <div className="row mx-0 px-1 py-2 small text-center bg-white border-bottom">
                <div className="col-w">{authorname}</div>
                <div className="col-w">{endTaskCount}</div>
                <div className="col-w">{couponsCreated}</div>
                <div className="col-w">{creditsCreated}</div>
                <div className="col-w">{sendPostCount}</div>
                <div className="col-w">{orderCount}</div>
                <div className="col-w">{saleVolume}</div>
            </div>
        });

        return (
            <Page header={'年报表'} headerClassName={setting.pageHeaderCss}>
                <div>
                    <div className="bg-white py-2 d-flex justify-content-between px-3">
                        <div className=' text-primary small px-3' onClick={this.prevYear}><FA name="chevron-left small" /></div>
                        {this.year + '年'}
                        {this.year < new Date().getFullYear() ? <div className=' text-primary small px-3' onClick={this.nextYear}>
                            <FA name="chevron-right small" /></div> : <div className=' px-3' ></div>}
                    </div>
                    <div>
                        <div className="row mx-0 py-2 small text-center text-primary bg-white border-bottom">
                            <div className="col-w"><strong>员工</strong></div>
                            <div className="col-w"><strong>任务</strong></div>
                            <div className="col-w"><strong>制优惠券</strong></div>
                            <div className="col-w"><strong>制积分券</strong></div>
                            <div className="col-w"><strong>发帖</strong></div>
                            <div className="col-w"><strong>订单</strong></div>
                            <div className="col-w"><strong>金额</strong></div>
                        </div>
                        <div> {content} </div>
                    </div>
                </div>
            </Page>
        );
    });
}

