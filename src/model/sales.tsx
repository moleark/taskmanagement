import * as React from 'react';
import { CApp } from '../CApp';
import { setting } from '../appConfig';
import logo from 'images/logo.png';
import assistlogo from 'images/assistlogo.png';
import { nav } from 'tonva';
import { GLOABLE } from 'ui';


export abstract class AppEnv {
    cApp: CApp;

    constructor() { }
    setCApp(cApp: CApp) {
        this.cApp = cApp;
    }

    title: string;
    logo: string;
    appName: string;
    isInner: Boolean;
    couponDefaultValue: number;
    downloadAppurl: string;
    sharelogo: string;
    abstract achievement(achievement: any): JSX.Element;

    shareTitle(type: string): string {
        return setting.couponType[type];
    }

    shareContent(type: string, discount: number): string {

        let content: string;
        switch (type) {
            case "coupon":
                content = "下单即可享受品牌折扣!";
                break;
            case "credits":
                content = "下单即得双倍积分!";
                break;
            case "vipcard":
                content = "";
                break;
            default:
                break;
        }
        return content;
    };

    /**
     * 
     * @param type 
     * @param coupon 
     * @param product 
     * @param platform 
     */
    shareUrl(type: string, coupon: string, product: any, platform: string): string {
        let url = `${GLOABLE.carturl}?type=${type}&${type}=${coupon}&sales=${nav.user.id}`;
        switch (type) {
            case "coupon":
                if (product)
                    url = url + "&productids=" + product;
                break;
            case "credits":
                url = url + "&platform=" + platform;
                if (product)
                    url = url + "&productids=" + product;
                break;
            case "vipcard":
                break;
            default:
                break;
        }
        return url;
    };
}

export class AssistApp extends AppEnv {

    title = '销售助手';
    logo = assistlogo;
    appName = "销售助手";
    isInner = true;

    couponDefaultValue = 9.5;
    downloadAppurl = "http://agent.jkchemical.com/download/jk-assist.apk";
    sharelogo = "https://assist.jkchemical.com/assistlogo.png";

    achievement(salesAmont: any): JSX.Element {
        let { totalOrderCount, oneSaleVolume } = salesAmont
        return <div className="text-center text-white bg-primary py-5" style={{ borderRadius: '0  0 5rem 5rem', margin: ' 0 -2rem 0 -2rem ' }}>
            <div className="d-flex mb-2" >
                <div className="p-2 flex-fill">
                    <div className="text-warning pt-4" onClick={() => this.cApp.cBalance.showAssistAchievementDetail(0)}>
                        <div className="h5"><strong><span className="h1">{oneSaleVolume}</span><small>￥</small></strong></div>
                    </div>
                    <h6 className="text-warning"><small>销售额</small></h6>
                </div>
                <div className="p-2 flex-fill">
                    <div className="text-warning pt-4" onClick={() => this.cApp.cBalance.showAssistAchievementDetail(0)}>
                        <div className="h5"><strong><span className="h1">{totalOrderCount}</span><small>个</small></strong></div>
                    </div>
                    <h6 className="text-warning"><small>订单数</small></h6>
                </div>
            </div >
            <div className="my-4"></div>
        </div>;
    }
};

export class AgentApp extends AppEnv {
    title = '轻代理';
    appName = "轻代理";
    logo = logo;
    isInner = false;
    couponDefaultValue = 9.5;
    downloadAppurl = "http://agent.jkchemical.com/download/jk-agent.apk";
    sharelogo = "https://assist.jkchemical.com/sharelogo.png";
    divTag(titel: string, achievement: number, status: number) {
        let onClick: any;
        if (status === 1) {
            onClick = async () => await this.cApp.cBalance.showAchievementDetail(status);
        } else {
            onClick = async () => await this.cApp.cBalance.showBalance();
        }
        return <div className="cursor-pointer" onClick={onClick}>
            {achievement <= 0.001 ?
                <div className="h5"> - </div>
                :
                <div className="h5"><strong>{achievement.toFixed(2)}</strong> <span className="h6"><small>元</small></span></div>
            }
            <div className="h6"><small>{titel}</small></div>
        </div >
    }
    achievement(salesAmont: any): JSX.Element {
        let { oneAchievement, twoAchievement, threeAchievement, totalReceivableAmount, totalaWithdrawal } = salesAmont;
        let totalachievement = oneAchievement + twoAchievement + threeAchievement;
        let achievement = oneAchievement + twoAchievement + threeAchievement - totalReceivableAmount;
        let balance = totalReceivableAmount - totalaWithdrawal;
        return <div className="text-center text-white bg-primary pt-1 pb-5" style={{ borderRadius: '0  0 5rem 5rem', margin: ' 0 -2rem 0 -2rem ' }}>
            <div className="pb-2 pt-4 cursor-pointer" >
                <div className="text-warning pt-4" onClick={async () => await this.cApp.cBalance.showAchievementDetail(0)}>
                    <span className="h1">{totalachievement.toFixed(2)}</span>
                    <small> 元</small>
                </div>
                <h6 className="text-warning"><small>累计收益</small></h6>
            </div >
            <div className="d-flex justify-content-around">
                {this.divTag('待到帐', achievement, 1)}
                {this.divTag('余额', balance, 2)}
            </div>
            <div className="my-4"></div>
        </div>;
    }
};
