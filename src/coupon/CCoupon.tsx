import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Tuid, Action, nav, loadAppUqs, PageItems, Context } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VCouponList } from './VCouponList';
import { observable } from 'mobx';
import { VCreateCoupon } from './VCreateCoupon';
import { VCouponDetail } from './VCouponDetail';
import { VCreateCouponEnd } from './VCreateCouponEnd';



//页面类
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
export class CCoupon extends Controller {

    cApp: CSalesTaskApp;
    @observable pageCoupon: PageCoupon;
    @observable customers: any;

    private tuidCoupon: Tuid;
    private querySearchCoupon: Query;
    private querySearchCouponCustomer: Query;
    private actionCreateCoupon: Action;
    private actionAddCouponCustomer: Action;
    private actionIsCanUseCoupon: Action;


    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqSalesTask } = this.cApp;
        this.tuidCoupon = cUqSalesTask.tuid("Coupon");
        this.querySearchCoupon = cUqSalesTask.query("SearchCoupon");
        this.querySearchCouponCustomer = cUqSalesTask.query("SearchCouponCustomer");
        this.actionCreateCoupon = cUqSalesTask.action("CreateCoupon");
        this.actionAddCouponCustomer = cUqSalesTask.action("CreateCouponCustomer");
        this.actionIsCanUseCoupon = cUqSalesTask.action("IsCanUseCoupon");

    }

    //初始化
    protected async internalStart() {
        this.pageCoupon = null;
        await this.searchByKey(undefined);
        this.openVPage(VCouponList);
        this.IsCanUseCoupon();
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageCoupon = new PageCoupon(this.querySearchCoupon);
        this.pageCoupon.first({ key: key });
    }

    //显示添加优惠码页面
    showCouponDetail = async (couponid: any) => {
        let coupon = await this.tuidCoupon.load(couponid);
        this.openVPage(VCouponDetail, coupon);
    }

    IsCanUseCoupon = async () => {

        let coupon = {
            code: "36747841",
            webuser: "47"
        }
        let aa = await this.actionIsCanUseCoupon.submit(coupon);
        let bb = aa;
    }

    //显示添加优惠码页面
    showCreateCoupon = async () => {
        this.openVPage(VCreateCoupon);
    }

    //添加优惠码
    createCoupon = async (param: any) => {

        var customerid: number, discount: any;
        if (param.customer) {
            customerid = param.customer.id;
        } else {
            customerid = undefined;
        }
        if (param.discount == "-1") {
            discount = undefined;
        }

        let coupon = {
            validitydate: param.validitydate,
            discount: param.discount,
            preferential: param.preferential,
            mycustomer: customerid
        }
        let couponid = await this.actionCreateCoupon.submit(coupon);
        let code = couponid.code;
        this.openVPage(VCreateCouponEnd, code)
    }
    //作废优惠码
    invalidCoupon = async (param: any) => {
        var coupon = await this.tuidCoupon.load(param.id);
        coupon.isValid = 2;
        await this.tuidCoupon.save(coupon.id, coupon);
    }

    /***
    //显示客户
    showCouponCustomer = async (param: any) => {
        this.searchCouponCustomer(param.id);
        await this.openVPage(VCouponCustomer, param);
    }
    //搜索优惠码客户
    searchCouponCustomer = async (couponid: any) => {
        let param = { coupon: couponid }
        let cust = await this.querySearchCouponCustomer.table(param);
        this.customers = cust;
    }
    */

    //显示客户
    showAddCouponCustomer = async (context: Context, name: string, value: number): Promise<any> => {
        let { cCustomer } = this.cApp;
        let d = await cCustomer.call();
        return d;
    }

    //添加客户
    addCouponCustomer = async (coupon: any, customer: any) => {
        let param = { coupon: coupon.id, customer: customer.id }
        this.actionAddCouponCustomer.submit(param);
        this.customers.unshift({
            coupon: coupon,
            customer: customer
        });
        this.closePage();
    }

}
