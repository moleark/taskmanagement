import * as React from "react";
import { VPage, Page } from "tonva";
import { CMe } from "./CMe";
import { setting } from "appConfig";
import { observer } from "mobx-react";

/* eslint-disable */
export class VClassRoomDetail extends VPage<CMe> {

    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { id, caption } = param;
        return (
            <Page header={caption} headerClassName={setting.pageHeaderCss}>
                <div className="w-100 h-100">
                    <iframe src={"https://web.jkchemical.com/post/" + id} className="border-0 w-100 h-100 overflow-hidden"></iframe>
                </div>
            </Page>
        );
    });
}