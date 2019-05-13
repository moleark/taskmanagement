//import * as React from 'react';
import { User, nav } from 'tonva-tools';
import { CApp, CUq } from 'tonva-react-uq';
import { CSalesTask } from 'salestask';
import { consts } from './salestask/consts';
import { CSalesTaskType } from 'salestask/CSalesTaskType';
import { CCustomer } from 'customer/CCustomer';


export class CSalesTaskApp extends CApp {

    /** 定义 QU*/
    cUqSalesTask: CUq;
    cUqCustomer: CUq;
    //cUqProduct: CUq;

    /** 定义 Conctorlle*/
    cSalesTask: CSalesTask;
    cSalesTaskType: CSalesTaskType;
    cCustomer: CCustomer;
    //cProduct: CProduct;


    protected async internalStart(param?: any) {

        /** 初始化 QU*/
        this.cUqSalesTask = this.getCUq(consts.uqSalesTask);
        this.cUqCustomer = this.getCUq(consts.uqCustomer);
        //this.cUqProduct = this.getCUq(consts.cuqProduct);

        /** 初始化 Conctrolle*/
        this.cSalesTask = new CSalesTask(this, undefined);
        this.cSalesTaskType = new CSalesTaskType(this, undefined);
        this.cCustomer = new CCustomer(this, undefined);
        //this.cProduct = new CProduct(this, undefined);

        /** 启动销售任务列表*/
        this.cSalesTask.start();

        /** 启动主程序*/
        await super.internalStart(param);
    }
}