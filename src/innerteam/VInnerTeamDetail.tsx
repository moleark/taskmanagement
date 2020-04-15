import * as React from "react";
import { VPage, Page, Loading } from "tonva";
import { observer } from "mobx-react";
import { setting } from "appConfig";
import { CInnerTeam } from "./CInnerTeam";
import { observable } from "mobx";

/* eslint-disable */

export class VInnerTeamDetail extends VPage<CInnerTeam> {

    @observable type: any;
    async open(param: any) {
        this.type = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let header: any;
        if (this.type === "day") {
            header = <div>日 报表明细</div>
        } else if (this.type === "all") {
            header = <div>合计报表明细</div>
        } else {
            header = <div>{this.type}月  报表明细</div>
        }

        let { teamAchievementDetail } = this.controller;
        let { items, loading } = teamAchievementDetail;
        let divItems: any;
        if (!items) {
            divItems = (loading === true) ?
                <div className="m-5"><Loading /></div>
                :
                <div className="my-3 mx-2 text-warning">
                    <span className="text-primary" >{this.t('nopicture')}</span>
                </div>;
        }
        else {
            divItems = items.map((v, index) => {
                return this.renderItem(v, index)
            });
        }

        return (
            <Page header={header} headerClassName={setting.pageHeaderCss}>
                <div>
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
                            {divItems}
                        </tbody>
                    </table>
                </div>
            </Page>
        );
    });

    private renderItem = (item: any, index: number) => {

        let { user, endTaskCount, sendCreditsCount, sendPostCount, orderCount, saleVolume } = item;
        let authorname = this.controller.cApp.renderUser(user.id);
        return <tr className="col dec px-3 py-2 bg-white">
            <td className="w-3">{authorname}</td>
            <td className="w-3">{endTaskCount}</td>
            <td className="w-3">{sendCreditsCount}</td>
            <td className="w-3">{sendPostCount}</td>
            <td className="w-3">{orderCount}</td>
            <td className="w-3">{saleVolume}</td>
        </tr >;
    }
}
