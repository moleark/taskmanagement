import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, LMR, FA, tv, SearchBox } from "tonva";
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

    private onClick = (id: any) => {
        window.open("https://web.jkchemical.com/post/" + id, "_blank");
        return false;
    };

    private onScrollBottom = async () => {
        this.controller.pagePost.more();
    };

    private page = observer((product: any) => {
        let { pagePost, searchByKey } = this.controller;
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
                <List
                    before={""}
                    none={none}
                    items={pagePost}
                    item={{ render: this.renderItem }}
                />
            </Page>
        );
    });

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        let { showCustomer } = this.controller;
        let { image, caption } = item;
        let right = (
            <div
                className="small cursor-pointer text-primary text-right w-6c pt-3 "
                onClick={() => showCustomer("", item)}
            >
                <button className="btn btn-outline-info">分享</button>
            </div>
        );
 
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill cursor-pointer" onClick={() => this.controller.showPostDetail(item)} >
                    <div className="mr-3 w-5c w-min-5c h-5c h-min-5c">
                    {tv(
                        image,
						values => <div className="w-100 h-100 bg-center-img h-max-6c border rounded" 
							style={{backgroundImage: 'url(' + values.path + ')'}}></div>,
                        undefined, //w-6c h-4c mr-2 text-black-50 justify-content-center d-flex align-items-center
                        () => (
							<div className="d-flex align-items-center h-100
								justify-content-center bg-light border rounded">
                                <FA
                                    className="text-info"
									name="camera"
									size="lg"
                                />
                            </div>
                        )
                    )}
					</div>
                    {caption}
                </div>
                <div>
                    <div className="small cursor-pointer text-primary text-right w-4c pt-3 " onClick={() => showCustomer("", item)} >
                        <button className="btn btn-outline-info">
                            分享
                        </button>
                    </div>
                </div>
            </div>
        );
    });
}
