import * as React from 'react';
import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PageItems, Query, Context } from 'tonva';
import { CApp } from '../CApp';
import { CUqBase } from '../CBase';
import { Task } from '../salestask/model';
import { CAddress } from '../address/CAddress';
import { VCustomerSelect } from './VCustomerSelect';
import { VCustomerDetail } from './VCustomerDetail';
import { VCustomerList } from './VCustomerList';
import { VCreateCustomer } from './VCreateCustomer';
import { VCreateCustomerFinish } from './VCreateCustomerFinish';
import { VCustomerSearch } from './VCustomerSearch';
import { VCustomerChek } from './VCustomerChek';
import { VCustomerEdit } from './VCustomerEdit';
import { VMyCustomer } from './VMyCustomer';

/**
 * 用于客户首页
 */
class PageMyCustomer extends PageItems<any> {

    private searchCustomerQuery: Query;

    constructor(searchCustomerQuery: Query) {
        super();
        this.firstSize = this.pageSize = 11;
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
 * 用于专门的客户搜索界面
 */
class PageMyCustomerSearch extends PageItems<any> {

    private searchCustomerQuery: Query;

    constructor(searchCustomerQuery: Query) {
        super();
        this.firstSize = this.pageSize = 11;
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
 * 用于专门的活跃客户的搜索
 */
class PageMyCustomerActive extends PageItems<any> {

    private searchCustomerQuery: Query;

    constructor(searchCustomerQuery: Query) {
        super();
        this.firstSize = this.pageSize = 11;
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
export class CCustomer extends CUqBase {
    cApp: CApp;

    @observable pageCustomer: PageMyCustomer;
    @observable pageCustomerSearch: PageMyCustomerSearch;
    @observable pageMyCustomerActive: PageMyCustomerActive;
    @observable innerCustomer: any;
    private task: Task;

    //初始化
    protected async internalStart(task: Task) {
        this.pageCustomer = null;
        this.task = task;
        this.searchByKey('');
        this.openVPage(VCustomerSelect);
    }

    /**
     * 查询客户——用在客户首页
     */
    searchByKey = async (key: string) => {
        this.pageCustomer = new PageMyCustomer(this.uqs.salesTask.searchMyCustomer);
        this.pageCustomer.first({ key: key });
    }

    /**
     * 查询客户——用在专门的客户搜索界面——没有必要
     */
    searchCustomerByKey = async (key: string) => {
        this.pageCustomerSearch = new PageMyCustomerSearch(this.uqs.salesTask.searchMyCustomer);
        this.pageCustomerSearch.first({ key: key });
    }

    /**
    * 查询客户——查活跃客户
    */
    searchCustomerActiveByKey = async (key: string, type: number) => {
        this.pageMyCustomerActive = new PageMyCustomerActive(this.uqs.salesTask.searchMyCustomerActive);
        this.pageMyCustomerActive.first({ key: key, type: type });
    }

    //加载客户明细
    loadCustomerDetail = async (customerid: number) => {
        return await this.uqs.salesTask.MyCustomer.load(customerid);
    }

    //查询客户--通过ID
    showCustomerDetail = async (customerid: number) => {
        let mycustomer = await this.loadCustomerDetail(customerid);

        let customer = await this.uqs.salesTask.CustomerMyCustomerMap.query({ mycustomer: mycustomer.id });
        if (customer.ret.length > 0) {
            this.innerCustomer = customer.ret[0].customer;
        } else {
            this.innerCustomer = null;
        }
        this.openVPage(VCustomerDetail, mycustomer);
    }

    /**
     * 搜索客户——用在任务等要需要选择客户的界面？
     */
    showSelectCustomer = async (task: Task) => {
        this.searchByKey('');
        this.task = task;
        this.openVPage(VCustomerSelect);
    }

    /**
     * 显示编辑
    */
    showCustomerEdit = async (customer: any) => {
        this.openVPage(VCustomerEdit, customer);
    }

    /**
     * 显示客户搜索界面
     */
    showCustomerSearch = async (val: any): Promise<any> => {
        if (val == null) {
            this.pageCustomerSearch = null;
        } else {
            this.searchCustomerByKey(val);
        }
        this.openVPage(VCustomerSearch);
    }

    /**
    * 显示客户搜索界面
    */
    showMyCustomer = async (val: any, type: number): Promise<any> => {
        if (val == null) {
            this.pageMyCustomerActive = null;
        } else {
            this.searchCustomerActiveByKey(val, type);
        }
        this.openVPage(VMyCustomer, type);
    }

    //选择客户--给调用页面返回客户id
    selectCustomer = async (customer: any): Promise<any> => {
        this.task.customer = customer;
        this.cApp.cSalesTask.showCrateCheck(this.task);
    }

    //选择客户--给调用页面返回客户id
    returnCustomer = async (customer: any): Promise<any> => {
        this.returnCall(customer);
    }

    /**
     * 显示新建客户页面
     */
    showCreateCustomer = (param: any) => {
        this.openVPage(VCreateCustomer, param);
    }

    /**
     * 新建客户时显示选择客户单位的页面
     */
    showSelectOrganization = () => {
        this.cApp.cCustomerUnit.start();
    }

    //新建客户
    createMyCustomer = async (param: any, customerunit: any) => {
        let par = {
            unit: customerunit.id,
            no: undefined,
            name: param.Name,
            firstName: "",
            lastName: "",
            telephone: param.telephone,
            gender: param.Gender ? 1 : param.Gender,
            salutation: param.Salutation,
            birthDay: param.BirthDay
        }
        let ret = await this.uqs.salesTask.CreateMyCustomer.submit(par);
        let { code } = ret;
        this.openVPage(VCreateCustomerFinish, code);
    }

    //修改单位信息
    updateMyCustomer = async (param: any) => {
        await this.uqs.salesTask.MyCustomer.save(param.id, param);
    }

    showInnerCustomerSelect = async (mycustomer: any) => {
        let { cWebUser } = this.cApp;
        this.innerCustomer = await cWebUser.call();
        await this.createWebUserMyCustomerMap(this.innerCustomer.id, mycustomer);
    }


    /**
     * 查询MyCustomer是否可能被其他轻代理绑定
     */
    checkBinding = async (mycustomer: any): Promise<boolean> => {
        let result = await this.uqs.salesTask.MyCustomerIsOccupy.query({ mycustomer: mycustomer.id });
        return result.ret[0] === 1;
        /*
        if (result.ret[0] == 1) {
            this.IsOccupy = true;
        } else {
            this.IsOccupy = false;
        }
        */
    }

    createWebUserMyCustomerMap = async (customer: any, mycustomer: any) => {
        await this.uqs.salesTask.UpateCustomerMyCustomerMap.submit({ mycustomer: mycustomer, customer: customer });
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        let cAddress = this.newC(CAddress);
        return await cAddress.call<number>();
    }

    render = observer(() => {
        return this.renderView(VCustomerList);
    })

    tab = () => {
        this.searchByKey('');
        return <this.render />;
    }
}
