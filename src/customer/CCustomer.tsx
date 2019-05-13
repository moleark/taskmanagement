import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, TuidMain, Action } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page, Image } from 'tonva-tools';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { VCustomerSelect } from './VCustomerSelect';
import { VCustomerDetail } from './VCustomerDetail';
import { observer } from 'mobx-react';
import { VCustomerList } from './VCustomerList';

//页面类
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

        this.openVPage(VCustomerSelect, param);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {

        this.pageCustomer = new PageCustomer(this.querySearchCustomer);
        this.pageCustomer.first({ key: key });
    }

    //查询客户--通过ID
    showCustomerDetail = async (customerid: number) => {
        let customer = await this.tuidCustomer.load(customerid);
        this.openVPage(VCustomerDetail, customer);
    }


    //选择客户--给调用页面返回客户id
    /**
    selectCustomer = async (customerid: number): Promise<any> => {

        let addcustomerId = this.tuidCustomer.boxId(customerid);
        this.returnCall(addcustomerId);
    } 
    */
    selectCustomer = async (customer: any): Promise<any> => {
        this.returnCall(customer);
        /*
        let addcustomerId = this.tuidCustomer.boxId(customerid);
        let { cSalesTaskType } = this.cApp;
        cSalesTaskType.start(addcustomerId);
        */
    }

    render = observer(() => {

        return this.renderView(VCustomerList);
    })

    tab = () => {
        return <this.render />;
    }
}
