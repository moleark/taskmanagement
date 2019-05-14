import * as React from 'react';
import classNames from 'classnames';
import { VPage, Page, PageItems, Image } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { List, LMR, EasyDate, FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';

export class VSalesTaskList extends VPage<CSalesTask> {

    private tasklist: any;
    async open(param: any) {

    }

    render(member: any): JSX.Element {
        return <this.page />;
    }

    private onScrollBottom = async () => {
    }

    //选择任务
    private onSalesTaskClick = async (salestask: any) => {

        this.controller.showSalesTaskDetail(salestask);
    }

    //添加任务
    private onSalesTaskAdd = async () => {
        await this.controller.createTask();
    }

    private renderSalesTask = (salesTask: any, index: number) => {

        let { description, deadline, createTime, customer, type, typeName, priorty } = salesTask;
        let cnFlag = classNames({
            'my-1 mr-3': true,
            'text-danger': priorty > 0,
            'text-info': !(priorty > 0)
        })
        var divpriorty: any;
        //<small>{divpriorty}</small>
        if (priorty == 1)
            divpriorty = <FA name='circle' className="text-danger">  </FA>
        let left = <div className={cnFlag}>{this.controller.taskIcon(typeName)}</div>;
        let right = <div className="text-right">
            <div><small className="text-muted"><EasyDate date={deadline} /></small></div>
        </div>;
        return <LMR className="px-3 py-2" left={left} right={right}  >
            <div className="row">
                <div className="col-sm-8 font-weight-bold">{tv(customer, (v) => <>{v.name}</>)}</div>
                <small className="text-muted ml-3">{tv(type, (v) => <>{v.name}</>)}</small>
            </div>
        </LMR>
    }

    private page = observer(() => {

        let { tasks: pageSalesTask } = this.controller;
        this.tasklist = pageSalesTask;

        let none = <div className="my-3 mx-2 text-muted">无任务</div>;
        let add = <div onClick={this.onSalesTaskAdd} className="cursor-pointer px-3 py-1"><FA name="plus" /></div>;
        let header = <LMR className="pl-3 py-2 bg-primary text-white" right={add} >
            <div className="d-flex h-100 align-items-center">销售助手</div>
        </LMR>

        let tasksss = [{ name: "今天" }, { name: "明天" }, { name: "一周" }];
        return <Page header={header} onScrollBottom={this.onScrollBottom}>
            <List before={''} none={none} items={this.controller.tasks} item={{ render: this.renderSalesTask, onClick: this.onSalesTaskClick }} />
        </Page>
    });

}

