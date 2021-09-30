import * as React from "react";
import { VPage, Page, Loading, Tabs, TabProp, TabCaptionComponent, List, FA } from 'tonva-react';
import { observer } from "mobx-react";
import { CInnerTeam, dateFormat } from "./CInnerTeam";
import { observable } from "mobx";
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

    private divContent(typeshow: any, endTaskCount: number, couponsCreated: number, creditsCreated: number, sendPostCount: number,
        orderCount: number, saleVolume: number) {
        return <div className="row mx-0 px-1 py-2 small text-center bg-white border-bottom">
            <div className="col-w">{typeshow}</div>
            <div className="col-w">{endTaskCount}</div>
            <div className="col-w">{couponsCreated}</div>
            <div className="col-w">{creditsCreated}</div>
            <div className="col-w">{sendPostCount}</div>
            <div className="col-w">{orderCount}</div>
            <div className="col-w">{saleVolume}</div>
        </div>
    }

    private myDailyAchieveUI = observer(() => {
        let content = this.myDailyAchievement.map((v, index) => {
            let { date, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            return <div className="row mx-0 py-2 small text-center bg-white border-bottom">
                <div className="col-2 px-1">{endTaskCount}</div>
                <div className="col-2 px-1">{couponsCreated}</div>
                <div className="col-2 px-1">{creditsCreated}</div>
                <div className="col-2 px-1">{sendPostCount}</div>
                <div className="col-2 px-1">{orderCount}</div>
                <div className="col-2 px-1">{saleVolume}</div>
            </div>;
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
            <div>
                <div className="row mx-0 py-2 small text-center text-primary bg-white border-bottom">
                    <div className="col-2 px-1"><strong>任务</strong></div>
                    <div className="col-2 px-1"><strong>制优惠券</strong></div>
                    <div className="col-2 px-1"><strong>制积分券</strong></div>
                    <div className="col-2 px-1"><strong>发帖</strong></div>
                    <div className="col-2 px-1"><strong>订单</strong></div>
                    <div className="col-2 px-1"><strong>金额</strong></div>
                </div>
                <div> {content}</div>
            </div>
        </div>
    })

    private personMonthAchieve = observer(() => {
        let sumEndTaskCount = 0, sumcouponsCreatedCount = 0, sumcreditsCreatedCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        let content = this.myMonthlyAchievement.slice().reverse().map((v, index) => {
            let { date, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            sumEndTaskCount += endTaskCount;
            sumcouponsCreatedCount += couponsCreated;
            sumcreditsCreatedCount += creditsCreated;
            sumSendPostCount += sendPostCount;
            sumOrderCount += orderCount;
            sumSaleVolume += saleVolume;
            let getdate = new Date(date);
            let resDate = (getdate.getMonth() + 1) + '月' + getdate.getDate() + '日'
            let typeshow = resDate;

            return this.divContent(typeshow, endTaskCount, couponsCreated, creditsCreated, sendPostCount, orderCount, saleVolume);
        });

        return <div>
            <div className="bg-white py-2 d-flex justify-content-between px-3">
                <div className=' text-primary small px-3' onClick={this.prevMonth}><FA name="chevron-left small" /></div>
                {this.currentYear + '年' + this.currentMonth + '月'}
                {(this.currentYear === new Date().getFullYear() && this.currentMonth < new Date().getMonth() + 1) || (this.currentYear < new Date().getFullYear())
                    ? <div className=' text-primary small px-3' onClick={this.nextMonth}><FA name="chevron-right small" /></div> : <div className=' px-3' ></div>}
            </div>
            <div>
                <div className="row mx-0 py-2 px-1 small text-center text-primary bg-white border-bottom">
                    <div className="col-w"></div>
                    <div className="col-w"><strong>任务</strong></div>
                    <div className="col-w"><strong>制优惠券</strong></div>
                    <div className="col-w"><strong>制积分券</strong></div>
                    <div className="col-w"><strong>发帖</strong></div>
                    <div className="col-w"><strong>订单</strong></div>
                    <div className="col-w"><strong>金额</strong></div>
                </div>
                <div>
                    {content}
                    <div className='text-primary'>
                        {(sumEndTaskCount > 0 || sumcouponsCreatedCount > 0 || sumcreditsCreatedCount > 0 || sumSendPostCount > 0 || sumOrderCount > 0 || sumSaleVolume > 0) ?
                            this.divContent('合计', sumEndTaskCount, sumcouponsCreatedCount, sumcreditsCreatedCount, sumSendPostCount, sumOrderCount, sumSaleVolume) : null}
                    </div>
                </div>
            </div>
        </div >
    })

    private personYearAchieve = observer(() => {
        let sumEndTaskCount = 0, sumcouponsCreatedCount = 0, sumcreditsCreatedCount = 0, sumSendCreditsCount = 0, sumSendPostCount = 0, sumOrderCount = 0, sumSaleVolume = 0;
        let content = this.myYearlyAchievement.slice().reverse().map((v, index) => {
            let { montha, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            sumEndTaskCount += endTaskCount;
            sumcouponsCreatedCount += couponsCreated;
            sumcreditsCreatedCount += creditsCreated;
            sumSendPostCount += sendPostCount;
            sumOrderCount += orderCount;
            sumSaleVolume += saleVolume;
            let typeshow = montha + "月";

            return this.divContent(typeshow, endTaskCount, couponsCreated, creditsCreated, sendPostCount, orderCount, saleVolume);
        });

        return <div>
            <div className="bg-white py-2 d-flex justify-content-between px-3">
                <div className=' text-primary small px-3' onClick={this.prevYear}><FA name="chevron-left small" /></div>
                {this.showYear + '年'}
                {this.showYear < new Date().getFullYear() ? <div className=' text-primary small px-3' onClick={this.nextYear}>
                    <FA name="chevron-right small" /></div> : <div className=' px-3' ></div>}
            </div>
            <div>
                <div className="row mx-0 py-2 small text-center text-primary bg-white border-bottom">
                    <div className="col-w"></div>
                    <div className="col-w"><strong>任务</strong></div>
                    <div className="col-w"><strong>制优惠券</strong></div>
                    <div className="col-w"><strong>制积分券</strong></div>
                    <div className="col-w"><strong>发帖</strong></div>
                    <div className="col-w"><strong>订单</strong></div>
                    <div className="col-w"><strong>金额</strong></div>
                </div>
                <div>
                    {content}
                    <div className='text-primary'>
                        {(sumEndTaskCount > 0 || sumcouponsCreatedCount > 0 || sumcreditsCreatedCount > 0 || sumSendPostCount > 0 || sumOrderCount > 0 || sumSaleVolume > 0) ?
                            this.divContent('合计', sumEndTaskCount, sumcouponsCreatedCount, sumcreditsCreatedCount, sumSendPostCount, sumOrderCount, sumSaleVolume) : null}
                    </div>
                </div>
            </div>
        </div >
    })
    private page = observer(() => {
        this.getTabs();
        return <Page header={'我的工作'}  >
            <Tabs tabs={this.tabs} tabPosition="top" />
        </Page>
    });
}