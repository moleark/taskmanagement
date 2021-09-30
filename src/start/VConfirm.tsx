import * as React from "react";
import { VPage, Page, Image, tv, nav } from 'tonva-react';
import { observer } from "mobx-react";
import { CStart } from "./CStart";
import { appSettings } from "appConfig";

export class VConfirm extends VPage<CStart> {
    async open(position: any) {
        this.openPage(this.page, position);
    }

    private meInfoAgent(position: any) {
        let { code, user } = position;
        code = code + "";
        let p1 = code.substr(0, 4);
        let p2 = code.substr(4);
        code = p1 + " " + p2;
        //let url = setting.url + "?type=invitation&code=" + code;
        return (
            <div
                id="qrid"
                className="text-center"
                style={{ width: "auto", height: "70%" }}
            >
                <Image
                    src={appSettings.logo}
                    className="mt-4"
                    style={{
                        width: "50%",
                        height: "50%",
                        margin: "2rem auto, 0 auto"
                    }}
                />
                <div className="my-4">
                    <div>
                        {tv(user, v => v.name)}，邀请您加入
                        {appSettings.appName}。
                    </div>
                    <div>
                        邀请码：<span className="text-info">{code}</span>
                    </div>
                </div>
            </div>
        );
    }

    private meInfoAssist(position: any) {
        let { code } = position;
        code = code + "";
        let p1 = code.substr(0, 4);
        let p2 = code.substr(4);
        code = p1 + " " + p2;
        return (
            <div id="qrid" className="text-center" style={{ width: "auto", height: "70%", padding: "100px 0 0 0 " }}>
                <Image src={appSettings.logo} style={{ width: "30%", height: "30%", margin: "10rem auto, 0 auto" }} />
                <div className="my-4">
                    <div className="text-info py-2">您还未被授权</div>
                    <div className="text-info py-2">
                        请联系管理员开通内部销售权限
                    </div>
                    <div className="text-info py-2">账号：{nav.user && nav.user.id}</div>
                </div>
            </div>
        );
    }

    private page = observer((position: any) => {

        let onCreatePosition = async () =>
            await this.controller.createPosition({ invitacode: position.code + "" });

        let footer: any = appSettings.isInner ? (
            undefined
        ) : (
            <div className="d-block">
                <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={onCreatePosition}
                >
                    确认
                </button>
            </div>
        );

        let header = appSettings.isInner ? "提示" : "邀请人";
        return (
            <Page
                header={header}
                logout={true}
                back="none"
                footer={footer}
            >
                {appSettings.isInner
                    ? this.meInfoAssist(position)
                    : this.meInfoAgent(position)}
            </Page>
        );
    });
}
