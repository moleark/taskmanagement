import * as React from "react";
import { nav, QueryPager } from "tonva";
import { CUqBase } from "../CBase";
import { VPostList } from "./VPostList";
import { observable } from "mobx";
import { VCustomer } from "./VCustomer";
import { VPostDetil } from "./VPostDetil";
import { VProductCatalog } from "./VProductCatalog";
import { setting } from "appConfig";
import { VProductCatalogPost } from "./VProductCatalogPost";
import { VSubject } from "./VSubject";
import { VSubjectPost } from "./VSubjectPost";
import { VDomain } from "./VDomain";
import { VDomainPost } from "./VDomainPost";
import { observer } from "mobx-react";
import { GLOABLE } from "ui";

//页面类
/* eslint-disable */


export class CPost extends CUqBase {
    @observable pagePost: QueryPager<any>;
    @observable pageCustomer: QueryPager<any>;
    @observable pageProductCatalogPost: QueryPager<any>;
    @observable pageSubjectPost: QueryPager<any>;
    @observable pageDomainPost: QueryPager<any>;

    //初始化
    protected async internalStart() {
        nav.clear();
    }

    //查询客户--通过名称
    searchByKey = async (key: string, domain: string) => {
        let publish = setting.sales.isInner ? 3 : 2;
        this.pagePost = new QueryPager(this.uqs.webBuilder.SearchPostPublish, 15, 30);
        this.pagePost.first({ key: key, domain: 0, publish: publish });
    };

    showPostList = async () => {
        await this.searchByKey("", "0");
        this.openVPage(VPostList);
    };

    //目录树
    showProductCatalog = async () => {
        let { SALESREGION_CN, CHINESE } = GLOABLE;
        let results = await this.uqs.product.GetRootCategory.query({ salesRegion: SALESREGION_CN, language: CHINESE });
        this.openVPage(VProductCatalog, results.first);
    }

    searchProductCatalogChildrenKeys = async (key: string) => {
        let { SALESREGION_CN, CHINESE } = GLOABLE;
        let results = await this.uqs.product.GetChildrenCategory.query({ parent: key, salesRegion: SALESREGION_CN, language: CHINESE });
        this.openVPage(VProductCatalog, results.first)
    };

    showProductCatalogDetil = async (param: any) => {
        let publish = setting.sales.isInner ? 3 : 2;
        this.pageProductCatalogPost = new QueryPager(this.uqs.webBuilder.SearchProductCategoryPost, 15, 30);
        this.pageProductCatalogPost.first({ author: 0, productCategory: param, publish: publish })
        return await this.vCall(VProductCatalogPost);
    }

    //栏目
    showSubject = async (param: any) => {
        let pageSubject = new QueryPager(this.uqs.webBuilder.SearchSubject, 15, 100);
        pageSubject.first({ _parent: param });
        this.openVPage(VSubject, pageSubject);
    }
    showSubjectPost = async (param: any) => {
        let publish = setting.sales.isInner ? 3 : 2;
        this.pageSubjectPost = new QueryPager(this.uqs.webBuilder.SearchSubjectPost, 15, 30);
        this.pageSubjectPost.first({ author: 0, subject: param.id, publish: publish })
        return await this.vCall(VSubjectPost);
    }

    //研究领域
    showDomain = async (param: any) => {
        let domain = new QueryPager(this.uqs.customer.SearchDomain, 15, 100);
        domain.first({ _parent: param });
        this.openVPage(VDomain, domain);
    }
    showDomainPost = async (param: any, key: any) => {
        await this.showDomainPost_Search(param, key);
        this.openVPage(VDomainPost, param);
    }
    showDomainPost_Search = async (param: any, key: any) => {
        let publish = setting.sales.isInner ? 3 : 2;
        this.pageDomainPost = new QueryPager(this.uqs.webBuilder.SearchDomainPost, 15, 100);
        this.pageDomainPost.first({ key: key, author: 0, domain: param.id, publish: publish })
    }


    showPostDetail = async (param: any) => {
        this.openVPage(VPostDetil, param);
    };

    //查询客户--通过名称
    searchCustomerByKey = async (key: string, post: string, domain: any) => {
        this.pageCustomer = new QueryPager(this.uqs.salesTask.SearchMyCustomerByPost, 15, 30);
        this.pageCustomer.first({ key: key, post: post, domain: domain });
    };

    showCustomer = async (key: string, param: any) => {
        let { caption, image, post, discription } = param;
        this.pageCustomer = new QueryPager(this.uqs.salesTask.SearchMyCustomerByPost, 15, 30);
        this.pageCustomer.first({ key: key, post: post.id, domain: 0 });

        let domain = await this.uqs.webBuilder.PostDomain.query({ post: post.id });
        let catalog = await this.uqs.webBuilder.PostProductCatalog.query({ post: post.id });

        let params = { caption, image, post, discription, domain: domain.ret, catalog: catalog.ret }
        this.openVPage(VCustomer, params);
    };

    addMyCustomerPost = async (post: any, customerid: any) => {
        let param = { post: post.id, customer: customerid };
        await this.uqs.salesTask.AddMyCustomerPost.submit(param);
        await this.uqs.webBuilder.TransmitPost.submit({ _post: post });
    };

    onScrollBottom = () => {
        this.pagePost.more();
    };

    render = observer(() => {
        return this.renderView(VPostList);
    });
    tab = () => {
        this.searchByKey("", "");
        return <this.render />;
    };
}
