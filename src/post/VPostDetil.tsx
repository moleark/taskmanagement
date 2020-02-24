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
                <iframe
                    style={{ width: "99%", height: "99%" }}
                    src={"https://web.jkchemical.com/post/" + param.id}
                ></iframe>
            </Page>
        );
    });
}
