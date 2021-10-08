import { QueryPager } from 'tonva-react';
import { makeObservable, observable } from 'mobx';
import { CApp, CUqBase } from 'uq-app';
import { Task } from '../salestask/model';
import { VInnerCustomerCall } from './VInnerCustomerCall';

/**
 *
 */
export class CInnerCustomer extends CUqBase {
    pageWebUser: QueryPager<any>;
    constructor(cApp: CApp) {
        super(cApp);
        makeObservable(this, {
            pageWebUser: observable
        })
    }

    //初始化
    protected async internalStart(task: Task) {
        this.pageWebUser = null;
        this.openVPage(VInnerCustomerCall);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageWebUser = new QueryPager(this.uqs.customer.SearchWebUser, 15, 30);
        this.pageWebUser.first({ key: key });
    }

    returnWebUser = async (webuser: any): Promise<any> => {
        this.returnCall(webuser);
    }
}