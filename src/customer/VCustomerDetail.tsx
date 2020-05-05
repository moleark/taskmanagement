import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import {
    VPage, Page, tv, LMR, ComponentProp, Prop, PropGrid, FA, List, EasyDate, nav
} from "tonva";
import { CCustomer } from "./CCustomer";
import { setting } from "appConfig";

const potentialText: { [v: number]: string } = {
    0: "小于10万",
    1: "10万-30万",
    2: "大于30万"
};

const genderText: { [v: number]: string } = {
    0: "女",
    1: "男"
};

export class VCustomerDetail extends VPage<CCustomer> {
    @observable private customer: any;
    isBinded: boolean = false;

    async open(param: any) {
        this.customer = param;
        this.checkBinding();
        this.openPage(this.page, param);
    }

    private checkBinding = async () => {
        let binded = await this.controller.checkBinding(this.customer);
        if (binded) {
            this.isBinded = true;
        } else {
            this.isBinded = false;
        }
    };

    private renderTask = (task: any, index: number) => {
        let showDetail = () =>
            this.controller.cApp.cSalesTask.showTaskDetailEdit(task);
        let { description, deadline, result } = task;
        let right = (
            <div className="text-right">
                <div className="text-muted small">
                    {<EasyDate date={deadline} />}{" "}
                </div>
                <div className="text-muted small">
                    {result ? "已完结" : "待处理"}{" "}
                </div>
            </div>
        );
        return (
            <div className="d-block py-2 px-3">
                <LMR
                    left={<strong>{description}</strong>}
                    right={right}
                    onClick={showDetail}
                ></LMR>
            </div>
        );
    };

    private renderPost = (item: any, index: number) => {
        let { caption } = item;
        let right = <div className="text-primary">分享</div>;
        return (
            <LMR
                className="px-3 my-3 cursor-pointer small"
                right={right}
                onClick={() => this.share(item)}
            >
                <div>{caption}</div>
            </LMR>
        );
    };

