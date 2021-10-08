import { QueryPager } from 'tonva-react';
import { makeObservable, observable } from 'mobx';
import { Task } from '../model';
import { CSalesTask } from '../CSalesTask';
import { VSelectType } from './VSelectType';
import { VAi } from './VAi';
import { VAiDetail } from './VAiDetail';
import { CApp, CUqSub, UQs } from 'uq-app';

/* eslint-disable */
//页面类

/**
 *
 */
export class CSelectType extends CUqSub<CApp, UQs, CSalesTask> {

    private task: Task;
    tasktypelist: any;
    pageMyJKTask: QueryPager<any>;
    organization: any;

    constructor(owner: CSalesTask) {
        super(owner);
        makeObservable(this, {
            tasktypelist: observable,
            pageMyJKTask: observable,
            organization: observable
        })
    }

    //cApp: CApp;
    get owner(): CSalesTask { return this._owner as CSalesTask };

    //初始化
    protected async internalStart(param: any) {
        this.pageMyJKTask = null;

        await this.searchByKey('');
        this.openVPage(VSelectType, param);
    }

    //搜索任务类型
    async searchByKey(key: string) {

        this.tasktypelist = await this.uqs.salesTask.TaskType.search(key, 0, 100);
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
        this.owner.cSalesTaskBiz.start(this.task)
    }

    returnTaskType = async (type: any): Promise<any> => {
        this.returnCall(type);
    }

    aiClick = async () => {
        this.pageMyJKTask = new QueryPager(this.uqs.salesTask.SearchJKTask, 15, 30);
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

        await this.uqs.salesTask.ImportTask.submit({ task: id, customername: name, organization: this.organization.id, organizationName: this.organization.name });
        await this.owner.searchTaskByKey(0);
    }

    searchCustomerRelation = async (param: any) => {
        let aa = { id: param };
        let relesions = await this.uqs.salesTask.getCustomerOrganization.query({ customerId: param })
        if (relesions && relesions.ret.length > 0) {
            let org = relesions.ret[0].organization;
            this.organization = await this.uqs.salesTask.Organization.load(org);
        }
    }

}
