import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate } from 'tonva-react-form';
import { CSalesTask } from './CSalesTask';
import { tv } from 'tonva-react-uq';

export class VSalesTaskHistory extends VPage<CSalesTask> {

    private salestask: any;
    async open(task: any) {
        this.salestask = task;
        this.openPage(this.page, task);
    }

    private renderSalesTask(salesTask: any, index: number) {

        let { description, deadline, DATE, result, type } = salesTask;
        let right = <div className="text-right">
            <div><small className="text-muted">预定：<EasyDate date={deadline} /></small></div>
            <div><small className="text-muted">完成：</small></div>
        </div>;
        return <div className="d-block px-3 py-2">
            <div><span className="small text-muted"><EasyDate date={DATE} /></span> {description}</div>
            <div>{result}</div>
        </div>;
    }
    /*
    <div className="row">
    <div className="col-sm-4">{tv(type, (v) => <>{v.name}</>)}</div>
    <div className="col-sm-8 font-weight-bold">{result}</div>
</div>
<div>{description}</div>
*/

    private page = observer((task: any) => {

        let none = <div className="my-3 mx-2 text-warning">无记录！</div>;
        return <Page header="详情" >
            <List before={''} none={none} items={this.salestask} item={{ render: this.renderSalesTask }} />
        </Page>
    })
}