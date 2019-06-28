import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, Tuid, Action } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { VCustomerSelect } from './VCustomerSelect';
import { VCustomerDetail } from './VCustomerDetail';
import { observer } from 'mobx-react';
import { VCustomerList } from './VCustomerList';
import { Task } from 'salestask/model';
import { CCommonType } from 'salestask/types/commonType';
import { VCreateCustomer } from './VCreateCustomer';
import { async } from 'q';
import { VCreateCustomerFinish } from './VCreateCustomerFinish';
import { VMyCustomerSelectCall } from './VMyCustomerSelectCall';
import { VCustomerRelation } from './VCustomerRelation';
import { VWebUserCall } from './VWebUserCall';

//页面类
class PageCWebUser extends PageItems<any> {

    private searchQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

/**
 *
 */
export class CWebUser extends Controller {

    cApp: CSalesTaskApp;
    @observable pageWebUser: PageCWebUser;

    private querySearchWebUser: Query;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.querySearchWebUser = cUqSalesTask.query("SearchWebUser");

    }

    //初始化
    protected async internalStart(task: Task) {
        this.pageWebUser = null;
        this.openVPage(VWebUserCall);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageWebUser = new PageCWebUser(this.querySearchWebUser);
        this.pageWebUser.first({ key: key });
    }

    returnWebUser = async (webuser: any): Promise<any> => {
        this.returnCall(webuser);
    }



}
