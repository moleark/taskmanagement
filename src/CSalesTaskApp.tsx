//import * as React from 'react';
import { User, nav } from 'tonva-tools';
import { CApp, CUq } from 'tonva-react-uq';
import { CSalesTask } from 'salestask';
import { consts } from './salestask/consts';
import { CSalesTaskType } from 'salestask/CSalesTaskType';


export class CSalesTaskApp extends CApp {

    /** 定义 QU*/
    cUqSalesTask: CUq;
    cUqCustomer: CUq;

    /** 定义 Conctorlle*/
    cSalesTask: CSalesTask;
    cSalesTaskType: CSalesTaskType;


    protected async internalStart(param?: any) {

        /** 初始化 QU*/
        this.cUqSalesTask = this.getCUq(consts.uqSalesTask);
        this.cUqCustomer = this.getCUq(consts.uqCustomer);

        /** 初始化 Conctrolle*/
        this.cSalesTask = new CSalesTask(this, undefined);
        this.cSalesTaskType = new CSalesTaskType(this, undefined);

        /** 启动销售任务列表*/
        this.cSalesTask.start();

        /** 启动主程序*/
        await super.internalStart(param);
    }
}