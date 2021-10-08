import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from 'tonva-react';
import { CPost } from "./CPost";

export class VDomain extends VPage<CPost> {

    name: any;
    pageDomain: any;
    async open(param: any) {
        this.pageDomain = param.domain;
        this.name = param.name;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={this.name} >
                <List before={""} none="无" items={this.pageDomain} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { showDomainPost, showDomain, renderDomainPostCount } = this.controller;
        let { name, id, counts } = model;
        let postcount = renderDomainPostCount(id);

        let next: any;
        if (counts > 0) {
            next = <div className="w-7c ml-3" onClick={() => showDomain(model)} >
                <span className="p-2 small pl-4 text-primary cursor-pointer iconfont icon-fangxiang1" style={{ fontSize: "12px" }}>
                </span>
            </div>
        } else {
            next = < div className="w-7c ml-3" >
                <span className="p-2 small pl-4 text-primary cursor-pointer" >
                    &nbsp;&nbsp;&nbsp;
                </span>
            </div>
        }

        return <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 py-3 d-flex justify-content-between">
            <div className="mx-2  small" >
                <span>{name}</span>
            </div>
            <div className="d-flex">
                <div className="w-7c mr-3  text-primary text-center cursor-pointer" onClick={() => showDomainPost(model, "")} >
                    {postcount}
                </div>
                {next}
            </div>
        </div >
    };
}