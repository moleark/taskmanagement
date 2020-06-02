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
        this.pagePost = new QueryPager(this.uqs.webBuilder.SearchPostPublish, 15, 30);
        this.pagePost.first({ key: key, domain: 0 });
    };

    showPostList = async () => {
        await this.searchByKey("", "0");
        this.openVPage(VPostList);
    };

    //目录树
    showProductCatalog = async () => {
        let results = await this.uqs.product.GetRootCategory.query({ salesRegion: setting.SALESREGION_CN, language: setting.CHINESE });
        this.openVPage(VProductCatalog, results.first);
    }

    searchProductCatalogChildrenKeys = async (key: string) => {
        let results = await this.uqs.product.GetChildrenCategory.query({ parent: key, salesRegion: setting.SALESREGION_CN, language: setting.CHINESE });
        this.openVPage(VProductCatalog, results.first)
    };

    showProductCatalogDetil = async (param: any) => {
        this.pageProductCatalogPost = new QueryPager(this.uqs.webBuilder.SearchProductCategoryPost, 15, 30);
        this.pageProductCatalogPost.first({ author: 0, productCategory: param })
        return await this.vCall(VProductCatalogPost);
    }

    //栏目
    showSubject = async (param: any) => {
        let pageSubject = new QueryPager(this.uqs.webBuilder.SearchSubject, 15, 100);
        pageSubject.first({ _parent: param });
        this.openVPage(VSubject, pageSubject);
    }
    showSubjectPost = async (param: any) => {
        this.pageSubjectPost = new QueryPager(this.uqs.webBuilder.SearchSubjectPost, 15, 30);
        this.pageSubjectPost.first({ author: 0, subject: param.id })
        return await this.vCall(VSubjectPost);
    }

    //研究领域
    showDomain = async (param: any) => {
        let domain = new QueryPager(this.uqs.customer.SearchDomain, 15, 100);
        domain.first({ _parent: param });
        this.openVPage(VDomain, domain);
    }
    showDomainPost = async (param: any) => {
        this.pageDomainPost = new QueryPager(this.uqs.webBuilder.SearchDomainPost, 15, 100);
        this.pageDomainPost.first({ author: 0, domain: param.id })
        this.openVPage(VDomainPost);
    }

    showPostDetail = async (param: any) => {
        this.openVPage(VPostDetil, param);
    };

    //查询客户--通过名称
    searchCustomerByKey = async (key: string, post: string) => {
        this.pageCustomer = new QueryPager(this.uqs.salesTask.SearchMyCustomerByPost, 15, 30);
        this.pageCustomer.first({ key: key, post: post, domain: 0 });
    };

    showCustomer = async (key: string, post: any) => {
        let domainmap = await this.uqs.webBuilder.PostDomain.obj({ post: post.id });
        let domain = domainmap ? domainmap.domain.id : 0;
        this.pageCustomer = new QueryPager(this.uqs.salesTask.SearchMyCustomerByPost, 15, 30);
        this.pageCustomer.first({ key: key, post: post, domain: domain });
        this.openVPage(VCustomer, post);
    };

    addMyCustomerPost = async (post: any, customerid: any) => {
        let param = { post: post.id, customer: customerid };
        await this.uqs.salesTask.AddMyCustomerPost.submit(param);
        await this.uqs.webBuilder.TransmitPost.submit({ _post: post });
    };
}
