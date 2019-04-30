import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv } from 'tonva-react-uq';
import { PageItems, Controller, nav, Page, Image } from 'tonva-tools';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VSalesTaskList } from './VSalesTaskList';

class PageSalesTask extends PageItems<any> {

    private searchsalestskQuery: Query;

    constructor(searchsalestskQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchsalestskQuery = searchsalestskQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
      if (pageStart === undefined) pageStart = 0;
      let ret = await this.searchsalestskQuery.page(param, pageStart, pageSize);
      return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
  }

/**
 *
 */
export class CSalesTask extends Controller {

    cApp: CSalesTaskApp;
    pageSalesTask: PageSalesTask;

    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;
    }

    protected async internalStart(param: any) {
        this.searchByKey(param);
    }

    async searchByKey(key: string) {
        let { cUqSalesTask } = this.cApp;
        let searchSalesTasktTuid = cUqSalesTask.tuid("task");
        let task = await searchSalesTasktTuid.search(key,1,2);
        this.openVPage(VSalesTaskList, task);
    }
   
}

export function salesTaskPropItem(caption: string, value: any) {
    if (value === null || value === undefined) return null;
    return <>
        <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">{caption}</div>
        <div className="col-8 col-sm-4 col-lg-8">{value}</div>
    </>;
}
