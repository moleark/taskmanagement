import * as React from "react";
import { VPage, Page, List, nav, tv, FA } from "tonva";
import { CMe } from "./CMe";
import { setting } from "appConfig";
import { observer } from "mobx-react";
import { GLOABLE } from "ui";

export class VClassRoom extends VPage<CMe> {


    async open(balance: number) {

        this.openPage(this.page);
    }

    private page = observer(() => {
        let { RecommendPost } = this.controller;
        return <Page header="空中课堂" headerClassName={setting.pageHeaderCss}>
            <this.manue />
            <div className="bg-white px-3 mt-1 py-3">
                <strong>推荐课程</strong>
            </div>
            <List className="px-2" before={""} none="无" items={RecommendPost} item={{ render: this.renderContent }}
            />
        </Page >
    });


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

    private manue = () => {
        let { showClassRoomList } = this.controller;
        return < div className="d-flex cursor-pointer bg-white py-3 " >
            <div className="col text-center" onClick={() => showClassRoomList(1)} >
                <div>
                    <i className="iconfont icon-xuexi" style={{ fontSize: "25px", color: "#2aa515" }}></i>
                </div>
                <small>
                    <small>入门课程</small>
                </small>
            </div>
            <div className="col text-center" onClick={() => showClassRoomList(2)} >
                <div>
                    <i className="iconfont icon-xinshou" style={{ fontSize: "25px", color: "#0e6ff7" }}></i>
                </div>
                <small>
                    <small>新手宝典</small>
                </small>
            </div>
            <div className="col text-center" onClick={() => showClassRoomList(3)} >
                <div>
                    <i className="iconfont icon-daka1" style={{ fontSize: "25px", color: "#f6ad15" }}></i>
                </div>
                <small>
                    <small>大咖风采</small>
                </small>
            </div>
        </div >
    }

}
