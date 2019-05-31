import * as React from 'react';
import * as _ from 'lodash';
import { Tuid, Controller } from 'tonva';
import { observable } from 'mobx';
import { VSelectType } from './VSelectType';
import { CSalesTask } from '../CSalesTask';
import { VAi } from './VAi';
import { VSelectBiz } from './VSelectBiz';
import { TaskType, Task } from 'salestask/model';

/**
 *
 */
export class CSelectType extends Controller {

    cSalesTask: CSalesTask;
    private tuidTaskType: Tuid;
    private taskBook: any;
    private tasks: [];
    private customerid: number;
    private task: Task;
    @observable tasktypelist: any;

    //构造函数
    constructor(cSalesTask: CSalesTask, res: any) {
        super(res);
        this.cSalesTask = cSalesTask;

        let { cUqSalesTask } = this.cSalesTask.cApp;
        this.tuidTaskType = cUqSalesTask.tuid("tasktype");
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
    selectTaskType = async (type: TaskType) => {
        this.task = {
            id: null,
            type: type,
            typeName: null,
            biz: null,
            bizName: null,
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

    aiClick = () => {
        this.openVPage(VAi);
    }
}
