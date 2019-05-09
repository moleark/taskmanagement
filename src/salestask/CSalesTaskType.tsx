import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, TuidMain, Action } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page, Image } from 'tonva-tools';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { VSalesTaskType } from './VSalesTaskType';
import { VSalesTaskAdd } from './VSalesTaskAdd';

/**
 *
 */
export class CSalesTaskType extends Controller {

    cApp: CSalesTaskApp;
    private taskTypeTuid: TuidMain;
    private taskBook: any;
    private tasks: [];
    @observable tasktypelist: any;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.taskTypeTuid = cUqSalesTask.tuid("tasktype");
    }

    //初始化
    protected async internalStart(param: any) {

        await this.searchByKey(param);
        this.openVPage(VSalesTaskType);
    }

    //搜索任务类型
    async searchByKey(key: string) {

        this.tasktypelist = await this.taskTypeTuid.search(key, 0, 100);
    }

    //显示任务添加页面
    showSalesTaskAdd = async (model: any) => {
        let { cSalesTask } = this.cApp
        cSalesTask.showSalesTaskAdd(model)
    }

}
