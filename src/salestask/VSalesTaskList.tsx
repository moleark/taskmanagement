import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { List, LMR, EasyDate, FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';

export class VSalesTaskList extends VPage<CSalesTask> {

    async open(param: any) {

    }

    render(member: any): JSX.Element {

        return <this.page />;
    }
    private onScrollBottom = async () => {

        //await this.controller.tasks.more();
    }

    private salesTaskPropItem(caption: string, value: any) {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4 col-lg-8">{value}</div>
        </>;
    }


    private onSalesTaskClick = async (salestask: any) => {

        this.controller.showSalesTaskDetail(salestask);
    }

    private onSalesTaskAdd = async (salestask: any) => {

        this.controller.showSalesTaskType(salestask);
    }

    private renderSalesTask(salesTask: any, index: number) {

        let { description, deadline, createTime, customer, type } = salesTask;
        let right = <small className="text-muted"><EasyDate date={createTime} /></small>;
        let divDeadline: any;
        if (deadline) divDeadline = <small className="text-muted"><EasyDate date={deadline} />: </small>;
        return <LMR className="px-3 py-2" right={right}>
            <div className="font-weight-bold">{tv(customer, (v) => <>{v.name}</>)}：{tv(type, (v) => <>{v.name}</>)}</div>
            <div>{divDeadline}{description}</div>
        </LMR>

    }

    private page = observer(() => {

        let { tasks: pageSalesTask } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关任务！</div>;
        let add = <div onClick={this.onSalesTaskAdd} className="cursor-pointer px-2 py-1"><FA name="plus" /></div>;
        let header = <LMR className="px-3 py-2 bg-primary text-white" right={add} >
            <div >销售任务</div>
        </LMR>
        return <Page header={header} onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={pageSalesTask} item={{ render: this.renderSalesTask, onClick: this.onSalesTaskClick }} />
        </Page>
    });

}

