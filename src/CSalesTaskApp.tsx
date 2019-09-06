//import * as React from 'react';
import { CApp, CUq } from 'tonva';
import { CSalesTask } from 'salestask';
import { consts } from './consts';
import { CCustomer } from 'customer/CCustomer';
import { CProduct } from 'product/CProduct';
import { CMe } from 'me/CMe';
import { CStart } from 'start/CStart';
import { CTeam } from 'team/CTeam';
import { CMessage } from 'message/CMessage';
import { CCustomerUnit } from 'customerunit/CCustomerUnit';
import { CCoupon } from 'coupon/CCoupon';
import { CInnerCustomer } from 'innercustomer/CInnerCustomer';

export class CSalesTaskApp extends CApp {

    currentSalesRegion: any;
    currentLanguage: any;
    /** 定义 QU*/
    cUqSalesTask: CUq;
    cUqCustomer: CUq;
    cUqProduct: CUq;
    cUqCommon: CUq;
    cUqPromotion: CUq;
    cUqWarehouse: CUq;

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
    cWebUser: CInnerCustomer;

    protected async internalStart(param?: any) {

        /** 初始化 QU*/
        this.cUqSalesTask = this.getCUq(consts.uqSalesTask);
        this.cUqCustomer = this.getCUq(consts.uqCustomer);
        this.cUqProduct = this.getCUq(consts.uqProduct);
        this.cUqCommon = this.getCUq(consts.uqCommon);
        this.cUqPromotion = this.getCUq(consts.uqPromotion);
        this.cUqWarehouse = this.getCUq(consts.uqWarehouse);

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
        this.cWebUser = new CInnerCustomer(this, undefined);

        let salesRegionTuid = this.cUqCommon.tuid('salesregion');
        this.currentSalesRegion = await salesRegionTuid.load(1);

        let languageTuid = this.cUqCommon.tuid('language');
        this.currentLanguage = await languageTuid.load(197);

        /** 启动销售任务列表*/
        //this.cSalesTask.start();

        /** 启动邀请码页面 */
        this.cStart.start();

        /** 启动主程序*/
        await super.internalStart(param);
    }
}