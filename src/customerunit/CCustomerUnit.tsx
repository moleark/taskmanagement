import * as React from 'react';
import * as _ from 'lodash';
import { Query, PageItems, Controller, Tuid, Action } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { Task } from 'salestask/model';
import { VCustomerUnitSelect } from './VCustomerUnitSelect';
import { VCreateCustomerUnit } from './VCreateCustomerUnit';
import { VCustomerUnitDetail } from './VCustomerUnitDetail';
import { VCreateCustomerUnitFinish } from './VCreateCustomerUnitFinish';

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

    private tuidMyCustomerUnit: Tuid;
    private querySearchMyCustomerunit: Query;
    private actionCreateMyCustomerunit: Action;
    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqCustomer, cUqSalesTask } = this.cApp;

        this.tuidMyCustomerUnit = cUqSalesTask.tuid("mycustomerunit");
        this.querySearchMyCustomerunit = cUqSalesTask.query("searchmycustomerunit");
        this.actionCreateMyCustomerunit = cUqSalesTask.action("CreateMyCustomerunit");
    }

    //初始化
    protected async internalStart(task: Task) {
        this.pageUnit = null;
        this.searchByKey('');
        this.openVPage(VCustomerUnitSelect, 1);
    }


    showCustomerSearchByUnit = async (): Promise<any> => {
        this.pageUnit = null;
        this.searchByKey('');
        this.openVPage(VCustomerUnitSelect, 2);
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

    //新建客户单位
    createMyCustomerUnit = async (param: any) => {
        let par = {
            no: undefined,
            name: param.Name,
        }
        let ref = await this.actionCreateMyCustomerunit.submit(par);
        this.openVPage(VCreateCustomerUnitFinish, ref);
    }

    //显示单位明细
    showCustomerUnitDetail = async (param: any) => {
        let unit = await this.tuidMyCustomerUnit.load(param);
        this.openVPage(VCustomerUnitDetail, unit);
    }

    //显示新建客户页面
    showCreateCustomer = async (param: any) => {
        this.cApp.cCustomer.showCreateCustomer(param);
    }

    //显示单位明细
    showCustomerUnitEdit = async (param: any) => {
        let unit = await this.tuidMyCustomerUnit.load(param);
        this.openVPage(VCustomerUnitDetail, unit);
    }

    //修改单位信息
    updateMyCustomerUnit = async (param: any) => {
        await this.tuidMyCustomerUnit.save(param.id, param);
        this.closePage();
    }


}