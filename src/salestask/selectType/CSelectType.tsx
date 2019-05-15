import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, TuidMain, Action } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page, Image } from 'tonva-tools';
import { CSalesTaskApp } from '../../CSalesTaskApp';
import { observable } from 'mobx';
import { VSelectType } from './VSelectType';
import { VSalesTaskAdd } from '../VSalesTaskAdd';
import { CTaskType } from '../types/CTaskType';
import { createTaskTypes } from '../types/createTaskTypes';
import { CSalesTask } from '../CSalesTask';

/**
 *
 */
export class CSelectType extends Controller {

    cSalesTask: CSalesTask;
    private tuidTaskType: TuidMain;
    private taskBook: any;
    private tasks: [];
    private customerid: number;
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
        await this.searchByKey(null);
        this.openVPage(VSelectType, param);
    }

    //搜索任务类型
    async searchByKey(key: string) {

        this.tasktypelist = await this.tuidTaskType.search(key, 0, 100);
    }

    //返回添加任务页面
    selectTaskType = async (type: any): Promise<any> => {
        this.returnCall(type);
    }

}
