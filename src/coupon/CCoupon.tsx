import { observable } from 'mobx';
import { QueryPager, nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VCouponList } from './VCouponList';
import { VCouponDetail } from './VCouponDetail';
import { VCreateCouponEnd } from './VCreateCouponEnd';
import { VCreateProductCouponEnd } from './VCreateProductCouponEnd';
import { VVIPCardDiscount } from './VVIPCardDiscount';
import { VCreateVIPCardDiscount } from './VCreateVIPCardDiscount';
import { VCoupleAvailable } from './VCoupleAvailable';
/**
 *
 */
export class CCoupon extends CUqBase {
    @observable pageCoupon: QueryPager<any>;
    @observable pageCredits: QueryPager<any>;
    @observable pageCouponReceiveUsed: any[] = [];
    @observable ifCheck: any;

    oneWeek = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    twoWeeks = new Date(Date.now() + 14 * 24 * 3600 * 1000);

    // 创建VIPCardDiscount 
    protected async internalStart(param: any) {
        await this.searchByKey(undefined, 'coupon');
        this.openVPage(VCoupleAvailable);
    }

    /**
     * 
     */
    createVIPCardDiscountCallback = async (webUser: any, vipCardLevel: any, cardType: any, product: any
        , vipCardDiscountSetting: any[], isno: any, newCoupon: any) => {
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
        } else if (newCoupon) {
            this.closePage();
            newVIPCard.isValid = 1;
            return this.applySelectedCoupon(newVIPCard)
        } else {
            let param = { code: code, product: product, type: cardType, platform: "1", isno: isno };
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

    //显示添加优惠券页面
    showCreateCoupon = async (param: any) => {
        let { promotionPrice, newCoupon } = param;
        let vipCardDiscountSetting = await this.uqs.salesTask.SearchBottomDiscount.query({});

        if (promotionPrice) {
            await this.createVIPCardDiscountCallback(undefined, undefined, param.type, param.product, undefined, "1", newCoupon);
        } else {
            let params = {
                webUser: undefined, vipCardLevel: undefined, vipCardType: param.type, product: param.product,
                vipCardLevelDiscountSetting: vipCardDiscountSetting.ret, newCoupon
            };
            this.openVPage(VCreateVIPCardDiscount, params);
        }
    }

    //显示添加积分券页面
    showCreateCredits = async (param: any) => {
        let validitydate = this.validDateFrom(2);
        let coupon: any = await this.createCoupon({ validitydate: validitydate, discount: 0 }, param);
        if (param.newCoupon) {
            coupon.isValid = 1;
            return this.applySelectedCoupon(coupon)
        } else {
            this.showShareCoupon(coupon);
        }
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
     * 显示VIP卡的品牌折扣明细 
     */
    showVIPCardDiscount = async (vipCardId: number) => {
        let vipCardDiscountSetting = await this.uqs.salesTask.VIPCardDiscount.table({ coupon: vipCardId });
        this.openVPage(VVIPCardDiscount, vipCardDiscountSetting);
    }

    applySelectedCoupon = async (coupon: any) => {
        let { result: rtn, id } = coupon;
        coupon.discountSetting = await this.getCouponDiscountSetting('coupon', id);
        this.returnCall(coupon);
        this.closePage();
    }

    private getCouponDiscountSetting = async (types: string, couponId: number) => {
        if (types === 'vipcard' || types === 'coupon') {
            return await this.uqs.salesTask.VIPCardDiscount.table({ coupon: couponId });
        }
    }

}
/* eslint-enable */
