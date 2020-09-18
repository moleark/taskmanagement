import * as React from "react";
import { VPage, Page, LMR, List, tv, UserIcon, SearchBox, FA, nav } from "tonva";
import { observer } from "mobx-react";
import { CPost } from "./CPost";
import { setting } from "appConfig";
import { observable } from "mobx";
import { GLOABLE } from "ui";
import smile from '../images/smile-face.jpg';

export class VCustomer extends VPage<CPost> {
    private post: any;
    private caption: string;
    private image: string;
    private discription: string;
    private domain: any[];
    private catalog: any[];

    @observable showTips: any = "none"
    async open(param: any) {
        let { caption, image, post, discription, domain, catalog } = param;
        this.caption = caption;
        this.image = image.obj.path;
        this.post = post;
        this.discription = discription;
        this.domain = domain;
        this.catalog = catalog;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageCustomer, searchCustomerByKey, searchCustomerByCategory } = this.controller;
        let search = <div className="w-100 d-flex">
            <span className="pt-1 text-white ml-2" style={{ width: '3rem' }}>分享</span>
            <SearchBox
                className="w-100 px-2 small"
                size="sm"
                onSearch={(key: string) => this.controller.searchCustomerByKey(key, this.post.id, 0)}
                placeholder="搜索客户姓名、单位"
            />
        </div>
        return <Page header={search} onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss} >
            <div className="bg-warning text-white text-center w-100 small px-3">客户浏览高峰在8-9、11-13、15-18时</div>
            <LMR className="px-3 py-3 bg-white d-flex align-items-center"
                onClick={() => this.share({ id: 0 }, "title")}
                left={<FA name='chrome' className="text-warning mr-3 " size="lg" fixWidth={true} />}>
                <span className="font-weight-bold">分享朋友圈</span>
            </LMR>
            <div className="sep-product-select" style={{ margin: "0 auto" }} />
            <LMR className="px-3 py-3 bg-white d-flex align-items-center"
                onClick={() => this.share({ id: 0 }, "content")}
                left={<FA name='wechat' className=" text-success mr-3" size="lg" fixWidth={true} />}>
                <span className="font-weight-bold">分享其他人</span>
            </LMR>
            <div className="sep-product-select" style={{ margin: "0 auto" }} />
            <div className="small text-muted bg-white mt-2 px-3 py-1">筛选：根据贴文相关的目录节点和研究领域筛选客户</div>
            <div className="sep-product-select" style={{ margin: "0 auto" }} />
            <div className="d-flex justify-content-around  bg-white">
                <div className="bg-white px-1 py-1 d-flex w-100"  >
                    <span className="px-2 w-4c text-danger text-center" style={{ borderRight: '1px dotted #ccc' }}><strong>研究领域</strong></span>
                    {this.domain.map((v: any) => {
                        return <div className="text-primary small mx-1 cursor-pointer" onClick={() => searchCustomerByKey("", v.post.id, v.domain.id)}>{tv(v.domain, vv => vv.name)}</div>
                    })}
                </div>
                <div className="bg-white px-1 py-1 d-flex w-100"  >
                    <span className="px-2 w-4c text-danger text-center" style={{ borderRight: '1px dotted #ccc', borderLeft: '1px dotted #ccc' }}><strong>目录节点</strong></span>
                    {this.catalog.map((v: any) => {
                        return <div className="text-primary small mx-1 cursor-pointer" onClick={() => searchCustomerByCategory("", v.productCategory.id)}>{v.name}</div>
                    })}
                </div>
            </div>

            <div className="sep-product-select" style={{ margin: "0 auto" }} />
            {pageCustomer.items && pageCustomer.items.length > 0 && <List before={""} none="【无】" items={pageCustomer} item={{ render: this.renderCustomer }} />}
            <div className="text-center text-white small px-2"
                style={{ width: '40%', margin: '-80px  auto 0 auto', padding: '4px', borderRadius: '3px', backgroundColor: '#505050', display: this.showTips }}>
                通过APP才能分享
            </div>
        </Page >;

    });

    private onScrollBottom = async () => {
        await this.controller.pageCustomer.more();
    };

    private imgSmile = (
        <div className="mt-1 mx-2 w-2c h-2c p-1">
            <img className="w-100 h-100" src={smile} alt="" />
        </div>
    );
    private renderCustomer = (customer: any, index: number) => {
        (customer as any)._source = "VCustomerList";
        let { name, unit, webuser, sharingTimes, sharingCount } = customer;
        let right = <div onClick={() => this.share(customer, "content")}><FA name='wechat text-success mx-3' /></div>;
        let left = webuser ? <UserIcon className="mt-1 mx-2 w-3c h-3c" id={webuser.id} style={{ borderRadius: "8px" }} /> : this.imgSmile;
        let namev = (name && name.length < 3) ? <div className="cursor-pointer font-weight-bold pr-3" > {name}</div> : <div className="cursor-pointer font-weight-bold pr-1" > {name}</div>
        return (
            <LMR className="py-1 align-items-center" left={left}  >
                <div className="cursor-pointer text-muted">
                    <small> {tv(unit, s => s.name)}</small>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        {namev}
                        <div>{sharingTimes > 0 ? <FA name="flag text-primary small" /> : <></>}</div>
                    </div>
                    <div className="d-flex">
                        <div className="text-primary small pt-1">{sharingCount > 0 ? <span>已发{sharingCount}次</span> : <></>}</div>
                        {right}
                    </div>
                </div>
            </LMR>
        );
    };

    onTips = () => {
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    }

    private share = async (cusotmer: any, type: any) => {
        //let { caption, image, id, discription } = this.post;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {

            // @ts-ignore  屏蔽错误
            window.plusShare(
                {
                    title: this.caption, //应用名字
                    content: type === "content" ? this.discription : this.caption,
                    href: GLOABLE.posturl + "/" + this.post.id + "?sales=" + nav.user.id, //分享出去后，点击跳转地址
                    thumbs: [this.image] //分享缩略图
                },
                function (result) {
                    //分享回调
                }
            );
            await this.controller.addMyCustomerPost(this.post, cusotmer.id);
        } else {
            this.onTips();
        }
    };
}
