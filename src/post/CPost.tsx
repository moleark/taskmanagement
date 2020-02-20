import { nav, PageItems, Query, QueryPager } from "tonva";
import { CUqBase } from "../CBase";
import { VPostList } from "./VPostList";
import { observable } from "mobx";
import { VCustomer } from "./VCustomer";

//页面类
/* eslint-disable */
class PageCustomer extends PageItems<any> {
    private searchQuery: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchQuery = searchQuery;
    }
    protected async load(
        param: any,
        pageStart: any,
        pageSize: number
    ): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchQuery.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CPost extends CUqBase {
    @observable pagePost: QueryPager<any>;
    @observable pageCustomer: PageCustomer;

    //初始化
    protected async internalStart() {
        nav.clear();
    }

    //查询客户--通过名称
    searchByKey = async (key: string, author: string) => {
        this.pagePost = new QueryPager(
            this.uqs.webBuilder.SearchPostPublish,
            15,
            30
        );
        this.pagePost.first({ key: key });
    };

    showPostList = async () => {
        await this.searchByKey("", "0");
        this.openVPage(VPostList);
    };

    //查询客户--通过名称
    searchCustomerByKey = async (key: string, post: string) => {
        this.pageCustomer = new PageCustomer(
            this.uqs.salesTask.SearchMyCustomerByPost
        );
        this.pageCustomer.first({ key: key, post: post });
    };

    showCustomer = async (key: string, post: any) => {
        await this.searchCustomerByKey(key, post.id);
        this.openVPage(VCustomer, post);
    };

    addMyCustomerPost = async (post: any, customerid: any) => {
        let param = { post: post.id, customer: customerid };
        await this.uqs.salesTask.AddMyCustomerPost.submit(param);
    };
}
