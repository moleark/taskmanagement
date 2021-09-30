import _ from "lodash";
import { AppConfig, nav, FA } from 'tonva-react';
import { tvs } from "./tvs";
import { jnkTop, assistjnkTop, GLOABLE } from "./ui";
import logo from 'images/logo.png';
import assistlogo from 'images/assistlogo.png';
import { CApp } from "uq-app";

export const appConfig: AppConfig = {
    version: "1.2.99", // 版本变化，缓存的uqs才会重载
    tvs: tvs,
    loginTop: undefined,
    oem: "百灵威"
};

export abstract class AppEnv {
    cApp: CApp;

    setCApp(cApp: CApp) {
        this.cApp = cApp;
    }

    id: string;
    title: string;
    logo: string;
    appName: string;
    isInner: Boolean;
    couponDefaultValue: number;
    downloadAppurl: string;
    sharelogo: string;
    couponType: { "coupon": "优惠券", "credits": "积分券", "vipcard": "VIP卡" };

    abstract userQualified(): Promise<boolean>;

    abstract achievement(achievement: any): JSX.Element;

    divTag(title: string, achievement: number, status: number, showDetail: any) {
        let onClick: any;
        if (status === 1) {
            onClick = async () => await showDetail(status);
        } else {
            onClick = async () => await this.cApp.cBalance.showBalance();
        }
        return <div className="cursor-pointer" onClick={onClick}>
            {achievement <= 0.001 ?
                <div className="h5"> - </div>
                :
                <div className="h5">
                    <strong>{achievement.toFixed(2)}</strong>
                    <span className="h6"><small>元</small></span>
                </div>
            }
            <div className="h6"><small>{title}</small></div>
        </div >
    }

    shareTitle(type: string): string {
        return this.couponType[type];
    }

    shareContent(type: string, isno: any): string {
        let content: string;
        switch (type) {
            case "coupon":
                content = "下单即可享受品牌折扣!";
                break;
            case "credits":
                content = "可享双倍积分!";
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

    onExplanation = <div className="text-right mr-4 pr-4 pt-1 cursor-pointer">
        <span className='p-2' onClick={async (e) => await this.cApp.cBalance.showexplanation(e)}> <FA name="question-circle" className="text-warning" /></span>
    </div>
}

export class AssistApp extends AppEnv {

    title = '销售助手';
    logo = assistlogo;
    appName = "销售助手";
    isInner = true;
    couponDefaultValue = 9.5;
    downloadAppurl = "http://agent.jkchemical.com/download/jk-assist.apk";
    sharelogo = "https://assist.jkchemical.com/assistlogo.png";

    async userQualified() {
        let { uqs, user } = this.cApp;
        let result = await uqs.salesTask.WebUserEmployeeMap.obj({ webuser: user.id });
        return result !== undefined;
    }

    /**
     * “我的”界面上的绩效 
     * @param salesAmont 
     */
    achievement(salesAmont: any): JSX.Element {

        let { cBalance } = this.cApp;
        let { oneAchievement, twoAchievement, threeAchievement, totalReceivableAmount, totalaWithdrawal } = salesAmont;
        let totalachievement = oneAchievement + twoAchievement + threeAchievement;
        let achievement = totalachievement - totalReceivableAmount;
        let balance = totalReceivableAmount - totalaWithdrawal;
        return <div className="text-center text-white bg-primary pt-1 pb-5"
            style={{ borderRadius: '0  0 5rem 5rem', margin: '0 -2rem 0 -2rem' }}>
            {this.onExplanation}
            <div className="pb-2 pt-4 cursor-pointer" >
                <div className="text-warning pt-3" onClick={async () => await cBalance.showAssistAchievementDetail(0)}>
                    <span className="h1">{totalachievement.toFixed(2)}</span>
                    <small> 元</small>
                </div>
                <h6 className="text-warning"><small>累计收益</small></h6>
            </div>
            <div className="d-flex justify-content-around">
                {this.divTag('待到账', achievement, 1, cBalance.showAssistAchievementDetail)}
                {this.divTag('余额', balance, 2, cBalance.showAssistAchievementDetail)}
            </div>
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

    async userQualified() {
        let { uqs } = this.cApp;
        let result = await uqs.salesTask.SearchPosition.obj({ position: undefined });
        return result !== undefined;
    }

    achievement(salesAmont: any): JSX.Element {
        let { cBalance } = this.cApp;

        let { oneAchievement, twoAchievement, threeAchievement, totalReceivableAmount, totalaWithdrawal, waitWithdrawal } = salesAmont;
        let totalachievement = oneAchievement + twoAchievement + threeAchievement;
        let achievement = totalachievement - totalReceivableAmount;
        let balance = totalReceivableAmount - totalaWithdrawal - waitWithdrawal;
        return <div className="text-center text-white bg-primary pt-1 pb-5"
            style={{ borderRadius: '0  0 5rem 5rem', margin: '0 -2rem 0 -2rem' }}>
            {this.onExplanation}
            <div className="pb-2 pt-4 cursor-pointer" >
                <div className="text-warning pt-4" onClick={async () => await cBalance.showAchievementDetail(0)}>
                    <span className="h1">{totalachievement.toFixed(2)}</span>
                    <small> 元</small>
                </div>
                <h6 className="text-warning"><small>累计收益</small></h6>
            </div>
            <div className="d-flex justify-content-around">
                {this.divTag('待到账', achievement, 1, cBalance.showAchievementDetail)}
                {this.divTag('余额', balance, 2, cBalance.showAchievementDetail)}
            </div>
            <div className="my-4"></div>
        </div>;
    }
};

let isAssist = document.location.href.search(/assist/) > 0;
export const appSettings = isAssist ? new AssistApp() : new AgentApp();