    private share = async (post: any) => {
        await this.controller.cApp.cPost.addMyCustomerPost(
            post,
            this.customer.id
        );
        let { caption, image, id, discription } = post;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore  屏蔽错误
            window.plusShare(
                {
                    title: caption, //应用名字
                    content: discription,
                    href: setting.posturl + "/" + id + "?sales=" + nav.user.id, //分享出去后，点击跳转地址
                    //pictures: ["https://agent.jkchemical.com/logonew.png"],//分享的图片
                    thumbs: [image.obj.path] //分享缩略图
                },
                function (result) {
                    //分享回调
                }
            );
        }
    };

    private renderTitle = (
        title: string,
        editIcon: string,
        editAction: any,
        otherIcon: string,
        otherAction: any
    ) => {
        let iconeiditname = "iconfont " + editIcon + " text-primary";
        let iconeqitaname = "iconfont " + otherIcon + " text-primary ml-3";
        return (
            <div className="px-3 py-2 strong d-flex justify-content-between mt-3 bg-white">
                <div>
                    <strong className="text-primary">{title}</strong>
                </div>
                <div>
                    {editIcon === "" ? (
                        undefined
                    ) : (
                            <span
                                className={iconeiditname}
                                style={{ fontSize: "18px" }}
                                onClick={editAction}
                            ></span>
                        )}
                    {otherIcon === "" ? (
                        undefined
                    ) : (
                            <span
                                className={iconeqitaname}
                                style={{ fontSize: "18px" }}
                                onClick={otherAction}
                            ></span>
                        )}
                </div>
            </div>
        );
    };

    private renderOrder = (model: any, index: number) => {
        let { order, orderNo, date } = model;
        let { showCustomerOrderDetail } = this.controller;
        return (
            <div className="d-block py-2 px-3">
                <LMR
                    onClick={() => showCustomerOrderDetail(order)}
                    left={<strong>{orderNo}</strong>}
                    right={
                        <div className="text-muted small">
                            <EasyDate date={date} />
                        </div>
                    }
                ></LMR>
            </div>
        );
    };

    private geneCustomerPropertyComponent(name: string, showName: string, value: any) {
        return {
            type: "component",
            name: name,
            component: (
                <LMR
                    className="cursor-pointer w-100 py-2"
                    left={<div>{showName}</div>}
                    right={<div className="text-right">{value}</div>}
                ></LMR>
            )
        } as ComponentProp;
    }

    private page = observer((param: any) => {
        let { id: customerid, unit, name, salutation, telephone, gender,
            email, wechat, teacher, addressString, potential, research, department, officePost, mobile } = param;

        let rows: Prop[] = [];
        if (unit)
            rows.push(this.geneCustomerPropertyComponent("customer", "单位", <>{tv(unit)}</>));
        rows.push(this.geneCustomerPropertyComponent("name", "姓名", name));
        if (salutation)
            rows.push(this.geneCustomerPropertyComponent("salutation", "称谓", salutation));
        if (gender)
            rows.push(this.geneCustomerPropertyComponent("salutation", "性别", genderText[gender]));
        if (mobile) {
            let telephoneShow = <div>
                <a className="text-default" href={"tel:" + mobile} style={{ textDecorationLine: "none" }}  >
                    <FA name="phone" className="text-success px-1" />
                    {mobile}
                </a>
            </div>
            rows.push(this.geneCustomerPropertyComponent("mobile", "手机号", telephoneShow));
        }
        if (telephone)
            rows.push(this.geneCustomerPropertyComponent("telephone", "固话", telephone));
        if (email)
            rows.push(this.geneCustomerPropertyComponent("email", "Email", email));
        if (wechat)
            rows.push(this.geneCustomerPropertyComponent("wechat", "微信", wechat));
        if (teacher)
            rows.push(this.geneCustomerPropertyComponent("teacher", "老师", teacher));
        if (addressString)
            rows.push(this.geneCustomerPropertyComponent("addressString", "地址", addressString));
        if (potential)
            rows.push(this.geneCustomerPropertyComponent("potential", "潜力值", potentialText[potential]));
        if (research)
            rows.push(this.geneCustomerPropertyComponent("research", "研究方向", <>{tv(research.research, v => v.name)}</>));
        if (department)
            rows.push(this.geneCustomerPropertyComponent("research", "部门", <>{tv(department.department, v => v.name)}</>));
        if (officePost)
            rows.push(this.geneCustomerPropertyComponent("research", "职位", <>{tv(officePost.officePost, v => v.name)}</>));
        rows.push(this.geneCustomerPropertyComponent("bingding", "绑定状态", (this.isBinded ? "已绑定" : "未绑定")));


        let { showCustomerEdit, cApp, activetasks, customerorders, pagePost } = this.controller;
        let header: any = <span>{this.customer.name}</span>;
        let editCustomerButton = (
            <div className="mt-2">
                <span
                    className="iconfont icon-bianji mx-3 "
                    onClick={() => showCustomerEdit(this.customer)}
                ></span>
            </div>
        );

        let { cSalesTask } = cApp;
        let { showCustomerHistory, showCreateTaskOfCustomer } = cSalesTask;
        let taskShowTitle: any, taskShow: any;
        taskShowTitle = this.renderTitle(
            "待办事项",
            "icon-tianjia",
            () => showCreateTaskOfCustomer(this.customer),
            "icon-qita",
            () => showCustomerHistory(customerid)
        );
        if (activetasks.length > 0) {
            taskShow = (
                <List
                    before={""}
                    none="无"
                    items={activetasks}
                    item={{ render: this.renderTask }}
                />
            );
        }

        let orderShowTitle: any, orderShow: any;
        if (customerorders.length > 0) {
            orderShowTitle = this.renderTitle(
                "历史订单",
                "",
                undefined,
                "",
                undefined
            );
            orderShow = (
                <List
                    before={""}
                    none="无"
                    items={customerorders}
                    item={{ render: this.renderOrder }}
                />
            );
        }

        let postShow: any, postShowTitle: any;
        if (pagePost.items && pagePost.items.length > 0) {
            postShowTitle = this.renderTitle("推文分享", undefined, undefined, undefined, undefined);
            postShow = (
                <List
                    before={""}
                    none="无"
                    items={pagePost}
                    item={{ render: this.renderPost }}
                />
            );
        }

        return (
            <Page
                header={header}
                headerClassName={setting.pageHeaderCss}
                right={editCustomerButton}
            >
                <PropGrid
                    rows={rows}
                    values={this.customer}
                    alignValue="right"
                />
                {taskShowTitle}
                {taskShow}
                {orderShowTitle}
                {orderShow}
                {postShowTitle}
                {postShow}
            </Page>
        );
    });
}
