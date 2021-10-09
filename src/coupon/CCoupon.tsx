import { action, makeObservable, observable } from 'mobx';
import { QueryPager, nav } from 'tonva-react';
import { CApp, CUqBase } from 'uq-app';
import { VCouponList, VExpiredCouponList } from 'coupon/VCouponList';
import { VCouponDetail } from './VCouponDetail';
import { VCreateCouponEnd } from './VCreateCouponEnd';
import { VVIPCardDiscount } from './VVIPCardDiscount';
import { VCreateVIPCardDiscount } from './VCreateVIPCardDiscount';
import { VCoupleAvailable } from './VCoupleAvailable';
import { EnumCouponType, ResultCreateCoupon } from 'uq-app/uqs/JkCoupon';

/**
 *
 */
export class CCoupon extends CUqBase {
    pageCoupon: QueryPager<any>;
    pageCouponReceiveUsed: any[] = [];
    ifCheck: any;

    oneWeek = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    twoWeeks = new Date(Date.now() + 14 * 24 * 3600 * 1000);

    constructor(cApp: CApp) {
        super(cApp);
        makeObservable(this, {
            pageCoupon: observable,
            pageCouponReceiveUsed: observable,
            ifCheck: observable,
            showCouponList: action,
            searchByKey: action,
            showCouponDetail: action
        })
    }

    /**
     * 
     * @param param 
     */
    protected async internalStart(param: any) {
        await this.searchByKey(undefined, EnumCouponType.Coupon);
        this.openVPage(VCoupleAvailable);
    }

    /**
     * 
     */
    createVIPCardDiscountCallback = async (webUser: any, vipCardLevel: any, cardType: EnumCouponType, product: any
        , vipCardDiscountSetting: any[], isno: any, newCoupon: any) => {
        let validityDate: any;
        let now = new Date();
        if (cardType === EnumCouponType.VipCard) {
            validityDate = `${now.getFullYear() + 1}-${now.getMonth() + 1}-${now.getDate()}`;
        } else {
            now = this.twoWeeks;
            validityDate = `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}`;
        }
        let vipCardParam: any = {
            webUser: webUser,
            validityDate: validityDate,
            discount: 0,
        }
        let newVIPCard = await this.createCoupon(vipCardParam, cardType);
        let { id, code } = newVIPCard;
        let { salesTask } = this.uqs;
        await salesTask.VIPCardDiscount.add({ coupon: id, arr1: vipCardDiscountSetting });
        if (cardType === EnumCouponType.VipCard) {
            await salesTask.VIPCardForWebUser.add({
                webuser: webUser, sales: nav.user.id, vipCard: id,
                arr1: [{ vipCardType: vipCardLevel }]
            });
            this.returnCall(newVIPCard);
            this.closePage();
        } else if (newCoupon) {
            this.closePage();
            newVIPCard.isValid = 1;
            return this.applySelectedCoupon(newVIPCard)
        } else {
            let param = { code: code, type: cardType, platform: "1", isno: isno };
            this.showShareCoupon(param, product);
        }
    }

    showCouponList = async (types: EnumCouponType) => {
        this.pageCoupon = null;
        await this.searchByKey(undefined, types);
        this.openVPage(VCouponList, types);
    }

    /**
     * 
     * @param key 
     * @param type 
     */
    searchByKey = async (key: string, type: EnumCouponType) => {
        this.pageCoupon = new QueryPager(this.uqs.JkCoupon.SearchCoupon, 15, 30);
        this.pageCoupon.first({ key: key, type: type });
    }

    //显示添加优惠券页面
    showCouponDetail = async (couponid: any) => {
        this.pageCouponReceiveUsed = [];
        let coupon = await this.uqs.salesTask.Coupon.load(couponid);
        let pageCouponUsed = await this.uqs.salesTask.SearchCouponUsed.table({ coupon: couponid });
        pageCouponUsed.forEach(element => {
            this.pageCouponReceiveUsed.push({ webuser: element.webuser, receive: true, receivedate: element.createDate, used: true, useddate: null })
        });

        let pageCouponReceive = await this.uqs.webuser.SearchCouponReceive.table({ coupon: couponid });
        pageCouponReceive.forEach(element => {
            let index = this.pageCouponReceiveUsed.findIndex(v => v.webuser.id === element.webuser.id);
            if (index >= 0) {
                this.pageCouponReceiveUsed[index].useddate = element.createDate
            } else {
                this.pageCouponReceiveUsed.push({ webuser: element.webuser, receive: true, receivedate: element.createDate, used: false, useddate: null })
            }
        });
        let vipCardDiscountSetting = await this.uqs.salesTask.VIPCardDiscount.table({ coupon: couponid });
        this.ifCheck = vipCardDiscountSetting.length
        this.openVPage(VCouponDetail, coupon);
    }

