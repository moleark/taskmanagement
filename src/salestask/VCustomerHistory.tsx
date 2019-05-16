import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate } from 'tonva-react-form';
import { CSalesTask } from './CSalesTask';

export class VEmployeeHistory extends VPage<CSalesTask> {

    private salestask: any;
    async open(task: any) {
        this.salestask = task;
        this.openPage(this.page, task);
    }

    private renderSalesTask(taskhistory: any, index: number) {
        let { status, principal, result } = taskhistory;
        return <div className="d-block px-3 py-2">
            <div>{principal}</div>
            <div>{status}</div>
            <div>{result}</div>
        </div>;
    }

    private page = observer((task: any) => {

        let none = <div className="my-3 mx-2 text-warning">无记录！</div>;
        return <Page header="沟通记录" >
            <List before={''} none={none} items={this.salestask} item={{ render: this.renderSalesTask }} />
        </Page>
    })
}