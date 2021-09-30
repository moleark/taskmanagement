import * as React from "react";
import { VPage, Page } from 'tonva-react';
import { CMe } from "./CMe";

import { observer } from "mobx-react";

/* eslint-disable */
export class VClassRoomDetail extends VPage<CMe> {

    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { id, caption } = param;
        return <Page header={caption}  >
            <iframe
                ref={this.refIframe}
                src={"https://web.jkchemical.com/post/" + id}
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

