import * as React from "react";
import { VPage, Page, List, LMR, FA, tv } from "tonva";
import { setting } from "appConfig";
import { CInnerTeam } from "./CInnerTeam";

export class VInnerTeam extends VPage<CInnerTeam> {

    async open() {
        this.openPage(this.page);
    }

    private renderItem = (teamItem: any, index: number) => {
        let { employee } = teamItem;
        let left = (
            <div>
                <FA className="text-info px-2" name="user" />
                {tv(employee, v => v.name)}
            </div>
        );
        return <LMR className="px-3 py-2 " left={left} ></LMR>;
    };

    private page = () => {
        let { showTeamDetail, teamAchievement, teamList } = this.controller;
        let { orderCount, taskCount, orderAmount } = teamAchievement;
        let none = <div className="my-3 mx-2 text-muted">还没有团队哦！</div>;
        return (
            <Page header="我的团队" headerClassName={setting.pageHeaderCss}>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 text-center bg-white small mb-1">
                    <div className="col px-3 py-2 ">
                        <strong>销售额</strong>
                        <div className="h5 text-muted pt-2"> {orderCount} </div>
                    </div>
                    <div className="col px-3 py-2 ">
                        <strong>订单数</strong>
                        <div className="h5 text-muted pt-2"> {orderAmount} </div>
                    </div>
                    <div className="col px-3 py-2 ">
                        <strong>任务数</strong>
                        <div className="h5 text-muted pt-2"> {taskCount} </div>
                    </div>
                </div>
                <List
                    before={""}
                    none={none}
                    items={teamList}
                    item={{ render: this.renderItem, onClick: showTeamDetail }}
                />
            </Page>
        );
    };
}
