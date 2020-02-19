import { nav, PageItems, Query, QueryPager } from "tonva";
import { CUqBase } from "../CBase";
import { VPostList } from "./VPostList";
import { observable } from "mobx";
import { VPostDetil } from "./VPostDetil";
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
    @observable current: any;
    //初始化
    protected async internalStart() {
        nav.clear();
    }

    //查询客户--通过名称
    searchByKey = async (key: string, author: string) => {
        this.pagePost = new QueryPager(this.uqs.webBuilder.SearchPost, 15, 30);
        this.pagePost.first({ key: key, author: author });
    };

    showPostList = async () => {
        await this.searchByKey("", "0");
        this.openVPage(VPostList);
    };

    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.Post.load(id);
        this.openVPage(VPostDetil);
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

    addMyCustomerPost = async (post: any, customerlist: any) => {
        for (let i: number = 0; i < customerlist.length; i++) {
            let param = { post: post.id, customer: customerlist[i] };
            await this.uqs.salesTask.AddMyCustomerPost.submit(param);
        }
    };
}
