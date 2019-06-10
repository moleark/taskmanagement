import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { async } from 'q';
import { VMessage } from './VMessage';

/**
 *
 */
export class CMessage extends Controller {

    cApp: CSalesTaskApp;
    private querySearchMessage: Query;
    private querySearchNowMessage: Query;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.querySearchMessage = cUqSalesTask.query("SearchMessage");
        this.querySearchNowMessage = cUqSalesTask.query("SearchNowMessage");
    }

    //初始化
    protected async internalStart(param: any) {
        await this.showMessage();
    }

    //搜索未读信息
    searchNowMessage = async () => {
        let messages = await this.querySearchNowMessage.table({});
    }

    //更新消息
    updateNowMessage = async () => {
        let messages = await this.querySearchNowMessage.table({});
    }

    //显示消息
    showMessage = async () => {
        let messages = null;//await this.querySearchMessage.table({});
        this.openVPage(VMessage, messages);
    }

}