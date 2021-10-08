import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from 'tonva-react';
import { CPost } from "./CPost";

export class VSubject extends VPage<CPost> {
    private name: any;
    private pageSubject: any;
    async open(param: any) {
        this.pageSubject = param.pageSubject;
        this.name = param.name
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={this.name}  >
                <List before={""} none="无" items={this.pageSubject} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { showSubjectPost, showSubject } = this.controller;
        let { name, counts, child } = model;
        let postcounts = (counts && counts !== 0) ? <span className="d-block small p-1" style={{ width: '3rem', background: '#E6E6FA', borderRadius: "50%" }}>{counts}</span>
            : null
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 py-3 d-flex justify-content-between">
                <div className="mx-2  small" >
                    <span>{name}</span>
                </div>
                <div className="d-flex">
                    <div className="w-7c mr-3  text-primary text-center cursor-pointer" onClick={() => showSubjectPost(model)} >
                        {postcounts}
                    </div>
                    <div className="w-7c ml-3" onClick={() => showSubject(model)} >
                        {child > 0 && < span className="p-2 small pl-4 text-primary cursor-pointer iconfont icon-fangxiang1" style={{ fontSize: "12px" }}>
                        </span>}
                    </div>
                </div>

            </div >
        );
    };
}