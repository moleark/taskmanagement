import * as React from "react";
import { VPage, Page, FA } from "tonva";
import { CInnerTeam } from "./CInnerTeam";
import { observer } from "mobx-react";
import { LineChart } from 'bizcharts';
export class VInnerTeam extends VPage<CInnerTeam> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { teamAchievementDays, teamAchievementMonthchart, showTeamAchievementDetail } = this.controller; //  
        let dataDay: any = []
        teamAchievementDays.forEach(v => {
            let { day, postPubSum, postTranSum, postHitSum, percent } = v;
            dataDay.push(
                {
                    date: day,
                    type: '浏览量',
                    value: postHitSum
                },
                {
                    date: day,
                    type: '转发量',
                    value: postTranSum
                },
                {
                    date: day,
                    type: '发布量',
                    value: postPubSum
                },
                {
                    date: day,
                    type: '转换率',
                    value: percent
                }
            )
        })
        let dataMonth: any = []
        teamAchievementMonthchart.forEach(val => {
            let { month, postPubSum, postTranSum, postHitSum, percent } = val;
            month = month + "月";
            dataMonth.push(
                {
                    date: month,
                    type: '浏览量',
                    value: postHitSum
                },
                {
                    date: month,
                    type: '转发量',
                    value: postTranSum
                },
                {
                    date: month,
                    type: '发布量',
                    value: postPubSum
                },
                {
                    date: month,
                    type: '转换率',
                    value: percent
                }
            )
        })
        return (
            <Page header="我的团队" >
                <div className='pb-4'>
                    <LineChart forceFit height={400} padding={[60, 40, 50, 40]} smooth
                        data={dataDay}
                        title={{
                            visible: true,
                            alignTo: 'middle',
                            text: '贴文系统日报表',
                        }}
                        xField='date'
                        yField='value'
                        seriesField="type"
                        interactions={[
                            {
                                type: 'slider',
                                cfg: {
                                    start: 0.8,
                                    end: 1,
                                },
                            },
                        ]}
                        legend={{
                            offsetY: 4,
                            text: {
                                style: {
                                    fontSize: 16,
                                    fill: 'grey',
                                }
                            }
                        }}
                        events={{
                            onLineClick: (event) => showTeamAchievementDetail()
                        }}
                    />
                    <LineChart forceFit height={400} padding={[70, 10, 50, 40]} smooth
                        data={dataMonth}
                        title={{
                            visible: true,
                            alignTo: 'middle',
                            text: '贴文系统月报表',
                        }}
                        xField='date'
                        yField='value'
                        seriesField="type"
                        legend={{
                            offsetY: 4,
                            text: {
                                style: {
                                    fontSize: 16,
                                    fill: 'grey',
                                }
                            }
                        }}
                        events={{
                            onAxisClick: (event) => {
                                let month = event.target.attrs.text;
                                month = month.replace("月", "");
                                if (month !== '0') {
                                    this.controller.showTeamAchievementMonDetail(month)
                                }
                            }
                        }}
                    />
                </div>
                < this.teamAchievementDay />
                < this.teamAchievementMonth />
            </Page>
        );
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
                <strong>  日报表</strong>
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
                <strong>  月报表</strong>
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
