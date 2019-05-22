import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, TuidMain, Action } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { VCustomerSelect } from './VCustomerSelect';
import { VCustomerDetail } from './VCustomerDetail';
import { observer } from 'mobx-react';
import { VCustomerList } from './VCustomerList';
import { Task } from 'salestask/model';

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
    private task: Task;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqCustomer } = this.cApp;
        this.tuidCustomer = cUqCustomer.tuid("customer");
        this.querySearchCustomer = cUqCustomer.query("searchcustomer");
    }

    //初始化
    protected async internalStart(task: Task) {
        this.pageCustomer = null;
        this.task = task;
        this.openVPage(VCustomerSelect);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {

        this.pageCustomer = new PageCustomer(this.querySearchCustomer);
        this.pageCustomer.first({ key: key });
    }

    //加载客户明细
    loadCustomerDetail = async (customerid: number) => {
        return await this.tuidCustomer.load(customerid);
    }

    //查询客户--通过ID
    showCustomerDetail = async (customerid: number) => {
        let customer = await this.loadCustomerDetail(customerid);
        this.openVPage(VCustomerDetail, customer);
    }

    //选择客户--给调用页面返回客户id
    selectCustomer = async (customer: any): Promise<any> => {
        this.task.customer = customer;
        this.cApp.cSalesTask.getCTaskType(this.task.biz.name).showCreate(this.task);
    }

    //选择客户--给调用页面返回客户id
    returnCustomer = async (customer: any): Promise<any> => {
        this.returnCall(customer);
    }

    render = observer(() => {
        this.pageCustomer = null;
        return this.renderView(VCustomerList);
    })

    tab = () => {
        return <this.render />;
    }
}
