import * as React from 'react';
import * as _ from 'lodash';
import { Tuid, Controller, Query, PageItems, Action, Map } from 'tonva';
import { observable } from 'mobx';
import { VSelectType } from './VSelectType';
import { CSalesTask } from '../CSalesTask';
import { VAi } from './VAi';
import { TaskType, Task } from 'salestask/model';
import { VAiDetail } from './VAiDetail';


//页面类
class PageMyJKTask extends PageItems<any> {

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
export class CSelectType extends Controller {

    cSalesTask: CSalesTask;
    private tuidTaskType: Tuid;
    private tuidOrganization: Tuid;
    private querySearchJKTask: Query;
    private querygetCustomerOrganization: Query;
    private actionImportTask: Action;

    private taskBook: any;
    private tasks: [];
    private customerid: number;
    private task: Task;
    @observable tasktypelist: any;
    @observable pageMyJKTask: PageMyJKTask;
    @observable organization: any;

    //构造函数
    constructor(cSalesTask: CSalesTask, res: any) {
        super(res);
        this.cSalesTask = cSalesTask;
        this.pageMyJKTask = null;

        let { cUqSalesTask, cUqCustomer } = this.cSalesTask.cApp;
        this.tuidTaskType = cUqSalesTask.tuid("tasktype");
        this.tuidOrganization = cUqSalesTask.tuid("Organization");
        this.querySearchJKTask = cUqSalesTask.query("SearchJKTask");
        this.querygetCustomerOrganization = cUqCustomer.query("getCustomerOrganization");
        this.actionImportTask = cUqSalesTask.action("ImportTask");
    }

    //初始化
    protected async internalStart(param: any) {
        this.customerid = param;
        await this.searchByKey('');
        this.openVPage(VSelectType, param);
    }

    //搜索任务类型
    async searchByKey(key: string) {

        this.tasktypelist = await this.tuidTaskType.search(key, 0, 100);
    }

    //返回添加任务页面
    selectTaskType = async (type: any) => {
        this.task = {
            id: null,
            type: type,
            biz: null,
            description: null,
            remindDate: null,
            deadline: null,
            customer: null
        }
        this.cSalesTask.cSalesTaskBiz.start(this.task)
    }

    returnTaskType = async (type: any): Promise<any> => {
        this.returnCall(type);
    }

    aiClick = async () => {
        this.pageMyJKTask = new PageMyJKTask(this.querySearchJKTask);
        this.pageMyJKTask.first({ key: undefined });
        this.openVPage(VAi);
    }

    showJkTaskDetail = async (model: any) => {
        await this.searchCustomerRelation(model.customer.id);
        this.openVPage(VAiDetail, model);
    }

    createTask = async (model: any) => {
        let { id, customer } = model;
        let { name } = customer.obj;

        await this.actionImportTask.submit({ task: id, customername: name, organization: this.organization.id, organizationName: this.organization.name });
        await this.cSalesTask.searchTaskByKey('');
    }


    searchCustomerRelation = async (param: any) => {
        let aa = { id: param };
        let relesions = await this.querygetCustomerOrganization.query({ customerId: param })
        if (relesions && relesions.ret.length > 0) {
            let org = relesions.ret[0].organization;
            this.organization = await this.tuidOrganization.load(org);
        }
    }

}
