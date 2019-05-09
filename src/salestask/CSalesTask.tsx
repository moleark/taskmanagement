import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, TuidMain, Action } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page, Image, Context } from 'tonva-tools';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VSalesTaskList } from './VSalesTaskList';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { VSalesTask } from './VSalesTask';
import { VSalesTaskComplet } from './VSalesTaskComplet';
import { VSalesTaskExtension } from './VSalesTaskExtension';
import { VSalesTaskAdd } from './VSalesTaskAdd';

class PageSalesTask extends PageItems<any> {

    private searchsalestskQuery: Query;

    constructor(searchsalestskQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchsalestskQuery = searchsalestskQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchsalestskQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

/**
 *
 */
export class CSalesTask extends Controller {

    cApp: CSalesTaskApp;
    @observable tasks: any[];
    protected completionTaskAction: Action;
    protected addTaskAction: Action;
    private taskTuid: TuidMain;
    private tuidCustomer: TuidMain;
    private taskTypeTuid: TuidMain;
    private taskBook: any;
    //private tasks: [];

    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask, cUqCustomer } = this.cApp;
        this.taskTuid = cUqSalesTask.tuid("task");
        this.tuidCustomer = cUqCustomer.tuid('customer');
        this.taskTypeTuid = cUqSalesTask.tuid("tasktype");
        this.taskBook = cUqSalesTask.book("taskbook");
        this.completionTaskAction = cUqSalesTask.action('CompletionTask');
        this.addTaskAction = cUqSalesTask.action('AddTask');
        let s = null;
    }

    protected async internalStart(param: any) {

        await this.searchByKey(param);
    }

    async searchByKey(key: string) {

        let task = await this.taskTuid.search(key, 0, 100);
        this.tasks = task;
    }

    render = observer(() => {

        return this.renderView(VSalesTaskList);
    })

    tab = () => {
        return <this.render />;
    }

    //显示销售任务明细
    showSalesTaskDetail = async (model: any) => {

        this.openVPage(VSalesTask, model);
    }

    //显示任务完结页面
    showSalesTaskComplet = async (model: any) => {

        this.openVPage(VSalesTaskComplet, model);
    }

    //显示任务延期页面
    showSalesTaskExtension = async (model: any) => {

        this.openVPage(VSalesTaskExtension, model);
    }

    //显示任务添加页面
    showSalesTaskType = async (model: any) => {

        let { cSalesTaskType } = this.cApp
        cSalesTaskType.start();// .openVPage(VSalesTaskType, model);
    }

    //完结任务
    async completionTask() {
        let param = { taskid: 1, result: "完结任务" };
        await this.completionTaskAction.submit(param);
    }

    //延期任务
    async extensionTask() {
        let param = { taskid: 1, result: "延期任务" };
        await this.completionTaskAction.submit(param);
    }

    //显示任务添加页面
    showSalesTaskAdd = async (model: any) => {

        this.openVPage(VSalesTaskAdd, model);
    }

    onInvalidTask = async (model: any) => {
        let index = this.tasks.findIndex(v => v.id === model.id);
        if (index >= 0) this.tasks.splice(index, 1);
        this.closePage(1);
    }


    //添加任务
    addSalesTask = async (param: any) => {
        let customerId = 4;
        let typeId = 1;
        let model = { id: undefined, description: "测试添加", customer: customerId, type: typeId, sourceID: "", sourceType: "", sourceNo: "", priorty: "1", deadline: "2019-06-01" };
        let ret = await this.addTaskAction.submit(model);
        model.id = ret.id;
        this.tasks.unshift({
            id: ret.id,
            description: 'test',
            customer: this.tuidCustomer.boxId(customerId),
            type: this.taskTypeTuid.boxId(typeId),
            sourceID: "",
            sourceType: "",
            sourceNo: "",
            priorty: "1",
            deadline: "2019-06-01"
        });
    }

    pickAddress = async (context: Context, name: string, value: number): Promise<number> => {
        //let cAddress = new(this.cApp, undefined);
        return null;//await cAddress.call<number>();
    }
}

