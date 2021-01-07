import * as React from "react";
import { VPage, Page, Loading, Tabs, TabProp, TabCaptionComponent, List, FA } from "tonva";
import { observer } from "mobx-react";
import { setting } from "appConfig";
import { CInnerTeam } from "./CInnerTeam";
import { observable } from "mobx";
import { divide } from "lodash";

/* eslint-disable */
export const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
export class VInnerPersonDetail extends VPage<CInnerTeam> {
    @observable private currentState: string;
    private tabs: TabProp[];
    @observable private month: any;
    @observable private date: any;
    @observable private year: any;
    @observable private showYear: any;
    @observable private oneDayTimes: number = 1000 * 60 * 60 * 24;
    async open() {
        this.date = new Date();
        this.month = this.date.getMonth() + 1
        this.year = this.date.getFullYear();
        this.showYear = this.date.getFullYear();
        this.openPage(this.page);
    }

    achievmentDateType: any = [
        { caption: '日', state: 'day', toolTip: '无' },
        { caption: '月', state: 'month', toolTip: '无' },
        { caption: '年', state: 'year', toolTip: '无' }
    ];

    private changeDay = async (type) => {
        var time = +this.date;
        let nowTimes = +new Date();
        if (type === 'prevDay') {
            let theNewDaysTimes = time - this.oneDayTimes;
            this.date = new Date(theNewDaysTimes);
            let date = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate()
            await this.controller.getPersonAchievmentDay(date);
        } else if (type === 'nextDay') {
            let theNewDaysTimes = time + this.oneDayTimes;
            if (theNewDaysTimes <= nowTimes) {
                this.date = new Date(theNewDaysTimes);
                let date = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate()
                await this.controller.getPersonAchievmentDay(date);
            }
        }
    }

    private prevMonth = async () => {
        if (this.month > 0) {
            this.month = this.month - 1;
        }
        if (this.month === 0) {
            this.month = 12;
            this.year = this.year - 1;
        }
        await this.controller.getPersonAchievmentMonth({ month: this.month, year: this.year });
    }
    private nextMonth = async () => {
        let nowYear = new Date().getFullYear();
        let nowMonth = new Date().getMonth() + 1;
        if (this.month <= 12) {
            this.month = this.month + 1;
        }
        if (nowYear === this.year && nowMonth >= this.month) {
            await this.controller.getPersonAchievment({ month: this.month, year: this.year });
        } else if (nowYear > this.year) {
            if (this.month === 13) {
                this.month = 1;
                this.year = this.year + 1;
            }
            await this.controller.getPersonAchievmentMonth({ month: this.month, year: this.year });
        }
    }
    private prevYear = async () => {
        let year = this.showYear;
        this.showYear = year - 1
        await this.controller.getPersonAchievmentYear({ year: this.showYear });
    }
    private nextYear = async () => {
        let nowYear = new Date().getFullYear();
        let year = this.showYear;
        if (nowYear > year) {
            this.showYear = year + 1
            await this.controller.getPersonAchievmentYear({ year: this.showYear });
        }
    }

    private getTabs = async () => {
        let { getPersonAchievment } = this.controller;
        this.tabs = this.achievmentDateType.map((v: any) => {
            let { caption, state, icon } = v;
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                content: () => {
                    if (this.currentState === 'day') {
                        return <this.personDailyAchieve />
                    } else if (this.currentState === 'month')
                        return <this.personMonthAchieve />
                    else if (this.currentState === 'year')
                        return <this.personYearAchieve />
                },
                isSelected: this.currentState === state,
                load: async () => {
                    this.currentState = state;
                    await getPersonAchievment(this.currentState);
                }
            };
        });
    }
    private personDailyAchieve = observer(() => {
        let { personDayAchieve } = this.controller;
        let content = personDayAchieve.map((v, index) => {
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
                {this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月' + this.date.getDate() + '日'}
                {(+new Date() - +this.date > this.oneDayTimes) ? <div className=' text-primary small px-3' onClick={() => this.changeDay('nextDay')}>
                    <FA name="chevron-right small" /></div> : <div className=' px-3' ></div>}
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
        let { personMonthAchieve } = this.controller;
        let sumEndTaskCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        let content = personMonthAchieve.slice().reverse().map((v, index) => {
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
                {this.year + '年' + this.month + '月'}
                {(this.year === new Date().getFullYear() && this.month < new Date().getMonth()) || (this.year < new Date().getFullYear())
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
                    {sumEndTaskCount > 0 || sumSendCreditsCount > 0 || sumSendPostCount > 0 || sumOrderCount > 0 || sumSaleVolume > 0 ?
                        <tr className="col dec px-3 py-2 bg-white cursor-pointer text-primary">
                            <td className="w-3">合计</td>
                            <td className="w-3">{sumEndTaskCount}</td>
                            <td className="w-3">{sumSendCreditsCount}</td>
                            <td className="w-3">{sumSendPostCount}</td>
                            <td className="w-3">{sumOrderCount}</td>
                            <td className="w-3">{sumSaleVolume}</td>
                        </tr > : null}
                </tbody>
            </table>
        </div >
    })
    private personYearAchieve = observer(() => {
        let { personYearhAchieve } = this.controller;
        let sumEndTaskCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        let content = personYearhAchieve.slice().reverse().map((v, index) => {
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
                    {sumEndTaskCount > 0 || sumSendCreditsCount > 0 || sumSendPostCount > 0 || sumOrderCount > 0 || sumSaleVolume > 0 ?
                        <tr className="col dec px-3 py-2 bg-white cursor-pointer text-primary">
                            <td className="w-3">合计</td>
                            <td className="w-3">{sumEndTaskCount}</td>
                            <td className="w-3">{sumSendCreditsCount}</td>
                            <td className="w-3">{sumSendPostCount}</td>
                            <td className="w-3">{sumOrderCount}</td>
                            <td className="w-3">{sumSaleVolume}</td>
                        </tr > : null}
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

/**
 *     private prevDay = async () => {
        let time = +this.date;
        let oneDayTimes = 1000 * 60 * 60 * 24;;
        let theNewDaysTimes = time - oneDayTimes;
        this.date = new Date(theNewDaysTimes);
        let date = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate()
        await this.controller.getPersonAchievmentDay(date);
    }
    private nextDay = async () => {
        let time = +this.date;
        let nowTimes = +new Date();
        let oneDayTimes = 1000 * 60 * 60 * 24;;
        let theNewDaysTimes = time + oneDayTimes;
        if (theNewDaysTimes <= nowTimes) {
            this.date = new Date(theNewDaysTimes);
            let date = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate()
            await this.controller.getPersonAchievmentDay(date);
        }
    }
 */