import { observable } from 'mobx';
import { QueryPager } from 'tonva';
import { CUqBase } from '../CBase';
import { VCouponList } from './VCouponList';
import { VCreateCoupon } from './VCreateCoupon';
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
    oneWeek = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    twoWeeks = new Date(Date.now() + 14 * 24 * 3600 * 1000);

    // 创建VIPCardDiscount 
    protected async internalStart(param: any) {
        this.openVPage(VCreateVIPCardDiscount, param);
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
        this.openVPage(VCouponDetail, coupon);
    }

    //显示添加优惠券页面
    showCreateCoupon = async (param: any) => {
        this.openVPage(VCreateCoupon, param);
    }

    //显示添加积分券页面
    showCreateCredits = async (param: any) => {
        let validitydate = this.validDateFrom(2);
        let coupon: any = await this.createCoupon({ validitydate: validitydate, discount: 0 }, param);
        this.showShareCoupon(coupon);
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

    showShareCoupon = (coupon: any) => {
        if (coupon.product && coupon.product.main) {
            this.openVPage(VCreateProductCouponEnd, coupon)
        } else {
            this.openVPage(VCreateCouponEnd, coupon)
        }
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

    /*
    //显示客户
    showAddCouponCustomer = async (context: Context, name: string, value: number): Promise<any> => {
        let { cCustomer } = this.cApp;
        let d = await cCustomer.call();
        return d;
    }

    //添加客户
    addCouponCustomer = async (coupon: any, customer: any) => {
        let param = { coupon: coupon.id, customer: customer.id }
        this.uqs.salesTask.AddCouponCustomer.submit(param);
        this.customers.unshift({
            coupon: coupon,
            customer: customer
        });
        this.closePage();
    }
    */

    /**
     * 
     */
    showVIPCardDiscount = async (vipCardId: number) => {
        let vipCardDiscountSetting = await this.uqs.salesTask.VIPCardDiscount.table({ coupon: vipCardId });
        this.openVPage(VVIPCardDiscount, vipCardDiscountSetting);
    }

    createVIPCardDiscountCallback = async (webUser: any, vipCardDiscountSetting: any[]) => {
        let now = new Date();
        let vipCardParam: any = {
            webUser: webUser,
            validitydate: `${now.getFullYear() + 1}-${now.getMonth() + 1}-${now.getDate()}`,
            discount: 0,
        }
        let newVIPCard = await this.createCoupon(vipCardParam, { type: 'vipcard' });
        this.returnCall({ newVIPCard, vipCardDiscountSetting });
        this.closePage();
    }
}
/* eslint-enable */
