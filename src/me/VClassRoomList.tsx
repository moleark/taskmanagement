import * as React from "react";
import { VPage, Page, List, tv, FA } from 'tonva-react';
import { CMe } from "./CMe";

import { observer } from "mobx-react";
import { observable } from "mobx";

export class VClassRoomList extends VPage<CMe> {

    private tite: any;
    async open(type: number) {
        if (type === 1) {
            this.tite = "入门课程";
        } else if (type === 2) {
            this.tite = "新手宝典";
        } else if (type === 3) {
            this.tite = "大咖风采";
        }

        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pagePost } = this.controller;
        return <Page header={this.tite} onScrollBottom={this.onScrollBottom}>
            < List className="" before={""} none="无" items={pagePost} item={{ render: this.renderContent }} />
        </Page >
    });

    private onScrollBottom = async () => {
        this.controller.pagePost.more();
    };


    private renderContent = (item: any, index: number) => {
        let { image, caption } = item;

        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pb-3 d-flex" onClick={() => this.controller.showClassRoomDetail(item)}>
                <div className="d-flex flex-fill cursor-pointer" >
                    <div className="mr-3 w-5c w-min-5c h-5c h-min-5c">
                        {tv(
                            image,
                            values => <div className="w-100 h-100 bg-center-img h-max-6c border rounded"
                                style={{ backgroundImage: 'url(' + values.path + ')' }}></div>,
                            undefined,
                            () => (
                                <div className="d-flex align-items-center h-100 justify-content-center bg-light border rounded">
                                    <FA className="text-info" name="camera" size="lg" />
                                </div>
                            )
                        )}
                    </div>
                    {caption}
                </div>
            </div>
        );
    };
}