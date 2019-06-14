import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Map, Tuid, Action, nav, loadAppUqs, PageItems } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VCouponList } from './VCouponList';
import { observable } from 'mobx';
import { VCreateCoupon } from './VCreateCoupon';
import { VCouponDetail } from './VCouponDetail';
import { VCouponCustomer } from './VCouponCustomer';



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

    private tuidCoupon: Tuid;
    private querySearchCoupon: Query;
    private querySearchCouponCustomer: Query;
    private actionCreateCoupon: Action;
    private actionAddCouponCustomer: Action;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqSalesTask } = this.cApp;
        this.tuidCoupon = cUqSalesTask.tuid("Coupon");
        this.querySearchCoupon = cUqSalesTask.query("SearchCoupon");
        this.actionCreateCoupon = cUqSalesTask.action("CreateCoupon");
        this.querySearchCouponCustomer = cUqSalesTask.query("SearchCouponCustomer");
        this.actionAddCouponCustomer = cUqSalesTask.action("CreateCouponCustomer");
    }

    //初始化
    protected async internalStart() {
        this.pageCoupon = null;
        await this.searchByKey(undefined);
        this.openVPage(VCouponList);
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

    //显示添加优惠码页面
    showCreateCoupon = async () => {
        this.openVPage(VCreateCoupon);
    }

    //添加优惠码
    createCoupon = async (param: any) => {
        let coupon = {
            validitydate: param.validitydate,
            discount: param.discount,
            preferential: param.preferential
        }
        await this.actionCreateCoupon.submit(coupon);
        this.closePage();
        await this.searchByKey(undefined);
    }

    //显示客户
    showCouponCustomer = async (param: any) => {
        await this.openVPage(VCouponCustomer, param);
    }
    //搜索优惠码客户
    searchCouponCustomer = async (couponid: any) => {
        let param = { coupon: couponid }
        let cust = await this.querySearchCouponCustomer.table(param);
        return cust;
    }

    //显示客户
    showAddCouponCustomer = async (coupon: any) => {
        let { cCustomer } = this.cApp;
        let cusomter = await cCustomer.call();
        await this.addCouponCustomer(coupon, cusomter);
    }
    //添加客户
    addCouponCustomer = async (coupon: any, customer: any) => {
        let param = { coupon: coupon.id, customer: customer.id }
        this.actionAddCouponCustomer.submit({ param });
    }

}
