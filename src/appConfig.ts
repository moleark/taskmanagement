import { AppConfig } from "tonva";
//import { jnkTop } from "./me/loginTop";
import { tvs } from "./tvs";
import { jnkTop } from './ui';
import logo from '../src/images/logo.png'

export { CApp } from './CApp';

export const appConfig: AppConfig = {
    appName: "百灵威系统工程部/salestask",
    version: "1.0.73", // 版本变化，缓存的uqs才会重载 
    tvs: tvs,
    loginTop: jnkTop,
    oem: '百灵威'
};


abstract class Sales {
    title: string;
    isInner: Boolean;
    couponHeader: string;
    addCouponHeader: string;
    couponType: string;
    couponDefaultValue: number;
    shareTitle: string;

    abstract shareContent(param: any): string;

}


export class InnerSales extends Sales {
    title = 'inner sales';
    isInner = true;
    couponHeader = "积分券";
    addCouponHeader = "添加积分券";
    couponType = "credits";
    couponDefaultValue = 1;
    shareTitle = "专享折扣券";

    shareContent(param: any) {
        return "可享受积分优惠";
    }


};

export class AgentSales extends Sales {
    title = 'angent sales';
    isInner = false;
    couponHeader = "优惠券";
    addCouponHeader = "添加优惠券";
    couponType = "coupon";
    couponDefaultValue = 9.5;
    shareTitle = "专享折扣券"

    shareContent(discount: number) {
        return "可享受" + ((1 - discount) * 100).toFixed(1) + "折";
    }
};

export const setting = {
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    downloadAppurl: "http://agent.jkchemical.com/download/jk-agent.apk",
    sharelogo: "https://agent.jkchemical.com/sharelogo.png",
    logo: logo,
    pageHeaderCss: 'bg-primary py-1',
    salse: undefined as Sales,
}
