import * as React from "react";
import { VPage, Page, FA, nav } from 'tonva-react';
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

    private divContent(endTaskCount: number, couponsCreated: number, creditsCreated: number, sendPostCount: number, orderCount: number, saleVolume: number,
        click: any) {
        return <div className="row mx-0 py-2 small text-center bg-white" onClick={click}>
            <div className="col-width">{endTaskCount}</div>
            <div className="col-width">{couponsCreated}</div>
            <div className="col-width">{creditsCreated}</div>
            <div className="col-width">{sendPostCount}</div>
            <div className="col-width">{orderCount}</div>
            <div className="col-width">{saleVolume}</div>
            <div className="col-width-1 text-primary"> <FA name="chevron-right small" /></div>
        </div>
    }

    private myTodayAchievement = observer(() => {
        let { myTodayAchievement, showMyAchievementDetail } = this.controller;
        if (myTodayAchievement.length === 0) { this.date = new Date() }
        let rowContent = myTodayAchievement.map((v, index) => {
            let { date, user, endTaskCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            this.date = date;
            return this.divContent(endTaskCount, couponsCreated, creditsCreated, sendPostCount, orderCount, saleVolume, () => showMyAchievementDetail())
        });
        let showContentZero = this.divContent(0, 0, 0, 0, 0, 0, () => showMyAchievementDetail())
        return <div>
            <div className="bg-white px-3 py-2 text-primary strong">
                <strong>我的工作</strong>
                <span className='small pl-2'>(今日)</span>
            </div>
            <div>
                <div className="row mx-0 py-2 small text-center text-primary bg-white border-bottom">
                    <div className="col-width"><strong>任务</strong></div>
                    <div className="col-width"><strong>制优惠券</strong></div>
                    <div className="col-width"><strong>制积分券</strong></div>
                    <div className="col-width"><strong>发帖</strong></div>
                    <div className="col-width"><strong>订单</strong></div>
                    <div className="col-width"><strong>金额</strong></div>
                    <div className="col-width-1"></div>
                </div>
                <div> {myTodayAchievement.length > 0 ? rowContent : showContentZero} </div>
            </div>
        </div>
    });

    private teamAchievementDay = observer(() => {
        let { teamAchievementDay, showTeamDailyDetail, cApp } = this.controller;
        teamAchievementDay.forEach(e => { cApp.useUser(e.user) });
        let sumEndTaskCount = 0, sumcouponsCreatedCount = 0, sumcreditsCreatedCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        teamAchievementDay.map((v, index) => {
            let { date, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            sumEndTaskCount += endTaskCount;
            sumcouponsCreatedCount += couponsCreated;
            sumcreditsCreatedCount += creditsCreated;
            sumSendPostCount += sendPostCount;
            sumOrderCount += orderCount;
            sumSaleVolume += saleVolume;
        });

        let allContent = this.divContent(sumEndTaskCount, sumcouponsCreatedCount, sumcreditsCreatedCount, sumSendPostCount, sumOrderCount,
            sumSaleVolume, () => showTeamDailyDetail({ team: 0, date: this.date }))
        return <div className='my-3'>
            <div className="bg-white px-3 py-2 text-primary strong">
                <strong> 团队工作</strong>
                <span className='small pl-2 text-primary'>(今日)</span>
            </div>
            <div>
                <div className="row mx-0 py-2 small text-center text-primary bg-white border-bottom">
                    <div className="col-width"><strong>任务</strong></div>
                    <div className="col-width"><strong>制优惠券</strong></div>
                    <div className="col-width"><strong>制积分券</strong></div>
                    <div className="col-width"><strong>发帖</strong></div>
                    <div className="col-width"><strong>订单</strong></div>
                    <div className="col-width"><strong>金额</strong></div>
                    <div className="col-width-1"></div>
                </div>
                <div> {allContent} </div>
            </div>
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
        let sumEndTaskCount = 0, sumcouponsCreatedCount = 0, sumcreditsCreatedCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        let content = teamAchievementYear.slice().reverse().map((v, index) => {
            let { yeara, montha, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            sumEndTaskCount += endTaskCount;
            sumcouponsCreatedCount += couponsCreated;
            sumcreditsCreatedCount += creditsCreated;
            sumSendPostCount += sendPostCount;
            sumOrderCount += orderCount;
            sumSaleVolume += saleVolume;
            let typeshow = montha + "月";
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showTeamDetail(yeara, montha)}>
                <td className="px-1">{typeshow}</td>
                <td className="px-0">{endTaskCount}</td>
                <td className="px-0">{couponsCreated}</td>
                <td className="px-0">{creditsCreated}</td>
                <td className="px-0">{sendPostCount}</td>
                <td className="px-0">{orderCount}</td>
                <td className="px-0">{saleVolume}</td>
                <td className="pr-2 text-primary">
                    <FA name="chevron-right small" />
                </td>
            </tr >;
        });
        let totalContent = <tr className="col dec px-3 py-2 bg-white cursor-pointer text-primary"
            onClick={() => showTeamMemberYearlyAchieve(this.year)}>
            <td className="px-0">{'合计'}</td>
            <td className="px-0">{sumEndTaskCount}</td>
            <td className="px-0">{sumcouponsCreatedCount}</td>
            <td className="px-0">{sumcreditsCreatedCount}</td>
            <td className="px-0">{sumSendPostCount}</td>
            <td className="px-0">{sumOrderCount}</td>
            <td className="px-0">{sumSaleVolume.toFixed(2)}</td>
            <td className="px-0 text-primary">
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
                    <tr className="bg-white">
                        <th className="px-0"></th>
                        <th className="px-0">任务</th>
                        <th className="px-0">制优惠券</th>
                        <th className="px-0">制积分券</th>
                        <th className="px-0">发帖</th>
                        <th className="px-0">订单</th>
                        <th className="px-0">金额</th>
                        <th className="px-0"></th>
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
