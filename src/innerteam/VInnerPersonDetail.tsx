import * as React from "react";
import { VPage, Page, Loading, Tabs, TabProp, TabCaptionComponent, List, FA } from "tonva";
import { observer } from "mobx-react";
import { setting } from "appConfig";
import { CInnerTeam, dateFormat } from "./CInnerTeam";
import { observable } from "mobx";
import { VShowDataTotal } from './VShowDataTotal';
import moment from "moment";

/* eslint-disable */
export const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
export class VInnerPersonDetail extends VPage<CInnerTeam> {

    @observable private currentState: string;
    private tabs: TabProp[];

    @observable private currentMonth: any;
    @observable private currentDate: any;
    @observable private currentYear: any;
    @observable private showYear: any;
    @observable private oneDayTimes: number = 1000 * 60 * 60 * 24;

    @observable myDailyAchievement: any[] = [];
    @observable myMonthlyAchievement: any[] = [];
    @observable myYearlyAchievement: any[] = [];

    async open() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth() + 1
        this.currentYear = this.currentDate.getFullYear();
        this.showYear = this.currentDate.getFullYear();
        this.openPage(this.page);
    }

    achievmentDateType: any = [
        { caption: '日', state: 'day', toolTip: '无' },
        { caption: '月', state: 'month', toolTip: '无' },
        { caption: '年', state: 'year', toolTip: '无' }
    ];

    private changeDay = async (type) => {
        var time = +this.currentDate;
        let theNewDaysTimes;
        if (type === 'prevDay') {
            theNewDaysTimes = time - this.oneDayTimes;
        } else if (type === 'nextDay') {
            theNewDaysTimes = time + this.oneDayTimes;
        }
        this.currentDate = new Date(theNewDaysTimes);
        let date = dateFormat(this.currentDate)
        this.myDailyAchievement = await this.controller.searchPersonAchievment(date);
    }

    private prevMonth = async () => {
        if (this.currentMonth - 1 === 0) {
            this.currentMonth = 12;
            this.currentYear -= 1
        } else {
            this.currentMonth -= 1
        }
        this.myMonthlyAchievement = await this.controller.getPersonAchievmentMonth({ month: this.currentMonth, year: this.currentYear });
    }

    private nextMonth = async () => {
        if (this.currentMonth + 1 === 13) {
            this.currentMonth = 1;
            this.currentYear += 1;
        } else {
            this.currentMonth += 1
        }
        this.myMonthlyAchievement = await this.controller.getPersonAchievmentMonth({ month: this.currentMonth, year: this.currentYear });
    }

    private prevYear = async () => {
        let year = this.showYear;
        this.showYear = year - 1
        this.myYearlyAchievement = await this.controller.getPersonAchievmentYear(this.showYear);
    }

    private nextYear = async () => {
        let nowYear = new Date().getFullYear();
        let year = this.showYear;
        if (nowYear > year) {
            this.showYear = year + 1
            this.myYearlyAchievement = await this.controller.getPersonAchievmentYear(this.showYear);
        }
    }

    private getTabs = async () => {
        let { searchPersonAchievment, getPersonAchievmentMonth, getPersonAchievmentYear } = this.controller;
        this.tabs = this.achievmentDateType.map((v: any) => {
            let { caption, state, icon } = v;
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                content: () => {
                    if (this.currentState === 'day') {
                        return <this.myDailyAchieveUI />
                    } else if (this.currentState === 'month')
                        return <this.personMonthAchieve />
                    else if (this.currentState === 'year')
                        return <this.personYearAchieve />
                },
                isSelected: this.currentState === state,
                load: async () => {
                    this.currentState = state;
                    if (this.currentState === 'day') {
                        this.myDailyAchievement = await searchPersonAchievment(moment().format("YYYY-MM-DD"));
                    } else if (this.currentState === 'month')
                        this.myMonthlyAchievement = await getPersonAchievmentMonth({ month: moment().format('M'), year: moment().format('YYYY') });
                    else if (this.currentState === 'year')
                        this.myYearlyAchievement = await getPersonAchievmentYear(moment().format('YYYY'));
                }
            };
        });
    }

    private myDailyAchieveUI = observer(() => {
        // let { myDailyAchievement } = this.controller;
        let content = this.myDailyAchievement.map((v, index) => {
            let { date, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer">
                <td className="w-3">{endTaskCount}</td>
                <td className="w-3">{sendCreditsCount}</td>
                <td className="w-3">{sendPostCount}</td>
                <td className="w-3">{orderCount}</td>
                <td className="w-3">{saleVolume}</td>
            </tr >;
        });
        return <div>
            <div className="bg-white py-2 d-flex justify-content-between px-3">
                <div className=' text-primary small px-3' onClick={() => this.changeDay('prevDay')}><FA name="chevron-left small" /></div>
                {this.currentDate.getFullYear() + '年' + (this.currentDate.getMonth() + 1) + '月' + this.currentDate.getDate() + '日'}
                {(+new Date() - +this.currentDate > this.oneDayTimes) ?
                    <div className=' text-primary small px-3' onClick={() => this.changeDay('nextDay')}>
                        <FA name="chevron-right small" />
                    </div> : <div className=' px-3'></div>}
            </div>
            <table className="table text-center small">
                <thead className="text-primary">
                    <tr className="bg-white">
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
    })

    private personMonthAchieve = observer(() => {
        // let { personMonthAchieve } = this.controller;
        let sumEndTaskCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        let content = this.myMonthlyAchievement.slice().reverse().map((v, index) => {
            let { date, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            sumEndTaskCount += endTaskCount;
            sumSendCreditsCount += sendCreditsCount;
            sumSendPostCount += sendPostCount;
            sumOrderCount += orderCount;
            sumSaleVolume += saleVolume;
            let getdate = new Date(date);
            let resDate = (getdate.getMonth() + 1) + '月' + getdate.getDate() + '日'
            let typeshow = resDate;

            return <>
                <tr className="col dec px-3 py-2 bg-white cursor-pointer">
                    <td className="w-3">{typeshow}</td>
                    <td className="w-3">{endTaskCount}</td>
                    <td className="w-3">{sendCreditsCount}</td>
                    <td className="w-3">{sendPostCount}</td>
                    <td className="w-3">{orderCount}</td>
                    <td className="w-3">{saleVolume}</td>
                </tr >
            </>;
        });

        return <div>
            <div className="bg-white py-2 d-flex justify-content-between px-3">
                <div className=' text-primary small px-3' onClick={this.prevMonth}><FA name="chevron-left small" /></div>
                {this.currentYear + '年' + this.currentMonth + '月'}
                {(this.currentYear === new Date().getFullYear() && this.currentMonth < new Date().getMonth()) || (this.currentYear < new Date().getFullYear())
                    ? <div className=' text-primary small px-3' onClick={this.nextMonth}><FA name="chevron-right small" /></div> : <div className=' px-3' ></div>}
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
                    </tr>
                </thead>
                <tbody>
                    {content}
                    {this.renderVm(VShowDataTotal, { sumEndTaskCount, sumSendCreditsCount, sumSendPostCount, sumOrderCount, sumSaleVolume })}
                </tbody>
            </table>
        </div >
    })

    private personYearAchieve = observer(() => {
        // let { personYearhAchieve } = this.controller;
        let sumEndTaskCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        let content = this.myYearlyAchievement.slice().reverse().map((v, index) => {
            let { montha, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            sumEndTaskCount += endTaskCount;
            sumSendCreditsCount += sendCreditsCount;
            sumSendPostCount += sendPostCount;
            sumOrderCount += orderCount;
            sumSaleVolume += saleVolume;
            let typeshow = montha + "月";

            return <tr className="col dec px-3 py-2 bg-white cursor-pointer">
                <td className="w-3">{typeshow}</td>
                <td className="w-3">{endTaskCount}</td>
                <td className="w-3">{sendCreditsCount}</td>
                <td className="w-3">{sendPostCount}</td>
                <td className="w-3">{orderCount}</td>
                <td className="w-3">{saleVolume}</td>
            </tr >;
        });

        return <div>
            <div className="bg-white py-2 d-flex justify-content-between px-3">
                <div className=' text-primary small px-3' onClick={this.prevYear}><FA name="chevron-left small" /></div>
                {this.showYear + '年'}
                {this.showYear < new Date().getFullYear() ? <div className=' text-primary small px-3' onClick={this.nextYear}>
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
                    </tr>
                </thead>
                <tbody>
                    {content}
                    {this.renderVm(VShowDataTotal, { sumEndTaskCount, sumSendCreditsCount, sumSendPostCount, sumOrderCount, sumSaleVolume })}
                </tbody>
            </table>
        </div >
    })
    private page = observer(() => {
        this.getTabs();
        return <Page header={'我的工作'} headerClassName={setting.pageHeaderCss}>
            <Tabs tabs={this.tabs} tabPosition="top" />
        </Page>
    });
}