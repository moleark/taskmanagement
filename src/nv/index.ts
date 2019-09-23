import { AppConfig } from "tonva";
//import { jnkTop } from "./me/loginTop";
import { tvs } from "./tvs";
import { jnkTop } from './ui';

export { CApp } from './CApp';

export const appConfig: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.0.17",                   // 版本变化，缓存的uqs才会重载
    tvs: tvs,
    loginTop: jnkTop,
};
