//import * as React from 'react';
import { User, nav } from 'tonva';
import { CApp, CUq } from 'tonva';
import { CSalesTask } from 'salestask';
import { consts } from './consts';
import { CSelectType } from './salestask/type';
import { CCustomer } from 'customer/CCustomer';
import { CProduct } from 'product/CProduct';
import { CType } from 'salestask/types/createTypes';
import { CMe } from 'me/CMe';
import { CCommonType } from 'salestask/types/commonType';
import { CStart } from 'start/CStart';
import { CTeam } from 'team/CTeam';
import { CMessage } from 'message/CMessage';
import { CCustomerUnit } from 'customer/CCustomerUnit';
import { CCoupon } from 'coupon/CCoupon';
import { CNewCustomer } from 'salestask/types/newcustomer/CNewCustomer';


export class CSalesTaskApp extends CApp {

    /** 定义 QU*/
    cUqSalesTask: CUq;
    cUqCustomer: CUq;
    cUqProduct: CUq;

    /** 定义 Conctorlle*/
    cSalesTask: CSalesTask;
    cCustomer: CCustomer;
    cProduct: CProduct;
    cMe: CMe;
    cTeam: CTeam;
    cStart: CStart;
    cMessage: CMessage;
    cCustomerUnit: CCustomerUnit;
    cCoupon: CCoupon;
    cNewCustomer: CNewCustomer;

    protected async internalStart(param?: any) {

        /** 初始化 QU*/
        this.cUqSalesTask = this.getCUq(consts.uqSalesTask);
        this.cUqCustomer = this.getCUq(consts.uqCustomer);
        this.cUqProduct = this.getCUq(consts.uqProduct);

        /** 初始化 Conctrolle*/
        this.cCustomer = new CCustomer(this, undefined);
        this.cProduct = new CProduct(this, undefined);
        this.cSalesTask = new CSalesTask(this, this.res);
        this.cMe = new CMe(this, undefined);
        this.cTeam = new CTeam(this, undefined);
        this.cStart = new CStart(this, undefined);
        this.cMessage = new CMessage(this, undefined);
        this.cCustomerUnit = new CCustomerUnit(this, undefined);
        this.cCoupon = new CCoupon(this, undefined);
        this.cNewCustomer = new CNewCustomer(this, undefined);

        /** 启动销售任务列表*/
        //this.cSalesTask.start();

        /** 启动邀请码页面 */
        this.cStart.start();

        /** 启动主程序*/
        await super.internalStart(param);
    }
}