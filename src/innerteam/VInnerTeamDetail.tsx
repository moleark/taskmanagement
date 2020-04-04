import * as React from "react";
import { VPage, Page, LMR } from "tonva";
import { observer } from "mobx-react";
import { setting } from "appConfig";
import { CInnerTeam } from "./CInnerTeam";

export class VInnerTeamDetail extends VPage<CInnerTeam> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { totalOrderCount, oneSaleVolume, counts } = this.controller.current;

        return (
            <Page header="我的团队" headerClassName={setting.pageHeaderCss}>
                <LMR
                    className="bg-white px-3 py-2"
                    left={<span>销量</span>}
                    right={<span>{oneSaleVolume} 元</span>}
                ></LMR>
                <LMR
                    className="bg-white px-3 py-2"
                    left={<span>订单数量</span>}
                    right={<span>{totalOrderCount} 个</span>}
                ></LMR>
                <LMR
                    className="bg-white px-3 py-2"
                    left={<span>任务数量</span>}
                    right={counts}
                ></LMR>
                <LMR
                    className="bg-white px-3 py-2"
                    left={<span>发码数</span>}
                ></LMR>
            </Page>
        );
    });
}
