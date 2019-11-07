import { AppConfig } from "tonva";
//import { jnkTop } from "./me/loginTop";
import { tvs } from "./tvs";
import { jnkTop } from './ui';
import logo from '../src/images/logo.png'

export { CApp } from './CApp';

export const appConfig: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.0.72", // 版本变化，缓存的uqs才会重载 
    tvs: tvs,
    loginTop: jnkTop,
    oem: '百灵威'
};

export const setting = {
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    downloadAppurl: "http://agent.jkchemical.com/download/jk-agent.apk",
    logo: logo,
    pageHeaderCss: 'bg-primary py-1',
    isInnerSales: false
}
