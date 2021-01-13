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
            let { user, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            let authorname = cApp.renderUser(user.id);
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
            <Page header={'日 报表明细'} headerClassName={setting.pageHeaderCss} >
                <div>
                    <div className="bg-white py-2 d-flex justify-content-between px-3">
                        <div className=' text-primary small px-3' onClick={() => this.changeDay('prevDay')}><FA name="chevron-left small" /></div>
                        {this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月' + this.date.getDate() + '日'}
                        {(+new Date() - +this.date > this.oneDayTimes) ? <div className=' text-primary small px-3' onClick={() => this.changeDay('nextDay')}>
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
