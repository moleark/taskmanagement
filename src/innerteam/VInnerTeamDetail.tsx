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
    async open(param: any) {
        this.month = param.montha;
        this.year = param.yeara
        this.openPage(this.page);
    }

    private prevMonth = async () => {
        if (this.month > 0) {
            this.month = this.month - 1;
        }
        if (this.month === 0) {
            this.month = 12;
            this.year = this.year - 1;
        }
        await this.controller.getTeamMonthDetail({ montha: this.month.toString(), yeara: this.year.toString() });
    }
    private nextMonth = async () => {
        let nowYear = new Date().getFullYear();
        let nowMonth = new Date().getMonth() + 1;
        if (this.month <= 12) {
            this.month = this.month + 1;
        }
        if (nowYear === this.year && nowMonth >= this.month) {
            await this.controller.getTeamMonthDetail({ montha: this.month.toString(), yeara: this.year.toString() });
        } else if (nowYear > this.year) {
            if (this.month === 13) {
                this.month = 1;
                this.year = this.year + 1;
            }
            await this.controller.getTeamMonthDetail({ montha: this.month.toString(), yeara: this.year.toString() });
        }
    }
    private page = observer(() => {
        let { teamAchievementMonthDetail } = this.controller;
        let content = teamAchievementMonthDetail.map((v, index) => {
            let { usera, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            let authorname = this.controller.cApp.renderUser(usera.id);
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer">
                <td className="w-3">{authorname}</td>
                <td className="w-3">{endTaskCount}</td>
                <td className="w-3">{sendCreditsCount}</td>
                <td className="w-3">{sendPostCount}</td>
                <td className="w-3">{orderCount}</td>
                <td className="w-3">{saleVolume}</td>
            </tr >;
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
                    <table className="table text-center small">
                        <thead className="text-primary">
                            <tr className="bg-white">
                                <th>员工</th>
                                <th>任务</th>
                                <th>发码</th>
                                <th>发帖</th>
                                <th>订单</th>
                                <th>金额</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </div>
            </Page>
        );
    });
}
export class VInnerTeamMemberYearly extends VPage<CInnerTeam> {
    @observable year: any;
    async open(yeara: any) {
        this.year = yeara
        this.openPage(this.page);
    }

    private prevYear = async () => {
        let year = this.year;
        this.year = year - 1
        await this.controller.getTeamMemberYearlyAchieve(this.year.toString());
    }

    private nextYear = async () => {
        let nowYear = new Date().getFullYear();
        let year = this.year;
        if (nowYear > year) {
            this.year = year + 1
            await this.controller.getTeamMemberYearlyAchieve(this.year.toString());
        }
    }
    private page = observer(() => {
        let { teamMemberYearlyDetail } = this.controller;
        let content = teamMemberYearlyDetail.map((v, index) => {
            let { usera, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            let authorname = this.controller.cApp.renderUser(usera);
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer">
                <td className="w-3">{authorname}</td>
                <td className="w-3">{endTaskCount}</td>
                <td className="w-3">{sendCreditsCount}</td>
                <td className="w-3">{sendPostCount}</td>
                <td className="w-3">{orderCount}</td>
                <td className="w-3">{saleVolume}</td>
            </tr >;
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
                    <table className="table text-center small">
                        <thead className="text-primary">
                            <tr className="bg-white">
                                <th>员工</th>
                                <th>任务</th>
                                <th>发码</th>
                                <th>发帖</th>
                                <th>订单</th>
                                <th>金额</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </div>
            </Page>
        );
    });
}

