import { AppConfig } from "tonva";
//import { jnkTop } from "./me/loginTop";
import { tvs } from "./tvs";
import { jnkTop } from './ui';
import logo from '../src/images/logonew.png'

export { CApp } from './CApp';

export const appConfig: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.0.69", // 版本变化，缓存的uqs才会重载 
    tvs: tvs,
    loginTop: jnkTop,
    oem: '百灵威'
};

export const setting = {
    url: "http://agent.jkchemical.com",
    logo: logo,
    pageHeaderCss: 'bg-primary py-1'
}
