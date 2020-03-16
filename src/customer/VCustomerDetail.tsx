import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import {
    VPage,
    Page,
    Schema,
    UiSchema,
    UiInputItem,
    UiRadio,
    tv,
    LMR,
    ComponentProp,
    Prop,
    PropGrid,
    FA,
    List,
    EasyDate,
    nav
} from "tonva";
import { CCustomer } from "./CCustomer";
import {
    mobileValidation,
    nameValidation,
    emailValidation
} from "tools/inputValidations";
import { setting } from "appConfig";

export const myCustomerSchema: Schema = [
    { name: "name", type: "string", required: true },
    { name: "salutation", type: "string" },
    { name: "telephone", type: "number", required: true },
    { name: "gender", type: "number" },
    { name: "email", type: "string" },
    { name: "wechat", type: "string" },
    // { name: 'teacher', type: 'string' },
    { name: "potential", type: "string" },
    { name: "research", type: "string" },
    { name: "addressString", type: "string" }
];

export const myCustomerUISchema: UiSchema = {
    items: {
        name: {
            widget: "text",
            label: "姓名",
            placeholder: "请输入姓名",
            rules: nameValidation
        } as UiInputItem,
        salutation: {
            widget: "text",
            label: "称谓",
            placeholder: "请输入称谓"
        } as UiInputItem,
        telephone: {
            widget: "text",
            label: "手机号",
            placeholder: "请输入手机号",
            rules: mobileValidation
        } as UiInputItem,
        gender: {
            widget: "radio",
            label: "性别",
            list: [
                { value: "1", title: "男" },
                { value: "0", title: "女" }
            ]
        } as UiRadio,
        birthDay: {
            widget: "datetime",
            label: "生日",
            placeholder: "请输入生日"
        } as UiInputItem,
        email: {
            widget: "text",
            label: "Email",
            placeholder: "请输入Email",
            rules: emailValidation
        } as UiInputItem,
        wechat: {
            widget: "text",
            label: "微信",
            placeholder: "请输入微信号"
        } as UiInputItem,
        teacher: {
            widget: "text",
            label: "老师",
            placeholder: "请输入老师姓名"
        } as UiInputItem,
        addressString: {
            widget: "text",
            label: "地址",
            placeholder: "请输地址"
        } as UiInputItem,
        potential: {
            widget: "radio",
            label: "潜力值",
            list: [
                { value: 0, title: "小于10万" },
                { value: 1, title: "10万-30万" },
                { value: 2, title: "大于30万" }
            ]
        } as UiRadio,
        research: {
            widget: "radio",
            label: "研究方向",
            list: [
                { value: 0, title: "有机" },
                { value: 1, title: "化学" },
                { value: 2, title: "分析" },
                { value: 3, title: "材料" }
            ]
        } as UiRadio
    }
};

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

    private renderContent = (item: any, index: number) => {
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
        iconeidit: string,
        eiditAction: any,
        iconeqita: string,
        qitaActiom: any
    ) => {
        let iconeiditname = "iconfont " + iconeidit + " text-primary";
        let iconeqitaname = "iconfont " + iconeqita + " text-primary ml-3";
        return (
            <div>
                <div className="px-3 py-2 strong d-flex justify-content-between">
                    <div>
                        <strong className="text-primary">{title}</strong>
                    </div>
                    <div>
                        {iconeidit === "" ? (
                            undefined
                        ) : (
                                <span
                                    className={iconeiditname}
                                    style={{ fontSize: "18px" }}
                                    onClick={eiditAction}
                                ></span>
                            )}
                        {iconeqita === "" ? (
                            undefined
                        ) : (
                                <span
                                    className={iconeqitaname}
                                    style={{ fontSize: "18px" }}
                                    onClick={qitaActiom}
                                ></span>
                            )}
                    </div>
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

    private page = observer((param: any) => {
        let { cSalesTask } = this.controller.cApp;
        let { showCustomerHistory } = cSalesTask;
        let { id: customerid, unit, name, salutation, telephone, gender, email, wechat, teacher, addressString, potential, research, department, officePost, mobile } = param;
        var genderShow = gender === undefined ? "" : genderText[gender];
        var potentialShow =
            potential === undefined ? "[无]" : potentialText[potential];
        let telephoneShow = mobile && (
            <div>
                <a className="text-default" href={"tel:" + mobile} style={{ textDecorationLine: "none" }}  >
                    <FA name="phone" className="text-success px-1" />
                    {mobile}
                </a>
            </div>
        );

        let rows: Prop[] = [];
        if (unit)
            rows.push({
                type: "component",
                name: "customer",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>单位
                            </div>
                        }
                        right={<div className="text-right">{tv(unit)}</div>}
                    ></LMR>
                )
            } as ComponentProp);
        rows.push({
            type: "component",
            name: "name",
            component: (
                <LMR
                    className="cursor-pointer w-100 py-2"
                    left={
                        <div>
                            <small></small>姓名
                        </div>
                    }
                    right={<div className="text-right">{name}</div>}
                ></LMR>
            )
        } as ComponentProp);
        if (salutation)
            rows.push({
                type: "component",
                name: "salutation",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>称谓
                            </div>
                        }
                        right={<div className="text-right">{salutation}</div>}
                    ></LMR>
                )
            } as ComponentProp);
        if (gender)
            rows.push({
                type: "component",
                name: "salutation",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>性别
                            </div>
                        }
                        right={<div className="text-right">{genderShow}</div>}
                    ></LMR>
                )
            } as ComponentProp);
        if (mobile)
            rows.push({
                type: "component",
                name: "mobile",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>手机号
                            </div>
                        }
                        right={telephoneShow}
                    ></LMR>
                )
            } as ComponentProp);
        if (telephone)
            rows.push({
                type: "component",
                name: "telephone",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>固话
                            </div>
                        }
                        right={<div className="text-right">{telephone}</div>}
                    ></LMR>
                )
            } as ComponentProp);
        if (email)
            rows.push({
                type: "component",
                name: "email",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>Email
                            </div>
                        }
                        right={<div className="text-right">{email}</div>}
                    ></LMR>
                )
            } as ComponentProp);
        if (wechat)
            rows.push({
                type: "component",
                name: "wechat",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>微信
                            </div>
                        }
                        right={<div className="text-right">{wechat}</div>}
                    ></LMR>
                )
            } as ComponentProp);
        if (teacher)
            rows.push({
                type: "component",
                name: "teacher",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>老师
                            </div>
                        }
                        right={<div className="text-right">{teacher}</div>}
                    ></LMR>
                )
            } as ComponentProp);
        if (addressString)
            rows.push({
                type: "component",
                name: "addressString",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>地址
                            </div>
                        }
                        right={
                            <div className="text-right">{addressString}</div>
                        }
                    ></LMR>
                )
            } as ComponentProp);
        if (potential)
            rows.push({
                type: "component",
                name: "potential",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>潜力值
                            </div>
                        }
                        right={
                            <div className="text-right">{potentialShow}</div>
                        }
                    ></LMR>
                )
            } as ComponentProp);
        if (research)
            rows.push({
                type: "component",
                name: "research",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>研究方向
                            </div>
                        }
                        right={
                            <div className="text-right">
                                {" "}
                                {tv(research.research, v => v.name)}
                            </div>
                        }
                    ></LMR>
                )
            } as ComponentProp);
        if (department)
            rows.push({
                type: "component",
                name: "research",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>部门
                            </div>
                        }
                        right={
                            <div className="text-right">
                                {" "}
                                {tv(department.department, v => v.name)}
                            </div>
                        }
                    ></LMR>
                )
            } as ComponentProp);
        if (officePost)
            rows.push({
                type: "component",
                name: "research",
                component: (
                    <LMR
                        className="cursor-pointer w-100 py-2"
                        left={
                            <div>
                                <small></small>职位
                            </div>
                        }
                        right={
                            <div className="text-right">
                                {tv(officePost.officpost, v => v.name)}
                            </div>
                        }
                    ></LMR>
                )
            } as ComponentProp);
        rows.push({
            type: "component",
            name: "binding",
            component: (
                <LMR
                    className="cursor-pointer w-100 py-2"
                    left={
                        <div>
                            <small></small>绑定状态
                        </div>
                    }
                    right={this.isBinded ? "已绑定" : "未绑定"}
                ></LMR>
            )
        } as ComponentProp);

        let {
            showCustomerEdit,
            cApp,
            activetasks,
            custoemrorders,
            pagePost
        } = this.controller;
        let onshowCustomerEdit = () => showCustomerEdit(this.customer);
        let onshowAddTsak = () =>
            cApp.cSalesTask.showCreateTaskOfCustomer(this.customer);
        let onshowCustomerHistory = () => showCustomerHistory(customerid);
        let header: any = <span>{this.customer.name}</span>;
        let right = (
            <div className="mt-2">
                <span
                    className="iconfont icon-bianji mx-3 "
                    onClick={onshowCustomerEdit}
                ></span>
            </div>
        );

        let taskShow_titel: any;
        let taskShow: any;

        taskShow_titel = this.renderTitle(
            "待办事项",
            "icon-tianjia",
            onshowAddTsak,
            "icon-qita",
            onshowCustomerHistory
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

        let orderShow_titel: any;
        let orderShow: any;
        if (custoemrorders.length > 0) {
            orderShow_titel = this.renderTitle(
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
                    items={custoemrorders}
                    item={{ render: this.renderOrder }}
                />
            );
        }

        let postShow: any;
        if (pagePost.items && pagePost.items.length > 0) {
            postShow = (
                <List
                    className="mt-3"
                    before={""}
                    none="无"
                    items={pagePost}
                    item={{ render: this.renderContent }}
                />
            );
        }

        return (
            <Page
                header={header}
                headerClassName={setting.pageHeaderCss}
                right={right}
            >
                <PropGrid
                    rows={rows}
                    values={this.customer}
                    alignValue="right"
                />
                {taskShow_titel}
                {taskShow}
                {orderShow_titel}
                {orderShow}
                {postShow}
            </Page>
        );
    });
}
