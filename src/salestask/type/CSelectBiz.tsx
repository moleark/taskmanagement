import * as React from 'react';
import * as _ from 'lodash';
import { Tuid, Controller, Map } from 'tonva';
import { observable } from 'mobx';
import { CSalesTask } from '../CSalesTask';
import { VAi } from './VAi';
import { VSelectBiz } from './VSelectBiz';
import { TaskType, Task } from 'salestask/model';

/**
 *
 */
export class CSelectBiz extends Controller {

    cSalesTask: CSalesTask;
    private mapTaskBiz: Map;
    taskBizs: any[];
    taskType: TaskType;
    private task: Task;

    //构造函数
    constructor(cSalesTask: CSalesTask, res: any) {
        super(res);
        this.cSalesTask = cSalesTask;
        let { cUqSalesTask } = this.cSalesTask.cApp;
        this.mapTaskBiz = cUqSalesTask.map('taskbiz');
    }

    //初始化
    protected async internalStart(task: Task) {
        this.task = task;
        this.taskType = task.type;
        await this.getBizFromTaskTypeId(this.taskType);
        this.openVPage(VSelectBiz);
    }

    //搜索任务类型
    private async getBizFromTaskTypeId(taskType: TaskType) {
        let ret = await this.mapTaskBiz.query({ type: taskType });
        this.taskBizs = ret.ret;
    }

    //返回添加任务页面
    selectTaskBiz = async (taskbiz: any) => {
        this.task.biz = taskbiz.biz.obj;
        this.cSalesTask.cApp.cCustomer.start(this.task)
    }

    //返回添加任务页面
    returnTaskBiz = async (type: any): Promise<any> => {
        this.returnCall(type);
    }


    aiClick = () => {
        this.openVPage(VAi);
    }
}
