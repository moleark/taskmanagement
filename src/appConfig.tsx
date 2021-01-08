import _ from "lodash";
import { AppConfig } from "tonva";
import { tvs } from "./tvs";
import { jnkTop, assistjnkTop, GLOABLE } from "./ui";
import { AppEnv } from "./model/sales";

const appConfigBase: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.2.93", // 版本变化，缓存的uqs才会重载
    tvs: tvs,
    loginTop: undefined,
    oem: "百灵威"
};

const agentAppConfig: AppConfig = _.merge(_.clone(appConfigBase), {
    loginTop: jnkTop
});

const assistAppConfig: AppConfig = _.merge(_.clone(appConfigBase), {
    loginTop: assistjnkTop
});

const setting_agent = {
    pageHeaderCss: "bg-primary",
    sales: undefined as AppEnv,
    couponType: { "coupon": "优惠券", "credits": "积分券", "vipcard": "VIP卡" }
}

const setting_assist = {
    pageHeaderCss: "bg-primary",
    sales: undefined as AppEnv,
    couponType: { "coupon": "优惠券", "credits": "积分券", "vipcard": "VIP卡" }
}

export const setting = GLOABLE.IsAssistApp ? setting_assist : setting_agent
export const appConfig = GLOABLE.IsAssistApp ? assistAppConfig : agentAppConfig;