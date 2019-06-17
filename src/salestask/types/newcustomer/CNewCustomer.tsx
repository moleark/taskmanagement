import * as React from 'react';
import { Task } from '../../model';
import { TaskCommonType } from '../taskCommonType';
import { Controller, Query } from 'tonva';
import { CSalesTaskApp } from 'CSalesTaskApp';
import { VFinish } from './VFinish';
import { async } from 'q';

export class CNewCustomer extends Controller {

    cApp: CSalesTaskApp;
    private querySearchRelationCustomer: Query;
    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;
        let { cUqSalesTask } = this.cApp;

        this.querySearchRelationCustomer = cUqSalesTask.query("SearchRelationCustomer");
    }

    protected internalStart(param?: TaskCommonType): Promise<void> {
        return;
    }

    //显示完结页面
    showFinish = async (task: Task) => {
        let customers = await this.searchRelationCustomer(task.description)
        this.openVPage(VFinish, customers);
    }

    //显示匹配到的客户信息
    searchRelationCustomer = async (key: any) => {
        let param = { key: key }
        return await this.querySearchRelationCustomer.table(param);
    }

    //添加关联关系
    addRelationCustomer = async (key: any) => {
        let param = { key: key }
        return await this.querySearchRelationCustomer.table(param);
    }
}
