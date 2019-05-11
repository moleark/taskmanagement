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
    private tuidTaskType: TuidMain;
    private taskBook: any;
    private tasks: [];
    @observable tasktypelist: any;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.tuidTaskType = cUqSalesTask.tuid("tasktype");
    }

    //初始化
    protected async internalStart(param: any) {

        await this.searchByKey(param);
        this.openVPage(VSalesTaskType);
    }

    //搜索任务类型
    async searchByKey(key: string) {

        this.tasktypelist = await this.tuidTaskType.search(key, 0, 100);
    }

    //返回添加任务页面
    selectTaskType = async (typeid: number): Promise<any> => {

        let addtypeId = this.tuidTaskType.boxId(typeid);
        this.returnCall(addtypeId);
    }

}
