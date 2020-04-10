import _ from "lodash";
import { AppConfig } from "tonva";
import { tvs } from "./tvs";
import { jnkTop, assistjnkTop } from "./ui";
import { Sales } from "./model/sales";

const appConfigBase: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.1.25", // 版本变化，缓存的uqs才会重载
    tvs: tvs,
    loginTop: undefined,
    oem: "百灵威"
};

export const appConfig: AppConfig = _.merge(_.clone(appConfigBase), {
    loginTop: jnkTop
});

export const assistappConfig: AppConfig = _.merge(_.clone(appConfigBase), {
    loginTop: assistjnkTop
});

export const setting = {
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    posturl: "https://web.jkchemical.com/post",
    userIcon: "",
    appUrlDomain: "assist.jkchemical.com",
    //appUrlDomain: "localhost",
    pageHeaderCss: "bg-primary",
    sales: undefined as Sales
};
