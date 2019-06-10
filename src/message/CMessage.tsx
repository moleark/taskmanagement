import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Action, PageItems } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { async } from 'q';
import { VMessage } from './VMessage';
import { observable } from 'mobx';

/**
 *
 */
class PageMessage extends PageItems<any> {

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
export class CMessage extends Controller {

    cApp: CSalesTaskApp;
    @observable pageMessage: PageMessage;
    private querySearchMessage: Query;
    private querySearchNowMessage: Query;
    private actionUpdateNowMessage: Action;
    count = observable.box<number>(0);

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.querySearchMessage = cUqSalesTask.query("SearchMessage");
        this.querySearchNowMessage = cUqSalesTask.query("SearchNowMessage");
        this.actionUpdateNowMessage = cUqSalesTask.action("UpdateNowMessage");
        this.searchNowMessage();
    }

    //初始化
    protected async internalStart(param: any) {
        this.pageMessage = null;
        await this.showMessage();
    }

    //搜索未读信息
    searchNowMessage = async () => {
        let messages = await this.querySearchNowMessage.table({});
        if (messages && messages.length > 0) {
            this.count.set(messages[0].count);
        } else {
            this.count.set(0);
        }
    }

    //更新消息
    updateNowMessage = async () => {
        await this.actionUpdateNowMessage.submit({});
        await this.searchNowMessage();
        let a = 0;
    }

    //显示消息
    showMessage = async () => {
        await this.searchMessage();
        this.openVPage(VMessage, this.pageMessage);
        await this.updateNowMessage();
    }

    //搜索消息
    searchMessage = async () => {
        this.pageMessage = new PageMessage(this.querySearchMessage);
        await this.pageMessage.first({});
    }


}