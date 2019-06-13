import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, Tuid, Action } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { VCustomerSelect } from './VCustomerSelect';
import { Task } from 'salestask/model';
import { VCustomerUnit } from './VCustomerUnit';
import { VCreateCustomerUnit } from './VCreateCustomerUnit';

//页面类
class PageUnit extends PageItems<any> {

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
export class CCustomerUnit extends Controller {

    cApp: CSalesTaskApp;
    @observable pageUnit: PageUnit;

    private tuidMyCustomer: Tuid;
    private querySearchMyCustomerunit: Query;
    private actionCreateMyCustomerunit: Action;
    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqCustomer, cUqSalesTask } = this.cApp;

        this.tuidMyCustomer = cUqSalesTask.tuid("mycustomerunit");
        this.querySearchMyCustomerunit = cUqSalesTask.query("searchmycustomerunit");
        this.actionCreateMyCustomerunit = cUqSalesTask.action("CreateMyCustomerunit");
    }

    //初始化
    protected async internalStart(task: Task) {
        this.pageUnit = null;
        this.openVPage(VCustomerUnit);
    }


    //查询客户--通过名称
    searchByKey = async (key: string) => {

        this.pageUnit = new PageUnit(this.querySearchMyCustomerunit);
        this.pageUnit.first({ key: key });
    }

    //显示新建单位
    showCreateUnit = () => {
        //this.openVPage(VCreateCustomerFinish);
        this.openVPage(VCreateCustomerUnit);
    }

    //新建客户
    createMyCustomerUnit = async (param: any) => {
        let par = {
            no: param.Name,
            name: param.Name,
        }
        await this.actionCreateMyCustomerunit.submit(par);
        this.closePage();
    }

    showCreateCustomer = async (param: any) => {
        this.cApp.cCustomer.showCreateCustomer(param);
    }

}