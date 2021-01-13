import * as React from "react";
import { VPage, Page, FA, nav } from "tonva";
import { CInnerTeam } from "./CInnerTeam";
import { observer } from "mobx-react";
import { observable } from "mobx";

export class VInnerTeam extends VPage<CInnerTeam> {
    @observable private year: any;
    @observable private date: any;
    async open(param) {
        this.year = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return <Page header="团队" >
            < this.myTodayAchievement />
            < this.teamAchievementDay />
            < this.teamAchievementMonth />
        </Page>
    });

    private myTodayAchievement = observer(() => {
        let { myTodayAchievement, showUserDetail } = this.controller;
        let content = myTodayAchievement.map((v, index) => {
            let { date, user, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            this.date = date;
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showUserDetail(this.date)}>
                <td className="w-3">{endTaskCount}</td>
                <td className="w-3">{sendCreditsCount}</td>
                <td className="w-3">{sendPostCount}</td>
                <td className="w-3">{orderCount}</td>
                <td className="w-3">{saleVolume}</td>
                <td className="w-3 text-primary">
                    <FA name="chevron-right small" />
                </td>
            </tr >;
        });
        if (myTodayAchievement.length === 0) { this.date = new Date() }
        let showZero = <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showUserDetail(this.date)}>
            <td className="w-3">0</td>
            <td className="w-3">0</td>
            <td className="w-3">0</td>
            <td className="w-3">0</td>
            <td className="w-3">0</td>
            <td className="w-3 text-primary">
                <FA name="chevron-right small" />
            </td>
        </tr >
        return <div>
            <div className="bg-white px-3 py-2 text-primary strong">
                <strong>我的工作</strong>
                <span className='small pl-2'>(今日)</span>
            </div>
            <table className="table text-center small">
                <thead className="text-primary">
                    <tr className="bg-white">
                        <th>任务</th>
                        <th>发码</th>
                        <th>发帖</th>
                        <th>订单</th>
                        <th>金额</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {content.length > 0 ? content : showZero}
                </tbody>
            </table>
        </div>
    });

    private teamAchievementDay = observer(() => {
        let { teamAchievementDay, showTeamDailyDetail, cApp } = this.controller;
        teamAchievementDay.forEach(e => {
            cApp.useUser(e.user);
        });
        let sumEndTaskCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        teamAchievementDay.map((v, index) => {
            let { date, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            sumEndTaskCount += endTaskCount;
            sumSendCreditsCount += sendCreditsCount;
            sumSendPostCount += sendPostCount;
            sumOrderCount += orderCount;
            sumSaleVolume += saleVolume;
        });

        let content = <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showTeamDailyDetail({ team: 0, date: this.date })}>
            <td className="w-3">{sumEndTaskCount}</td>
            <td className="w-3">{sumSendCreditsCount}</td>
            <td className="w-3">{sumSendPostCount}</td>
            <td className="w-3">{sumOrderCount}</td>
            <td className="w-3">{sumSaleVolume}</td>
            <td className="w-3 text-primary">
                <FA name="chevron-right small" />
            </td>
        </tr >;
        return <div>
            <div className="bg-white px-3 py-2 text-primary strong">
                <strong> 团队工作</strong>
                <span className='small pl-2 text-primary'>(今日)</span>
            </div>
            <table className="table text-center small">
                <thead className="text-primary">
                    <tr className="bg-white">
                        <th>任务</th>
                        <th>发码</th>
                        <th>发帖</th>
                        <th>订单</th>
                        <th>金额</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </div>
    });
    private prevYear = async () => {
        let year = this.year;
        this.year = year - 1
        await this.controller.searchTeamAchievementYear(this.year.toString());
    }
    private nextYear = async () => {
        let nowYear = new Date().getFullYear();
        let year = this.year;
        if (nowYear > year) {
            this.year = year + 1
            await this.controller.searchTeamAchievementYear(this.year.toString());
        }
    }
    private teamAchievementMonth = observer(() => {
        let { teamAchievementYear, showTeamDetail, showTeamMemberYearlyAchieve } = this.controller;
        let sumEndTaskCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        let content = teamAchievementYear.slice().reverse().map((v, index) => {
            let { yeara, montha, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            sumEndTaskCount += endTaskCount;
            sumSendCreditsCount += sendCreditsCount;
            sumSendPostCount += sendPostCount;
            sumOrderCount += orderCount;
            sumSaleVolume += saleVolume;
            let typeshow = montha + "月";
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showTeamDetail(yeara, montha)}>
                <td className="w-3">{typeshow}</td>
                <td className="w-3">{endTaskCount}</td>
                <td className="w-3">{sendCreditsCount}</td>
                <td className="w-3">{sendPostCount}</td>
                <td className="w-3">{orderCount}</td>
                <td className="w-3">{saleVolume}</td>
                <td className="w-3 text-primary">
                    <FA name="chevron-right small" />
                </td>
            </tr >;
        });
        let totalContent = <tr className="col dec px-3 py-2 bg-white cursor-pointer text-primary"
            onClick={() => showTeamMemberYearlyAchieve(this.year)}>
            <td className="w-3">{'合计'}</td>
            <td className="w-3">{sumEndTaskCount}</td>
            <td className="w-3">{sumSendCreditsCount}</td>
            <td className="w-3">{sumSendPostCount}</td>
            <td className="w-3">{sumOrderCount}</td>
            <td className="w-3">{sumSaleVolume}</td>
            <td className="w-3 text-primary">
                <FA name="chevron-right small" />
            </td>
        </tr >;

        return <div>
            <div className="bg-white px-3 py-2 text-primary strong">
                <strong>团队工作</strong>
                <span className='small pl-2'>(年)</span>
            </div>
            <div className="bg-white py-2 d-flex justify-content-between px-3">
                <div className=' text-primary small px-3' onClick={this.prevYear}><FA name="chevron-left small" /></div>
                {this.year + '年'}
                {this.year < new Date().getFullYear() ? <div className=' text-primary small px-3' onClick={this.nextYear}>
                    <FA name="chevron-right small" /></div> : <div className=' px-3' ></div>}
            </div>
            <table className="table text-center small">
                <thead className="text-primary">
                    <tr className="bg-white small">
                        <th></th>
                        <th>任务</th>
                        <th>发码</th>
                        <th>发帖</th>
                        <th>订单</th>
                        <th>金额</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                    {totalContent}
                </tbody>
            </table>
        </div >
    });
}
