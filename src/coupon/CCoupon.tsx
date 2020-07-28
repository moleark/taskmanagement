import { observable } from 'mobx';
import { QueryPager, nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VCouponList } from './VCouponList';
import { VCouponDetail } from './VCouponDetail';
import { VCreateCouponEnd } from './VCreateCouponEnd';
import { VCreateProductCouponEnd } from './VCreateProductCouponEnd';
import { VVIPCardDiscount } from './VVIPCardDiscount';
import { VCreateVIPCardDiscount } from './VCreateVIPCardDiscount';
/**
 *
 */
export class CCoupon extends CUqBase {
    @observable pageCoupon: QueryPager<any>;
    @observable pageCouponUsed: any[];
    @observable pageCouponReceive: any[];

    oneWeek = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    twoWeeks = new Date(Date.now() + 14 * 24 * 3600 * 1000);

    // 创建VIPCardDiscount 
    protected async internalStart(param: any) {
        this.openVPage(VCreateVIPCardDiscount, param);
    }

    /**
     * 
     */
    createVIPCardDiscountCallback = async (webUser: any, vipCardLevel: any, cardType: any, product: any, vipCardDiscountSetting: any[]) => {
        let validitydate: any;
        let now = new Date();
        if (cardType === "vipcard") {
            validitydate = `${now.getFullYear() + 1}-${now.getMonth() + 1}-${now.getDate()}`;
        } else {
            now = this.twoWeeks;
            validitydate = `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}`;
        }
        let vipCardParam: any = {
            webUser: webUser,
            validitydate: validitydate,
            discount: 0,
        }
        let newVIPCard = await this.createCoupon(vipCardParam, { type: cardType });

        let { id, code } = newVIPCard;
        let { salesTask } = this.uqs;
        await this.uqs.salesTask.VIPCardDiscount.add({ coupon: id, arr1: vipCardDiscountSetting });
        if (cardType === "vipcard") {
            await salesTask.VIPCardForWebUser.add({
                webuser: webUser, sales: nav.user.id, vipCard: id,
                arr1: [{ vipCardType: vipCardLevel }]
            });
            this.returnCall(newVIPCard);
            this.closePage();
        } else {
            let param = { code: code, product: product, type: cardType, platform: "1" };
            this.showShareCoupon(param);
        }
    }

    showCouponList = async (types: string) => {
        this.pageCoupon = null;
        await this.searchByKey(undefined, types);
        this.openVPage(VCouponList, types);
    }

    //查询客户--通过名称
    searchByKey = async (key: string, types: string) => {
        this.pageCoupon = new QueryPager(this.uqs.salesTask.SearchCoupon, 15, 30);
        this.pageCoupon.first({ key: key, types: types });

    }

    //显示添加优惠券页面
    showCouponDetail = async (couponid: any) => {
        let coupon = await this.uqs.salesTask.Coupon.load(couponid);
        this.pageCouponUsed = await this.uqs.salesTask.SearchCouponUsed.table({ coupon: couponid });
        this.pageCouponReceive = await this.uqs.webuser.SearchCouponReceive.table({ coupon: couponid });

        this.openVPage(VCouponDetail, coupon);
    }

    //显示添加优惠券页面
    showCreateCoupon = async (param: any) => {
        let vipCardDiscountSetting = await this.uqs.salesTask.SearchBottomDiscount.query({});
        let params = { webUser: undefined, vipCardLevel: undefined, vipCardType: param.type, product: param.product, vipCardLevelDiscountSetting: vipCardDiscountSetting.ret };
        this.openVPage(VCreateVIPCardDiscount, params);
    }

    //显示添加积分券页面
    showCreateCredits = async (param: any) => {
        let validitydate = this.validDateFrom(2);
        let coupon: any = await this.createCoupon({ validitydate: validitydate, discount: 0 }, param);
        this.showShareCoupon(coupon);
    }

    //显示新建积分券完成页面
    showShareCoupon = (coupon: any) => {
        if (coupon.product && coupon.product.main) {
            this.openVPage(VCreateProductCouponEnd, coupon)
        } else {
            this.openVPage(VCreateCouponEnd, coupon)
        }
    }

    validDateFrom(v: any) {
        let d: Date;
        switch (v) {
            default: return undefined;
            case 1:
                d = this.oneWeek;
                break;
            case 2:
                d = this.twoWeeks;
                break;
        }
        return `${d.getFullYear()}-${(d.getMonth() + 1)}-${d.getDate()}`;
    }


    //添加优惠券
    createCoupon = async (data: any, param: any) => {
        let { validitydate, discount, webUser } = data;
        let coupon: any = {
            webUser: webUser,
            validitydate: validitydate,
            discount: discount,
            types: param.type
        }
        let createCouponResult = await this.uqs.salesTask.CreateCoupon.submit(coupon);
        let { coupon: newCouponId, code } = createCouponResult;
        coupon.id = newCouponId;
        coupon.code = code;
        coupon.type = param.type;
        coupon.product = param.product;
        coupon.platform = "1";
        return coupon;
    }


    addCouponSendHistory = async (code: any) => {
        this.uqs.salesTask.AddCouponSendHistory.submit({ code: code });
    }

    //作废优惠券
    invalidCoupon = async (param: any) => {
        let tuidCoupon = this.uqs.salesTask.Coupon;
        var coupon = await tuidCoupon.load(param.id);
        coupon.isValid = 2;
        await tuidCoupon.save(coupon.id, coupon);
    }

    /**
     * 
     */
    showVIPCardDiscount = async (vipCardId: number) => {
        let vipCardDiscountSetting = await this.uqs.salesTask.VIPCardDiscount.table({ coupon: vipCardId });
        this.openVPage(VVIPCardDiscount, vipCardDiscountSetting);
    }


}
/* eslint-enable */
