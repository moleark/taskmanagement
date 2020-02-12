import * as React from "react";
import { VPage, Page, LMR, List, tv, UserIcon, SearchBox } from "tonva";
import { observer } from "mobx-react";
import { CPost } from "./CPost";
import { setting } from "appConfig";

/**
class Checkbox extends Widget {
    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        this.setValue(val);
    }
    render = () => {
        return <div>sdf  <input type="checkbox" onChange={this.onChange} /></div>;
    };
}
*/

export class VCustomer extends VPage<CPost> {
    private post: any;

    async open(param: any) {
        this.post = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageCustomer } = this.controller;

        let right = (
            <div className="w-19c d-flex">
                <SearchBox
                    className="w-80 mt-1 mr-2"
                    size="sm"
                    onSearch={(key: string) =>
                        this.controller.searchCustomerByKey(key, this.post.id)
                    }
                    placeholder="搜索客户姓名、单位"
                />
            </div>
        );
        let footer = (
            <div className="d-block">
                <div className="w-100  justify-content-end">
                    <button
                        type="button"
                        className="btn btn-primary my-1 mr-3"
                        style={{ padding: "6px 35px 6px 35px" }}
                        onClick={this.share}
                    >
                        分享
                    </button>
                </div>
            </div>
        );
        return (
            <Page
                header="客户"
                onScrollBottom={this.onScrollBottom}
                headerClassName={setting.pageHeaderCss}
                right={right}
                footer={footer}
            >
                <List
                    before={""}
                    none="【无】"
                    items={pageCustomer}
                    item={{ render: this.renderCustomer }}
                />
            </Page>
        );
    });

    private onScrollBottom = async () => {
        await this.controller.pageCustomer.more();
    };

    private imgSmile = (
        <div className="mt-1 mx-2 w-3c h-3c p-1">
            <img className="w-100 h-100" alt="" />
        </div>
    );
    private renderCustomer = (customer: any, index: number) => {
        (customer as any)._source = "VCustomerList";

        let { name, unit, id, webuser } = customer;
        let nameShow = (
            <div className="cursor-pointer font-weight-bold w-100">{name}</div>
        );
        let unitShow = (
            <div className=" cursor-pointer text-muted">
                <small> {tv(unit, s => s.name)}</small>
            </div>
        );
        let date = (
            <div className=" cursor-pointer small">
                <input
                    type="checkbox"
                    onChange={() =>
                        this.controller.cApp.postCustomer.add(id, this.post)
                    }
                />
            </div>
        );
        let left = webuser ? (
            <UserIcon
                className="mt-1 mx-2 w-3c h-3c"
                id={webuser.id}
                style={{ borderRadius: "8px" }}
            />
        ) : (
            this.imgSmile
        );
        return (
            <LMR className="px-2 py-1" left={left}>
                <LMR className="px-1" left={nameShow}></LMR>
                <LMR className="px-1" left={unitShow} right={date}></LMR>
            </LMR>
        );
    };

    private share = async () => {
        let { postCustomer } = this.controller.cApp;
        let { customerlist, post } = postCustomer;
        let { caption, image, id, discription } = post;
        await this.controller.addMyCustomerPost(post, customerlist);
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore  屏蔽错误
            window.plusShare(
                {
                    title: caption, //应用名字
                    content: discription,
                    href: setting.posturl + "/" + id, //分享出去后，点击跳转地址
                    //pictures: ["https://agent.jkchemical.com/logonew.png"],//分享的图片
                    thumbs: [image.obj.path] //分享缩略图
                },
                function(result) {
                    //分享回调
                }
            );
            this.closePage(2);
            postCustomer.clearAll();
        }
    };
}
