import * as React from 'react';
import _ from 'lodash';
import { Query, Tuid, Action, FA } from 'tonva';
import { PageItems, Controller } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VMain } from './views/VMain';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { VSalesTaskExtension } from './views/VSalesTaskExtension';
import { VTaskHistory } from './views/VTaskHistory';
import { CType, createTaskTypes } from 'salestask/types/createTypes';
import { CSelectType } from './type';
import { Task, TaskField, TaskType, BizType, CreateProduct } from './model';
import { Tasks } from './model/tasks';
import { VSalesTaskInvalid } from './views/VSalesTaskInvalid';
import { VEmployeeHistory } from './views/VEmployeeHistory';
import { VCustomerHistory } from './views/VCustomerHistory';
import { CSelectBiz } from './type/CSelectBiz';
import { VCreateCheck } from './views/VCreateCheck';
import { VCreateProduct } from './views/VCreateProduct';
import { async } from 'q';
import { VProductDetail } from './views/VProductDetail';
import { CCommonType } from './types/commonType';
import { VCreateProject } from './views/VCreateProject';
import { VProjectDetail } from './views/VProjectDetail';
import { VCreateProductPack } from './views/VCreateProductPack';
import { LoaderProductChemicalWithPrices } from 'product/item';
import { VProductPackDetail } from './views/VProductPackDetail';

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
    cSelectType: CSelectType;
    cSalesTaskBiz: CSelectBiz;

    private taskTypes: { [type: string]: CType } = {};
    @observable tasks: Tasks;
    @observable createproduct: CreateProduct;
    protected actionCompletionTask: Action;
    protected actionCompletionCustomerInfoTask: Action;
    protected extensionTaskAction: Action;
    protected addTaskAction: Action;
    protected createTaskProductAction: Action;
    protected createTaskProductPackAction: Action;
    protected createTaskProjectAction: Action;
    private taskTuid: Tuid;
    private tuidCustomer: Tuid;
    private tuidTaskType: Tuid;
    private tuidProduct: Tuid;
    private qeurySearchTask: Query;
    private qeurySearchHistory: Query;
    private qeurySearchEmployeeHistory: Query;
    private qeurySearchCustomerHistory: Query;
    private qeurySearchTaskCompletion: Query;
    private qeurySearchTaskProduct: Query;
    private qeurySearchTaskProject: Query;
    private qeurySearchTaskProductPack: Query;

    private taskBook: any;

    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;
        this.cSelectType = new CSelectType(this, undefined);
        this.cSalesTaskBiz = new CSelectBiz(this, undefined);

        let { cUqSalesTask, cUqCustomer, cUqProduct } = this.cApp;
        this.taskTuid = cUqSalesTask.tuid("task");
        this.tuidCustomer = cUqCustomer.tuid('customer');
        this.tuidTaskType = cUqSalesTask.tuid("tasktype");
        this.tuidProduct = cUqProduct.tuid('productx');

        this.taskBook = cUqSalesTask.book("taskbook");
        this.actionCompletionTask = cUqSalesTask.action('CompletionTask');
        this.actionCompletionCustomerInfoTask = cUqSalesTask.action('CompletionCustomerInfoTask');


        this.extensionTaskAction = cUqSalesTask.action('ExtensionTask');
        this.addTaskAction = cUqSalesTask.action('AddTask');
        this.createTaskProductAction = cUqSalesTask.action('CreateTaskProduct');
        this.createTaskProjectAction = cUqSalesTask.action('CreateTaskProject');
        this.createTaskProductPackAction = cUqSalesTask.action('CreateTaskProductPack');


        this.qeurySearchTask = cUqSalesTask.query("searchtask");
        this.qeurySearchHistory = cUqSalesTask.query("searchhistorytask");
        this.qeurySearchEmployeeHistory = cUqSalesTask.query("searchhistorytaskbyemployee");
        this.qeurySearchCustomerHistory = cUqSalesTask.query("searchhistorytaskbycustomer");
        this.qeurySearchTaskCompletion = cUqSalesTask.query("searchtaskcompletion");
        this.qeurySearchTaskProduct = cUqSalesTask.query("SearchTaskProduct");
        this.qeurySearchTaskProject = cUqSalesTask.query("SearchTaskProject");
        this.qeurySearchTaskProductPack = cUqSalesTask.query("SearchTaskProductPack");


        this.taskTypes = createTaskTypes(this);
    }

    //初始化
    protected async internalStart(param: any) {
        await this.searchTaskByKey(param);
    }

    //搜索开始------------------------------------------------
    //搜索所有未处理任务
    searchTaskByKey = async (key: string) => {
        let tasks = await this.qeurySearchTask.table({});
        this.tasks = new Tasks(tasks);
    }
    //搜索单个任务
    loadTask = async (taskid: number) => {
        let task = await this.taskTuid.load(taskid);
        task.fields = await this.searchTaskCompletion(taskid);
        return task;
    }
    //搜索处理结果的记录
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
        this.openVPage(VCustomerHistory, tasks);
    }
    //获取类型的图表
    getTaskIcon(typeName: string) {
        let tt = this.taskTypes[typeName];
        if (tt === undefined) {
            if (typeName == 'qualify') {
                return <FA name='address-book' size="lg" fixWidth={true} />;
            } else if (typeName == 'legend') {
                return <FA name='newspaper-o' size="lg" fixWidth={true} />;
            } else {
                return <FA name='sticky-note' size="lg" fixWidth={true} />;
            }
        }
        return tt.icon;
    }
    //获取任务类型
    getCTaskType(typeName: string): CType {
        return this.taskTypes[typeName];
    }
    //获取任务类型
    getCommonType(bizName: string): CCommonType {
        let model = this.getCTaskType(bizName);
        return model as CCommonType;
    }
    //搜索结束------------------------------------------------


    //显示开始------------------------------------------------
    //显示销售任务明细页面
    showTaskDetailEdit = async (task: Task) => {
        let name = task.biz.obj ? task.biz.obj.name : task.biz.name;
        let tt = this.getCTaskType(task.biz.obj.name);
        if (tt !== undefined) tt.showDetailEdit(task);
    }
    //显示销售任务明细页面
    showDetailFromId = async (task: Task) => {
        this.getCTaskType(task.biz.obj.name).showDetailFromId(task.id);
    }
    //显示任务完结页面
    showTaskComplet = async (task: Task) => {
        let name = task.biz.obj ? task.biz.obj.name : task.biz.name;
        this.getCTaskType(name).showComplet(task);
    }
    //显示结束------------------------------------------------


    //处理任务开始------------------------------------------------
    //完结任务
    async finishTask(task: Task) {
        //完结任务--后台数据
        let { id, fields, type } = task;
        let param = {
            taskid: id,
            resulttype: "compl",
            result: "完结",
            fields: fields
        };

        if (type.obj.name == "qualify") {
            await this.actionCompletionCustomerInfoTask.submit(param);
        } else {
            await this.actionCompletionTask.submit(param);
        }
        this.tasks.remove(task);
        this.closePage(2);
    }


    //添加并完结任务
    createAndFinishTask = async (task: Task) => {
        let newtask = await this.createTasks(task);
        await this.showTaskComplet(newtask);
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
        await this.actionCompletionTask.submit(param);
        /*
        let index = this.tasks.findIndex(v => v.id === model.id);
        if (index >= 0) this.tasks.splice(index, 1);
        */
        this.tasks.remove(task);
    }

    //显示选择产品页面
    showPorductSelect = async (task: Task) => {
        let { cProduct } = this.cApp;
        let createproduct = {
            task: task,
            product: undefined,
            pack: undefined,
            note: undefined
        }
        this.createproduct.task = task;
        cProduct.showProductSelect(createproduct);
    }

    showPorductSelectDetail = async (createproduct: any) => {
        this.createproduct = createproduct;
        this.openVPage(VCreateProduct, this.createproduct);
    }

    //添加产品
    createTaskProduct = async (createproduct: CreateProduct) => {
        this.createproduct = createproduct;
        let { product, task, note } = this.createproduct;
        note = note ? note : undefined;
        let param = { taskid: task.id, productid: product.productid, note: note };
        this.createTaskProductAction.submit(param);
    }

    //显示产品列表
    showTaskProductDetail = async (task: Task) => {
        let products = await this.qeurySearchTaskProduct.table({ taskid: task.id });
        /*products.map((v, index) => {
            await v.product.assure();
            let aa = v.product;
            let aaa = 1;
        })*/
        await this.openVPage(VProductDetail, products);
    }

    //添加包装-显示
    showPorductPackSelect = async (task: Task) => {
        let { cProduct } = this.cApp;
        let createproduct = {
            task: task,
            product: undefined,
            pack: undefined,
            note: undefined
        }
        cProduct.showProductPackSelect(createproduct);
    }
    showPorductPackSelectDetail = async (createproduct: any) => {
        this.createproduct = createproduct;
        let loader = new LoaderProductChemicalWithPrices(this.cApp);
        let product = await loader.load(createproduct.product.productid);

        this.openVPage(VCreateProductPack, product)
    }

    //添加包装
    createTaskProjectPack = async (createproduct: any) => {
        this.createproduct = createproduct;
        let { task, product, note, pack } = this.createproduct;
        let productid = product.productid;
        let taskid = task.id;

        let promises: PromiseLike<any>[] = [];
        pack.forEach(v => {
            promises.push(this.createTaskProductPackAction.submit({ task: taskid, product: productid, pack: v, note: note }));
        })
        let results = await Promise.all(promises);
        this.closePage(2);
    }

    //显示包装列表
    showTaskProjectPackDetail = async (task: Task) => {
        let projects = await this.qeurySearchTaskProductPack.table({ taskid: task.id });
        this.openVPage(VProductPackDetail, projects);
    }


    //添加项目-显示
    showCreateProject = async (task: Task) => {
        this.openVPage(VCreateProject, task);
    }

    //添加项目
    createTaskProject = async (task: Task, note: string) => {
        let param = { taskid: task.id, note: note };
        await this.createTaskProjectAction.submit(param);
    }

    //显示项目列表
    showTaskProjectDetail = async (task: Task) => {
        let projects = await this.qeurySearchTaskProject.table({ taskid: task.id });
        this.openVPage(VProjectDetail, projects);
    }

    //处理任务结束------------------------------------------------


    //添加任务开始------------------------------------------------
    //显示任务类页面
    showSelectTaskType = async () => {
        //return await this.cSalesTaskType.call();
        await this.cSelectType.start();
    }
    //显示选择处理方式的页面
    showCrateCheck = async (task: Task) => {
        this.openVPage(VCreateCheck, task);
    }

    //添加任务
    createTask = async (param: any, task: Task) => {
        let newtask = await this.createTasks(task);
        await this.searchTaskByKey('');
    }

    private createTasks = async (task: Task) => {
        let { customer, type, biz, description, priorty, deadline } = task;
        let customerId = customer.id;
        let typeId = type.id;
        let bizIds = biz.id;
        priorty = priorty ? 1 : 0;
        deadline = deadline ? deadline : undefined;
        description = description ? description : undefined;
        //添加任务--后台数据
        let model = { id: undefined, description: description, customer: customerId, type: typeId, biz: bizIds, sourceID: "", sourceType: "", sourceNo: "", priorty: priorty, deadline: deadline };
        let ret = await this.addTaskAction.submit(model);
        task.id = ret.id;
        return task;
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
    //添加任务结束------------------------------------------------

    //显示客户明细页面
    showCustomerDetail = async (customerId: any) => {
        let { cCustomer } = this.cApp;
        cCustomer.showCustomerDetail(customerId);
    }

    render = observer(() => {
        return this.renderView(VMain);
    })

    tab = () => {
        return <this.render />;
    }
}

