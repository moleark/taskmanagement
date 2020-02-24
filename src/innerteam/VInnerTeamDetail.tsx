import * as React from "react";
import { VPage, Page, LMR } from "tonva";
import { observer } from "mobx-react";
import { setting } from "appConfig";
import { CInnerTeam } from "./CInnerTeam";

export class VInnerTeamDetail extends VPage<CInnerTeam> {
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { totalOrderCount, oneSaleVolume } = param;

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
                ></LMR>
                <LMR
                    className="bg-white px-3 py-2"
                    left={<span>发码数</span>}
                ></LMR>
            </Page>
        );
    });
}
