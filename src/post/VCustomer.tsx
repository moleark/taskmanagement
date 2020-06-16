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
    private id: string;
    private discription: string;

    @observable showTips: any = "none"
    async open(param: any) {
        this.post = param;
        let { caption, image, id, discription } = this.post;
        this.caption = caption;
        this.image = image.obj.path;
        this.id = id;
        this.discription = discription;

        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageCustomer } = this.controller;

        let right = (
            <div className="w-19c d-flex">
                <SearchBox className="w-80 mt-1 mr-2" size="sm" placeholder="搜索客户姓名、单位"
                    onSearch={(key: string) =>
                        this.controller.searchCustomerByKey(key, this.post.id)
                    }
                />
            </div>
        );

        return (
            <Page header="选择客户" onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss} right={right}>
                <LMR className="px-3 py-1" left={this.imgSmile} right={<div className="mt-3"><button onClick={() => this.share({ id: 0 })} className="btn btn-outline-info">分享微信</button> </div>}>
                    <div className="pt-3 font-weight-bold"> 其他客户</div>
                </LMR>
                {pageCustomer.items && pageCustomer.items.length > 0 && <List before={""} none="【无】" items={pageCustomer} item={{ render: this.renderCustomer }} />}
                <div className="text-center text-white small px-2" style={{ width: '40%', margin: '-80px  auto 0 auto', padding: '4px', borderRadius: '3px', backgroundColor: '#505050', display: this.showTips }}>
                    通过APP才能分享
                </div>
            </Page >
        );
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

        let right = <div className="mt-3"><button className="btn btn-outline-info">分享微信</button></div>;
        let left = webuser ? <UserIcon className="mt-1 mx-2 w-3c h-3c" id={webuser.id} style={{ borderRadius: "8px" }} /> : this.imgSmile;

        return (
            <LMR className="px-3 py-1" left={left} right={right} onClick={() => this.share(customer)}>
                <div className="cursor-pointer font-weight-bold w-100">{name}</div>
                <div className=" cursor-pointer text-muted">
                    <small> {tv(unit, s => s.name)}</small>
                </div>
                <div className="d-flex small">
                    <div>{sharingTimes > 0 ? <FA name="flag text-primary mr-3" /> : <></>}</div>
                    <div className="text-primary">{sharingCount > 0 ? <span>已发{sharingCount}次</span> : <></>}</div>
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

    private share = async (cusotmer: any) => {
        //let { caption, image, id, discription } = this.post;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {

            // @ts-ignore  屏蔽错误
            window.plusShare(
                {
                    title: this.caption, //应用名字
                    content: this.caption + "  " + this.discription,
                    href: setting.posturl + "/" + this.id + "?sales=" + nav.user.id, //分享出去后，点击跳转地址
                    //pictures: ["https://agent.jkchemical.com/logonew.png"],//分享的图片
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
