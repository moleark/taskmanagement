import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page } from "tonva";
import { CPost } from "./CPost";
import { setting } from "appConfig";
/* eslint-disable */
export class VPostDetil extends VPage<CPost> {
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        return (
            <Page header="详情" headerClassName={setting.pageHeaderCss}>
                <div className="w-100 h-100">
                    <iframe src={"https://web.jkchemical.com/post/" + param.id} className="border-0 w-100 h-100 overflow-hidden"></iframe>
                </div>
            </Page>
        );
    });
}
