import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, TuidMain, Action } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page, Image, Context } from 'tonva-tools';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VSalesTaskList } from './views/VSalesTaskList';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { VSalesTask } from './views/VSalesTask';
import { VSalesTaskComplet } from './views/VSalesTaskComplet';
import { VSalesTaskExtension } from './views/VSalesTaskExtension';
import { VSalesTaskAdd } from './views/VSalesTaskAdd';
import { Data } from 'tonva-tools/local';
import { VTaskHistory } from './views/VTaskHistory';
import { CTaskType, createTaskTypes } from 'salestask/types/createTaskTypes';
import { CSelectType } from './selectType';
import { Task } from './model';
import { Tasks } from './model/tasks';
import { VSalesTaskInvalid } from './views/VSalesTaskInvalid';
import { VEmployeeHistory } from './views/VEmployeeHistory';
import { async } from 'q';
import { VCustomerHistory } from './views/VCustomerHistory';

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
    cSalesTaskType: CSelectType;

    private taskTypes: { [type: string]: CTaskType } = {};

    @observable tasks: Tasks;
    protected completionTaskAction: Action;
    protected extensionTaskAction: Action;
    protected addTaskAction: Action;
    private taskTuid: TuidMain;
    private tuidCustomer: TuidMain;
    private taskTypeTuid: TuidMain;
    private qeurySearchTask: Query;
    private qeurySearchHistory: Query;
    private qeurySearchEmployeeHistory: Query;
    private qeurySearchCustomerHistory: Query;
    private qeurySearchTaskCompletion: Query;

    private taskBook: any;

    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        this.cSalesTaskType = new CSelectType(this, undefined);
        let { cUqSalesTask, cUqCustomer } = this.cApp;
        this.taskTuid = cUqSalesTask.tuid("task");
        this.tuidCustomer = cUqCustomer.tuid('customer');
        this.taskTypeTuid = cUqSalesTask.tuid("tasktype");

        this.taskBook = cUqSalesTask.book("taskbook");
        this.completionTaskAction = cUqSalesTask.action('CompletionTask');
        this.extensionTaskAction = cUqSalesTask.action('ExtensionTask');
        this.addTaskAction = cUqSalesTask.action('AddTask');

        this.qeurySearchTask = cUqSalesTask.query("searchtask");
        this.qeurySearchHistory = cUqSalesTask.query("searchhistorytask");
        this.qeurySearchEmployeeHistory = cUqSalesTask.query("searchhistorytaskbyemployee");
        this.qeurySearchCustomerHistory = cUqSalesTask.query("searchhistorytaskbycustomer");
        this.qeurySearchTaskCompletion = cUqSalesTask.query("searchtaskcompletion");

        this.taskTypes = createTaskTypes(this);
    }

    //初始化
    protected async internalStart(param: any) {
        await this.searchByKey(param);
    }

    //搜索所有未处理任务
    searchByKey = async (key: string) => {
        let tasks = await this.qeurySearchTask.table({});
        this.tasks = new Tasks(tasks);
    }

    loadTask = async (taskid: number) => {
        let task = await this.taskTuid.load(taskid);
        task.fields = await this.searchTaskCompletion(taskid);
        return task;
    }
    //搜索处理记录
    searchTaskCompletion = async (taskid: number) => {
        return await this.qeurySearchTaskCompletion.table({ taskid: taskid });
    }
    //显示任务沟通记录
    showTaskHistory = async (taskid: number) => {
        let tasks = await this.qeurySearchHistory.table({ taskid: taskid });
        this.openVPage(VTaskHistory, { tasks: tasks });
    }

    //显示员工沟通记录
    showEmployeeHistory = async () => {
        let tasks = await this.qeurySearchEmployeeHistory.table({});
        this.openVPage(VEmployeeHistory, { tasks: tasks });
    }

    //显示客户沟通记录
    showCustomerHistory = async (customerid: number) => {
        let tasks = await this.qeurySearchCustomerHistory.table({ customerid: customerid });
        this.openVPage(VCustomerHistory, { tasks: tasks });
    }


    //获取类型的图表
    taskIcon(typeName: string) {
        let tt = this.taskTypes[typeName];
        if (tt === undefined) {
            throw typeName + ' is not defined';
        }
        return tt.icon;
    }

    //获取任务类型
    private getCTaskType(typeName: string): CTaskType {
        let tt = this.taskTypes[typeName];
        if (tt === undefined) {
            throw typeName + ' is not defined';
        }
        return tt;
    }

    //显示销售任务明细页面
    showTaskDetailEdit = async (task: Task) => {
        this.getCTaskType(task.typeName).showDetailEdit(task);
    }

    //显示销售任务明细页面
    showDetailFromId = async (task: Task) => {
        this.getCTaskType(task.typeName).showDetailFromId(task.id);
    }

    //显示任务完结页面
    showTaskComplet = async (model: any) => {
        this.openVPage(VSalesTaskComplet, model);
    }
    //完结任务
    async completionTask(task: Task, result: string, resulttype: string) {
        //完结任务--后台数据
        let param = {
            taskid: task.id,
            resulttype: "compl",
            result: result,
            fields: [
                { fieldName: 'a', value: 1 },
                { fieldName: 'b', value: 2 },
                { fieldName: 'a', value: 3 },
            ]
        };
        await this.completionTaskAction.submit(param);
        //完结任务--前台页面
        /*
        let index = this.tasks.findIndex(v => v.id === taskid);
        if (index >= 0) this.tasks.splice(index, 1);
        */
        this.tasks.remove(task);
        this.closePage(2);
    }

    //显示任务延期页面
    showTaskExtension = async (model: Task) => {
        this.openVPage(VSalesTaskExtension, model);
    }

    //延期任务
    async extensionTask(task: Task, result: string, resulttype: string, date: Date) {
        let param = { taskid: task.id, result: result, remindDate: date };
        await this.extensionTaskAction.submit(param);
        this.tasks.postPone(date, task);
    }

    //显示拒绝任务页面
    showTaskInvalid = async (model: Task) => {
        this.openVPage(VSalesTaskInvalid, model);
    }

    //拒绝任务
    onInvalidTask = async (task: Task, result: string, resulttype: string) => {
        let param = { taskid: task.id, resulttype: "Inval", result: result };
        await this.completionTaskAction.submit(param);
        /*
        let index = this.tasks.findIndex(v => v.id === model.id);
        if (index >= 0) this.tasks.splice(index, 1);
        */
        this.tasks.remove(task);
    }

    createTask = async () => {
        let taskType = await this.selectTaskType();
        let customer = await this.selectCustomer();
        let typeName = (taskType as any).name
        let task = {
            id: null,
            type: taskType,
            typeName: typeName,
            description: null,
            remindDate: null,
            deadline: null,
            customer: customer
        }
        this.getCTaskType(typeName).showCreate(task);
    }

    //显示查询客户页面
    private selectCustomer = async () => {
        let { cCustomer } = this.cApp
        return await cCustomer.call();
    }

    private selectTaskType = async () => {
        return await this.cSalesTaskType.call();
    }

    //添加任务
    addTask = async (param: any, task: Task) => {
        let { description, priorty, deadline } = param;
        let { customer, type } = task;
        let customerId = customer.id;
        let typeId = type.id;
        priorty = priorty ? 1 : 0;
        //添加任务--后台数据
        let model = { id: undefined, description: description, customer: customerId, type: typeId, sourceID: "", sourceType: "", sourceNo: "", priorty: priorty, deadline: deadline };
        let ret = await this.addTaskAction.submit(model);
        model.id = ret.id;

        await this.searchByKey(param);
        /** 
        //添加任务--前台页面
        this.tasks.unshift({
            id: ret.id,
            description: description,
            customer: this.tuidCustomer.boxId(customerId),
            type: this.taskTypeTuid.boxId(typeId),
            sourceID: "",
            sourceType: "",
            sourceNo: "",
            priorty: priorty,
            deadline: deadline
        });
        */
    }

    //显示客户明细页面
    showCustomerDetail = async (customerId: any) => {
        let { cCustomer } = this.cApp;
        cCustomer.showCustomerDetail(customerId);
    }

    render = observer(() => {
        return this.renderView(VSalesTaskList);
    })

    tab = () => {
        return <this.render />;
    }

}

