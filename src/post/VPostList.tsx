import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, FA, tv, SearchBox, LMR, EasyTime } from "tonva";
import { CPost } from "./CPost";
import { setting } from "appConfig";
/* eslint-disable */
export class VPostList extends VPage<CPost> {
    async open(customer: any) {
        this.openPage(this.page, customer);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private onScrollBottom = async () => {
        this.controller.pagePost.more();
    };

    private page = observer((product: any) => {
        let { pagePost, searchByKey, showProductCatalog, showSubject, showDomain } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;
        let right = (
            <div className="d-flex align-items-center">
                <SearchBox
                    className=""
                    size="sm"
                    onSearch={(key: string) => searchByKey(key, "")}
                    placeholder="搜索帖文"
                />
            </div>
        );
        return (
            <Page header="帖文" onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss} right={right}>
                <LMR className="bg-white py-3 my-1" right={<i className="pt-2 px-2 iconfont icon-fangxiang1"></i>} onClick={showProductCatalog}>
                    <div className="mx-3 px-2 font-weight-bold">产品目录</div>
                </LMR>
                <LMR className="bg-white py-3 my-1" right={<i className="pt-2 px-2 iconfont icon-fangxiang1"></i>} onClick={() => showSubject(0)}>
                    <div className="mx-3 px-2 font-weight-bold">帖文栏目</div>
                </LMR>
                <LMR className="bg-white py-3 my-1" right={<i className="pt-2 px-2 iconfont icon-fangxiang1"></i>} onClick={() => showDomain(0)}>
                    <div className="mx-3 px-2 font-weight-bold">研究领域</div>
                </LMR>
                <List before={""} none={none} items={pagePost} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        let { user, showPostDetail, showCustomer } = this.controller;
        if (!user) return;
        let { image, caption, publishdate, hits, sumHits, discription, post } = item;

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
                    <div className="d-flex flex-column w-100" onClick={() => showPostDetail(post)} >
                        <div className="mb-2"><small >{caption}</small>  </div>
                        <div className="small d-flex justify-content-between ">
                            <div className="flex-fill">
                                <EasyTime date={publishdate} />
                            </div>
                            <div className="author">
                                {sumHits && <>阅读<b>{sumHits}</b>次 </>}
                                {hits > 0 && <>周<b>{hits}</b>次</>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="small cursor-pointer text-primary text-right w-6c pt-3 " onClick={() => showCustomer("", { caption: caption, image: image, discription: discription, id: post.id })} >
                    <button className="btn btn-outline-info">分享</button>
                </div>
            </div>
        );
    });
}