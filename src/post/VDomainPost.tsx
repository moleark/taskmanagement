import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, tv, FA, EasyTime } from "tonva";
import { setting } from "appConfig";
import { CPost } from "./CPost";

export class VDomainPost extends VPage<CPost> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageDomainPost } = this.controller;
        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );
        return (
            <Page header={"研究领域"} headerClassName={setting.pageHeaderCss} onScrollBottom={this.onScrollBottom} >
                <List before={""} none={none} items={pageDomainPost} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private onScrollBottom = async () => {
        await this.controller.pageDomainPost.more();
    };

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        let { user, showPostDetail, showCustomer } = this.controller;
        if (!user) return;
        let { image, caption, publishdate, hits, sumHits, emphasis } = item;
        let showImport = emphasis === 1 ?
            <FA className="text-danger ml-3 " name="star" /> : null
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex" >
                <div className="d-flex flex-fill cursor-pointer"  >
                    <div className="mr-3 w-3c w-min-3c h-3c h-min-3c">
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
                    <div className="d-flex flex-column w-100">
                        <div className="mb-2"><small onClick={() => showPostDetail(item)} >{caption}</small>  </div>
                        <div className="small d-flex justify-content-between " onClick={() => showPostDetail(item)} >
                            <div className="flex-fill">
                                <EasyTime date={publishdate} />
                                {showImport}
                            </div>
                            <div className="author">
                                {sumHits && <>阅读<b>{sumHits}</b>次 </>}
                                {hits > 0 && <>周<b>{hits}</b>次</>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="small cursor-pointer text-primary text-right w-6c pt-3 " onClick={() => showCustomer("", item)} >
                    <button className="btn btn-outline-info">分享</button>
                </div>
            </div>
        );
    });
}