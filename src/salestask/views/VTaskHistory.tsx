import * as React from 'react';
import { VPage, Page, nav } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate } from 'tonva-react-form';
import { CSalesTask } from '../CSalesTask';
import { tv } from 'tonva-react-uq';

export class VTaskHistory extends VPage<CSalesTask> {

    async open(tasks: any) {
        this.openPage(this.page, tasks);
    }

    private renderHistory = (taskhistory: any, index: number) => {
        let { date, status, principal, result } = taskhistory;
        return <div className="d-block p-3">
            <LMR right={principal.id !== nav.user.id && <span className="text-muted small">{tv(principal)}</span>}>
                <div><small className="text-muted"><EasyDate date={date} /> {tv(status, (v) => v.name)}</small></div>
            </LMR>
            <div>{result}</div>
        </div>;
    }

    private page = observer((tasks: any) => {

        let none = <div className="m-3 text-muted small">【未处理】</div>;
        return <Page header="处理详情" >
            <List before={''} none={none} items={tasks.tasks} item={{ render: this.renderHistory }} />
        </Page>
    })
}