    /**
     * 显示添加优惠券页面
     * @param param 
     */
    showCreateCoupon = async (param: any) => {
        let { promotionPrice, newCoupon } = param;
        let vipCardDiscountSetting = await this.uqs.salesTask.SearchBottomDiscount.query({});

        if (promotionPrice) {
            await this.createVIPCardDiscountCallback(undefined, undefined, EnumCouponType.Coupon, param.product, undefined, "1", newCoupon);
        } else {
            let params = {
                webUser: undefined, vipCardLevel: undefined, vipCardType: EnumCouponType.Coupon, product: param.product,
                vipCardLevelDiscountSetting: vipCardDiscountSetting.ret, newCoupon
            };
            this.openVPage(VCreateVIPCardDiscount, params);
        }
    }

    /**
     * 创建积分券，并显示添加积分券的页面
     * @param param 
     */
    showCreateCredits = async (boxedProductIds?: number[]) => {
        let validityDate = this.validDateFrom(2);
        let coupon: any = await this.createCoupon({ validityDate: validityDate, discount: 0 }, EnumCouponType.Credits);
        this.showShareCoupon(coupon, boxedProductIds);
    }

    /**
     * 
     * @returns 
     */
    createCreditsWhenOrder = async () => {
        let validityDate = this.validDateFrom(2);
        let coupon: any = await this.createCoupon({ validityDate: validityDate, discount: 0 }, EnumCouponType.Credits);
        coupon.isValid = 1;
        return this.applySelectedCoupon(coupon)
    }


    //显示新建积分券完成页面
    /**
     *  
     * @param coupon 
     */
    showShareCoupon = (coupon: any, boxedProdutIds?: number[]) => {
        this.openVPage(VCreateCouponEnd, { coupon, boxedProdutIds })
    }

    /**
     * 返回积分券/优惠券的有效期时长 
     * @param weeks 有效期时长以周为单位设置
     * @returns 
     */
    validDateFrom(weeks: number) {
        let d: Date;
        switch (weeks) {
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


    /**
     * 创建优惠券或积分券 
     * @param data 
     * @param {object} param - type: coupon | credits 
     */
    createCoupon = async (data: any, type: EnumCouponType) => {
        let { validityDate, discount } = data;
        let coupon: any = {
            validityDate: validityDate,
            discount: discount,
            type: type
        }
        // let createCouponResult = await this.uqs.salesTask.CreateCoupon.submit(coupon);
        let createCouponResult = await this.uqs.JkCoupon.CreateCoupon.submit(coupon);
        let { coupon: newCouponId, code } = createCouponResult;
        coupon.id = newCouponId;
        coupon.code = code;
        coupon.type = type;
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
     * 显示VIP卡的品牌折扣明细 
     */
    showVIPCardDiscount = async (vipCardId: number) => {
        let vipCardDiscountSetting = await this.uqs.salesTask.VIPCardDiscount.table({ coupon: vipCardId });
        this.openVPage(VVIPCardDiscount, vipCardDiscountSetting);
    }

    /**
     * 
     * @param coupon 
     */
    applySelectedCoupon = async (coupon: any) => {
        let { result: rtn, id } = coupon;
        coupon.discountSetting = await this.getCouponDiscountSetting(EnumCouponType.Coupon, id);
        this.returnCall(coupon);
        this.closePage();
    }

    private getCouponDiscountSetting = async (types: EnumCouponType, couponId: number) => {
        if (types === EnumCouponType.VipCard || types === EnumCouponType.Coupon) {
            return await this.uqs.salesTask.VIPCardDiscount.table({ coupon: couponId });
        }
    }

    openExpiredCouponHistory = async (types) => {
        this.openVPage(VExpiredCouponList, types);
    }
}
/* eslint-enable */
