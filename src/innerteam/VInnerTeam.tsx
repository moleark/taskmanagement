import * as React from "react";
import { VPage, Page, FA, nav } from "tonva";
import { CInnerTeam } from "./CInnerTeam";
import { observer } from "mobx-react";

export class VInnerTeam extends VPage<CInnerTeam> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        return <Page header="团队" >
            < this.personDailyAchieve />
            < this.teamAchievementDay />
            < this.teamAchievementMonth />
        </Page>
    });

    private personDailyAchieve = observer(() => {
        let { personDailyAchieve, showUserDetail } = this.controller;
        let content = personDailyAchieve.map((v, index) => {
            let { date, user, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showUserDetail()}>
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
        let showZero = <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showUserDetail()}>
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
        let { teamAchievementDay, showTeamDetail } = this.controller;
        let content = teamAchievementDay.map((v, index) => {
            let { yeara, montha, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showTeamDetail(0, yeara, montha)}>
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

    private teamAchievementMonth = observer(() => {
        let { teamAchievementMonth, showTeamDetail } = this.controller;
        let content = teamAchievementMonth.map((v, index) => {
            let { yeara, montha, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = v;
            let typeshow: any;
            if (montha === "all") {
                typeshow = "合计"
            } else {
                typeshow = montha + "月";
            }
            return <tr className="col dec px-3 py-2 bg-white cursor-pointer" onClick={() => showTeamDetail(0, yeara, montha)}>
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

        return <div>
            <div className="bg-white px-3 py-2 text-primary strong">
                <strong>团队工作</strong>
                <span className='small pl-2'>( /月)</span>
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
                </tbody>
            </table>
        </div>
    });
}
