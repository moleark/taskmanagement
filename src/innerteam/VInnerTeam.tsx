import * as React from "react";
import { VPage, Page, List, LMR, FA, tv } from "tonva";
import { setting } from "appConfig";
import { CInnerTeam } from "./CInnerTeam";

export class VInnerTeam extends VPage<CInnerTeam> {
    private team: any;
    async open(team: any) {
        this.team = team;
        this.openPage(this.page);
    }

    private renderItem = (teamItem: any, index: number) => {
        let { employee, taskcount } = teamItem;
        let left = (
            <div>
                <FA className="text-info px-2" name="user" />
                {tv(employee, v => v.name)}
            </div>
        );

        return <LMR className="px-3 py-2 " left={left} right={taskcount}></LMR>;
    };

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted">还没有团队哦！</div>;
        return (
            <Page header="我的团队" headerClassName={setting.pageHeaderCss}>
                <List
                    before={""}
                    none={none}
                    items={this.team}
                    item={{ render: this.renderItem }}
                />
            </Page>
        );
    };
}
