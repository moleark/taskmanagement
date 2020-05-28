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
        return <Page header="详情" headerClassName={setting.pageHeaderCss}>
            <iframe
                ref={this.refIframe}
                src={"https://web.jkchemical.com/post/" + param.id}
                className="border-0 w-100">
            </iframe>
        </Page>
    });

    private refIframe = (ifrm: HTMLIFrameElement) => {
        if (!ifrm) return;
        let article = ifrm.parentElement.parentElement;
        let header = (article.querySelector('section.tv-page-header') as HTMLElement);
        ifrm.style.height = (window.innerHeight - header.clientHeight) + 'px';
        article.parentElement.style.overflowY = 'hidden';
    }
}
