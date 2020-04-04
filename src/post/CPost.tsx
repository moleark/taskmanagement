import { nav, QueryPager } from "tonva";
import { CUqBase } from "../CBase";
import { VPostList } from "./VPostList";
import { observable } from "mobx";
import { VCustomer } from "./VCustomer";
import { VPostDetil } from "./VPostDetil";

//页面类
/* eslint-disable */


export class CPost extends CUqBase {
    @observable pagePost: QueryPager<any>;
    @observable pageCustomer: QueryPager<any>;

    //初始化
    protected async internalStart() {
        nav.clear();
    }

    //查询客户--通过名称
    searchByKey = async (key: string, author: string) => {
        this.pagePost = new QueryPager(this.uqs.webBuilder.SearchPostPublish, 15, 30);
        this.pagePost.first({ key: key });
    };

    showPostList = async () => {
        await this.searchByKey("", "0");
        this.openVPage(VPostList);
    };

    showPostDetail = async (param: any) => {
        this.openVPage(VPostDetil, param);
    };

    //查询客户--通过名称
    searchCustomerByKey = async (key: string, post: string) => {
        this.pageCustomer = new QueryPager(this.uqs.salesTask.SearchMyCustomerByPost, 15, 30);
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