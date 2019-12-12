import { AppConfig } from "tonva";
import { tvs } from "./tvs";
import { jnkTop, assistjnkTop } from './ui';
import { Sales } from './model/sales';

export const appConfig: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.0.90", // 版本变化，缓存的uqs才会重载 
    tvs: tvs,
    loginTop: jnkTop,
    oem: '百灵威'
};

export const assistappConfig: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.0.90", // 版本变化，缓存的uqs才会重载 
    tvs: tvs,
    loginTop: assistjnkTop,
    oem: '百灵威'
};

export const setting = {
    //appName: "销售助手",
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    //downloadAppurl: "http://agent.jkchemical.com/download/jk-agent.apk",
    //sharelogo: "https://agent.jkchemical.com/sharelogo.png",
    //logo: logo,
    pageHeaderCss: 'bg-primary py-1',
    sales: undefined as Sales,
}
