import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, Tuid, Action } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observer } from 'mobx-react';
import { VMe } from './VMe';

/**
 *
 */
export class CMe extends Controller {

    cApp: CSalesTaskApp;
    private tuidCustomer: Tuid;
    private querySearchCustomer: Query;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask, cUqCustomer } = this.cApp;
        this.tuidCustomer = cUqSalesTask.tuid("customer");
        this.querySearchCustomer = cUqCustomer.query("searchcustomer");
    }

    //初始化
    protected async internalStart(param: any) {

        this.openVPage(VMe, param);
    }

    render = observer(() => {
        return this.renderView(VMe);
    })

    tab = () => {
        return <this.render />;
    }
}
