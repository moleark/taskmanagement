import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, TuidMain, Action } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page, Image } from 'tonva-tools';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { VCustomer } from './VCustomer';

class PageCustomer extends PageItems<any> {

    private searchCustomerQuery: Query;

    constructor(searchCustomerQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchCustomerQuery = searchCustomerQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchCustomerQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

/**
 *
 */
export class CCustomer extends Controller {

    cApp: CSalesTaskApp;
    @observable pageCustomer: PageCustomer;
    private tuidCustomer: TuidMain;
    private querySearchCustomer: Query;
    @observable customerlist: any;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask, cUqCustomer } = this.cApp;
        this.tuidCustomer = cUqSalesTask.tuid("customer");
        this.querySearchCustomer = cUqCustomer.query("searchcustomer");
    }

    //初始化
    protected async internalStart(param: any) {

        this.openVPage(VCustomer, param);
    }

    async searchByKey(key: string) {

        //let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
        //let task = await this.querySearchCustomer.table({ key: "小明" });
        //let task = await this.tuidCustomer.search(key, 0, 100);
        //this.customerlist = task;

        this.pageCustomer = new PageCustomer(this.querySearchCustomer);
        this.pageCustomer.first({ key: key });
    }

    selectCustomer = async (customerid: number): Promise<any> => {

        let addcustomerId = this.tuidCustomer.boxId(customerid);
        this.returnCall(addcustomerId);
    }

}
