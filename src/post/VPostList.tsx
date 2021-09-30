import * as React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { VPage, Page, List, FA, tv, SearchBox, LMR, EasyTime } from 'tonva-react';
import { CPost } from "./CPost";

import { observable } from "mobx";
/* eslint-disable */
export class VPostList extends VPage<CPost> {
    @observable private isMes: boolean = false;


    async open(customer: any) {
        this.openPage(this.page, customer);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private onScrollBottoms = async () => {
        this.controller.pagePost.more();
    };

    private onMeAll = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.isMes = evt.currentTarget.value === '英';
        await this.controller.setLanguage(this.isMes ? 1 : 0);
    }
    private renderMeAllToggle() {
        let cnButton = ['btn', 'btn-outline-warning', 'btn-sm', 'text-nowrap'];
        return <div className="px-sm-2 d-flex align-items-center">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={classNames(cnButton, { active: !this.isMes })}>
                    <input type="radio" name="options" value="中" defaultChecked={true} onChange={this.onMeAll} />
                    <span className="d-inline d-sm-none">{this.t('中')}</span>
                    <span className="d-none d-sm-inline">{this.t('中文')}</span>
                </label>
                <label className={classNames(cnButton, { active: this.isMes })}>
                    <input type="radio" name="options" value="英" defaultChecked={false} onChange={this.onMeAll} />
                    <span className="d-inline d-sm-none">{this.t('英')}</span>
                    <span className="d-none d-sm-inline">{this.t('英文')}</span>
                </label>
            </div>
        </div>
    }

    private page = observer((product: any) => {
        let { pagePost, searchByKey, showProductCatalog, showSubject, showDomain } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;

        let search = <div className="w-100 d-flex">
            <span className="pt-1 text-white mx-2 text-left" style={{ width: '4rem' }}>帖文</span>
            {this.renderMeAllToggle()}
            <SearchBox
                className="w-100 px-2 small"
                size="sm"
                onSearch={(key: string) => searchByKey(key, "")}
                placeholder="搜索帖文"
            />
        </div>
        return (
            <Page header={search} onScrollBottom={this.onScrollBottoms}  >
                <LMR className="bg-white py-2 my-1" right={<i className="px-2 iconfont icon-fangxiang1"></i>} onClick={showProductCatalog}>
                    <div className="mx-3 px-2 font-weight-bold">产品目录</div>
                </LMR>
                <LMR className="bg-white py-2 my-1" right={<i className="px-2 iconfont icon-fangxiang1"></i>} onClick={() => showSubject({ name: "帖文栏目", id: "10000" + 1 })}>
                    <div className="mx-3 px-2 font-weight-bold">帖文栏目</div>
                </LMR>
                <LMR className="bg-white py-2 my-1" right={<i className="px-2 iconfont icon-fangxiang1"></i>} onClick={() => showDomain({ name: '研究领域', id: 0 })}>
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
        let { image, caption, publishdate, hits, sumHits, emphasis } = item;
        let showImport = emphasis === 1 ?
            <FA className="text-danger ml-3 " name="star" /> : null
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex" >
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
                <div className="d-flex flex-column w-100 cursor-pointer" onClick={() => showPostDetail(item.post)}>
                    <div className="mb-2"><small  >{caption}</small>  </div>
                    <div className="small d-flex justify-content-between mb-2" >
                        <div className="">
                            <EasyTime date={publishdate} />
                            {showImport}
                        </div>
                        <div className="author">
                            {sumHits && <>阅读<b>{sumHits}</b>次 </>}
                            {hits > 0 && <>周<b>{hits}</b>次</>}
                        </div>
                    </div>
                </div>
                <div className="small cursor-pointer text-primary text-right w-6c pt-3 ml-1 w-3c w-min-3c h-3c h-min-3c" onClick={() => showCustomer("", item)} >
                    <button className="btn btn-outline-info  btn-sm">分享</button>
                </div>
            </div>
        );
    });
}