import * as React from 'react';
import { CApp } from '../CApp';
import { setting } from '../appConfig';

export abstract class Sales {
    cApp: CApp;
    constructor(cApp: CApp) {
        this.cApp = cApp;
    }

    title: string;
    isInner: Boolean;
    couponHeader: string;
    addCouponHeader: string;
    couponType: string;
    couponDefaultValue: number;
    divTag(titel: string, achievement: number, status: number) {
        return <div className="cursor-pointer" onClick={async () => await this.cApp.cMe.showAchievementDetail(status)}>
            {achievement <= 0.001 ?
                <div className="h5"> - </div>
                :
                <div className="h5"><strong>{achievement.toFixed(2)}</strong> <span className="h6"><small>元</small></span></div>
            }
            <div className="h6"><small>{titel}</small></div>
        </div >
    }
    abstract achievement(achievement: any): JSX.Element;
    abstract shareTitle(type: string): string;
    abstract shareContent(discount: number): string;
    abstract shareUrl(coupon: string, product: any): string;
}

export class InnerSales extends Sales {
    title = 'inner sales';
    isInner = true;
    couponHeader = "积分券";
    addCouponHeader = "添加积分券";
    couponType = "credits";
    couponDefaultValue = 1;
    achievement(salesAmont: any): JSX.Element {

        return <div className="text-center text-white bg-primary pt-1 pb-5" style={{ borderRadius: '0  0 5rem 5rem', margin: ' 0 -2rem 0 -2rem ' }}>
            <div className="pb-2 pt-4 cursor-pointer" >
                <div className="text-warning pt-4" onClick={async () => await this.cApp.cMe.showAchievementDetail(0)}>
                    <span className="h1">{salesAmont.totalOrderCount}</span>
                    <small> 个</small>
                </div>
                <h6 className="text-warning"><small>累计订单</small></h6>
            </div >
            <div className="my-4"></div>
        </div>;
    }

    shareTitle(type: string): string {
        return type === "coupon" ? "积分券" : "专享积分券";
    };
    shareContent(discount: number): string {
        return "可获得积分";
    };
    shareUrl(coupon: string, product: any): string {
        return setting.carturl + "?type=" + this.couponType + "&coupon=" + coupon + "&productids=" + product;
    };
};

export class AgentSales extends Sales {
    title = 'angent sales';
    isInner = false;
    couponHeader = "优惠券";
    addCouponHeader = "添加优惠券";
    couponType = "coupon";
    couponDefaultValue = 9.5;
    achievement(salesAmont: any): JSX.Element {
        let { oneAchievement, twoAchievement, threeAchievement } = salesAmont;
        let achievement = oneAchievement + twoAchievement + threeAchievement;
        return <div className="text-center text-white bg-primary pt-1 pb-5" style={{ borderRadius: '0  0 5rem 5rem', margin: ' 0 -2rem 0 -2rem ' }}>
            <div className="pb-2 pt-4 cursor-pointer" >
                <div className="text-warning pt-4" onClick={async () => await this.cApp.cMe.showAchievementDetail(0)}>
                    <span className="h1">{achievement.toFixed(2)}</span>
                    <small> 元</small>
                </div>
                <h6 className="text-warning"><small>累计收益</small></h6>
            </div >
            <div className="d-flex justify-content-around">
                {this.divTag('待到款', achievement, 1)}
                {this.divTag('可提现', 0, 1)}
            </div>
            <div className="my-4"></div>
        </div>;
    }

    shareTitle(type: string): string {
        return type === "coupon" ? "折扣券" : "专享折扣券";
    };
    shareContent(discount: number): string {
        return "可享受" + ((1 - discount) * 100).toFixed(0) + "折";
    };
    shareUrl(coupon: string, product: any): string {
        if (product) {
            return setting.carturl + "?type=" + this.couponType + "&coupon=" + coupon + "&productids=" + product;
        } else {
            return setting.carturl + "?type=" + this.couponType + "&coupon=" + coupon;
        }
    };
};
