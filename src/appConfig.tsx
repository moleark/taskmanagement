import _ from "lodash";
import { AppConfig } from "tonva";
import { tvs } from "./tvs";
import { jnkTop, assistjnkTop } from "./ui";
import { Sales } from "./model/sales";

const appConfigBase: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.1.27", // 版本变化，缓存的uqs才会重载
    tvs: tvs,
    loginTop: undefined,
    oem: "百灵威"
};

export const appConfig: AppConfig = _.merge(_.clone(appConfigBase), {
    loginTop: jnkTop
});

export const assistAppConfig: AppConfig = _.merge(_.clone(appConfigBase), {
    loginTop: assistjnkTop
});

export const setting = {
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    posturl: "https://web.jkchemical.com/post",
    userIcon: "",
    //assistDomain: "assist.jkchemical.com",
    assistDomain: "localhost",
    appUrlDomain: "localhost",
    pageHeaderCss: "bg-primary",
    sales: undefined as Sales,
    SALESREGION_CN: 1,
    CHINESE: 196,
    couponType: { "coupon": "优惠券", "credits": "积分券", "vipcard": "VIP卡" }
};

const agentConfig = {
    documentTitle: "轻代理",
    favicon: "/logo.png",
    appConfig: appConfig,
}

const assistConfig = {
    documentTitle: "销售助手",
    favicon: "/assistlogo.png",
    appConfig: assistAppConfig,
}

export const isAssistApp = document.domain === setting.assistDomain;
export const appEnvConfig = document.domain === setting.assistDomain ? assistConfig : agentConfig