import { observable } from 'mobx';
import { Query, PageItems, Context } from 'tonva';
import { CUqBase } from '../CBase';
import { VCouponList } from './VCouponList';
import { VCreateCoupon } from './VCreateCoupon';
import { VCouponDetail } from './VCouponDetail';
import { VCreateCouponEnd } from './VCreateCouponEnd';
import { VCreateProductCouponEnd } from './VCreateProductCouponEnd';
import { setting } from 'appConfig';
//页面类
/* eslint-disable */
class PageCoupon extends PageItems<any> {

    private searchQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}
/**
 *
 */
export class CCoupon extends CUqBase {
    //cApp: CApp;
    @observable pageCoupon: PageCoupon;
    @observable customers: any;

    //初始化
    protected async internalStart() {
        this.pageCoupon = null;
        await this.searchByKey(undefined);
        this.openVPage(VCouponList);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageCoupon = new PageCoupon(this.uqs.salesTask.SearchCoupon);
        this.pageCoupon.first({ key: key });
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

    //添加优惠券
    createCoupon = async (data: any, param: any) => {

        let { validitydate, discount } = data;
        let coupon: any = {
            validitydate: validitydate,
            discount: discount,
            types: param.type
        }
        let couponid = await this.uqs.salesTask.CreateCoupon.submit(coupon);
        let code = couponid.code;
        coupon.code = code;
        coupon.type = param.type;
        coupon.product = param.product;
        coupon.businesstype = data.businesstype;

        if (coupon.product) {
            this.openVPage(VCreateProductCouponEnd, coupon)
        } else {
            this.openVPage(VCreateCouponEnd, coupon)
        }
    }

    //作废优惠券
    invalidCoupon = async (param: any) => {
        let tuidCoupon = this.uqs.salesTask.Coupon;
        var coupon = await tuidCoupon.load(param.id);
        coupon.isValid = 2;
        await tuidCoupon.save(coupon.id, coupon);
    }

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
}
/* eslint-enable */
