import * as React from "react";
import { VPage, Page, Loading, FA } from "tonva";
import { observer } from "mobx-react";
import { setting } from "appConfig";
import { CInnerTeam, dateFormat } from "./CInnerTeam";
import { observable } from "mobx";

/* eslint-disable */

export class VInnerTeamDailyDetail extends VPage<CInnerTeam> {
    @observable private oneDayTimes: number = 1000 * 60 * 60 * 24;
    @observable private date: any;
    @observable teamDailyDetail: any[];
    async open(param: any) {
        this.date = param.date;
        this.teamDailyDetail = param.teamDailyDetail;
        this.openPage(this.page);
    }

    private changeDay = async (type) => {
        var time = +this.date;
        let theNewDaysTimes;
        if (type === 'prevDay') {
            theNewDaysTimes = time - this.oneDayTimes;
        } else if (type === 'nextDay') {
            theNewDaysTimes = time + this.oneDayTimes;
        }
        this.date = new Date(theNewDaysTimes);
        let date = dateFormat(this.date)
        this.teamDailyDetail = await this.controller.searchTeamAchievementDay({ team: 0, date: date });
    }

    private page = observer(() => {
        let { cApp } = this.controller;
        this.teamDailyDetail.forEach(e => {
            cApp.useUser(e.user);
        });
        let content = this.teamDailyDetail.map((v, index) => {
            let { user, endTaskCount, sendPostCount, orderCount, saleVolume, couponsCreated, creditsCreated } = v;
            let authorname = cApp.renderUser(user.id);
            return <div className="row mx-0 py-2 small text-center bg-white border-bottom">
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
            <Page header={'日 报表明细'} headerClassName={setting.pageHeaderCss} >
                <div>
                    <div className="bg-white py-2 d-flex justify-content-between px-3">
                        <div className=' text-primary small px-3' onClick={() => this.changeDay('prevDay')}><FA name="chevron-left small" /></div>
                        {this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月' + this.date.getDate() + '日'}
                        {(+new Date() - +this.date > this.oneDayTimes) ? <div className=' text-primary small px-3' onClick={() => this.changeDay('nextDay')}>
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
                        <div>
                            {content}
                        </div>
                    </div>
                </div>
            </Page>
        );
    });
}
