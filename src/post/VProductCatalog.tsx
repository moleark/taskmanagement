import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from 'tonva-react';
import { observable } from "mobx";
import { CPost } from "./CPost";
import { setting } from "appConfig";

export class VProductCatalog extends VPage<CPost> {

    @observable caption: any;
    @observable pageProductCatalog: any;
    @observable pageChildProductCatalog: any[];

    async open(param: any) {
        this.pageProductCatalog = param.data;
        this.pageChildProductCatalog = param.childdata;
        this.caption = param.name;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={this.caption} headerClassName={setting.pageHeaderCss} >
                <List before={""} none="无" items={this.pageProductCatalog} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { searchProductCatalogChildrenKeys, renderProductCatalogPostCount } = this.controller;
        let { name, productCategory } = model;
        let counts = renderProductCatalogPostCount(productCategory.id);
        let rows: any[];
        if (this.pageChildProductCatalog) {
            rows = this.pageChildProductCatalog.find(v => v.parent === productCategory.id);
        }

        let next: any;
        if (rows || this.caption === "产品目录") {
            next = < div className="w-7c ml-3" onClick={() => searchProductCatalogChildrenKeys(model)} >
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

        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 py-3 d-flex justify-content-between">
                <div className="mx-2  small" >
                    <span>{name}</span>
                </div>
                <div className="d-flex">
                    <div className="w-7c mr-3  text-primary text-center cursor-pointer" onClick={() => this.controller.showProductCatalogDetil(productCategory.id)} >
                        {counts}
                    </div>
                    {next}
                </div>
            </div >
        );
    };
}