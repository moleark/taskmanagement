import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { CPost } from "./CPost";
import { observable } from "mobx";
import { setting } from "appConfig";

export class VSubject extends VPage<CPost> {

    @observable pageSubject: any;
    async open(param: any) {
        this.pageSubject = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={"帖文栏目"} headerClassName={setting.pageHeaderCss} >
                <List before={""} none="无" items={this.pageSubject} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { showSubjectPost, showSubject } = this.controller;
        let { name, id } = model;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" >
                    <span>{name}</span>
                </div>
                <div onClick={() => showSubjectPost(model)} >
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3">
                            贴  文
                        </button>
                    </div>
                </div>
                <div onClick={() => showSubject(id)} >
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3">
                            下一级
                        </button>
                    </div>
                </div>
            </div >
        );
    };
}