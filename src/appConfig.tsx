import { AppConfig } from "tonva";
import { tvs } from "./tvs";
import { jnkTop } from './ui';
import logo from '../src/images/logo.png';
import { Sales } from './model/sales';

export const appConfig: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.0.81", // 版本变化，缓存的uqs才会重载 
    tvs: tvs,
    loginTop: jnkTop,
    oem: '百灵威'
};

export const setting = {
    appName: "轻代理",
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    downloadAppurl: "http://agent.jkchemical.com/download/jk-agent.apk",
    sharelogo: "https://agent.jkchemical.com/sharelogo.png",
    logo: logo,
    pageHeaderCss: 'bg-primary py-1',
    sales: undefined as Sales,
}
