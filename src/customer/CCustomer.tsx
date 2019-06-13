import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, Tuid, Action } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { VCustomerSelect } from './VCustomerSelect';
import { VCustomerDetail } from './VCustomerDetail';
import { observer } from 'mobx-react';
import { VCustomerList } from './VCustomerList';
import { Task } from 'salestask/model';
import { CCommonType } from 'salestask/types/commonType';
import { VCreateCustomer } from './VCreateCustomer';
import { async } from 'q';
import { VCreateCustomerFinish } from './VCreateCustomerFinish';

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
    private tuidCustomer: Tuid;
    private querySearchCustomer: Query;
    private task: Task;

    private tuidMyCustomer: Tuid;
    private querySearchMyCustomer: Query;
    private actionCreateMyCustomer: Action;
    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqCustomer, cUqSalesTask } = this.cApp;
        this.tuidCustomer = cUqCustomer.tuid("customer");
        this.querySearchCustomer = cUqCustomer.query("searchcustomer");

        this.tuidMyCustomer = cUqSalesTask.tuid("mycustomer");
        this.querySearchMyCustomer = cUqSalesTask.query("searchmycustomer");
        this.actionCreateMyCustomer = cUqSalesTask.action("CreateMyCustomer");
    }

    //初始化
    protected async internalStart(task: Task) {
        this.pageCustomer = null;
        this.task = task;
        this.openVPage(VCustomerSelect);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {

        this.pageCustomer = new PageCustomer(this.querySearchMyCustomer);
        this.pageCustomer.first({ key: key });
    }

    //加载客户明细
    loadCustomerDetail = async (customerid: number) => {
        return await this.tuidMyCustomer.load(customerid);
    }

    //查询客户--通过ID
    showCustomerDetail = async (customerid: number) => {
        let customer = await this.loadCustomerDetail(customerid);
        this.openVPage(VCustomerDetail, customer);
    }

    //选择客户--给调用页面返回客户id
    selectCustomer = async (customer: any): Promise<any> => {
        this.task.customer = customer;
        this.cApp.cSalesTask.showCrateCheck(this.task);
        //this.cApp.cSalesTask.getCTaskType(this.task.biz.name).showCreate(this.task);
    }

    //选择客户--给调用页面返回客户id
    returnCustomer = async (customer: any): Promise<any> => {
        this.returnCall(customer);
    }

    //显示新建客户页面
    showCreateCustomer = (param: any) => {
        //this.openVPage(VCreateCustomerFinish);
        this.openVPage(VCreateCustomer, param);
    }

    //显示选择客户的页面
    showSelectCustomerUnit = () => {
        //this.openVPage(VCreateCustomerFinish);
        this.cApp.cCustomerUnit.start();
    }

    //新建客户
    createMyCustomer = async (param: any, customerunit: any) => {
        let par = {
            unit: customerunit.id,
            no: param.BirthDay + param.Name,
            name: param.Name,
            firstName: "",
            lastName: "",
            gender: param.Gender,
            salutation: param.Salutation,
            birthDay: param.BirthDay
        }
        await this.actionCreateMyCustomer.submit(par);
        this.openVPage(VCreateCustomerFinish);
    }

    //修改单位信息
    updateMyCustomer = async (param: any) => {
        await this.tuidMyCustomer.save(param.id, param);
        this.closePage();
    }

    render = observer(() => {
        this.pageCustomer = null;
        return this.renderView(VCustomerList);
    })

    tab = () => {
        return <this.render />;
    }
}
