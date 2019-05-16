import * as React from 'react';
import { Controller, Page } from 'tonva-tools';
import { CSalesTask } from 'salestask';
import { VDetailTop } from './share/VDetailTop';
import { VCreateTop } from './share/VCreateTop';
import { VActionsBottom } from './share/VActionsBottom';
import { Task } from '../model';

export abstract class CTaskType extends Controller {
    caption: string;
    cSalesTask: CSalesTask;
    icon: any = 'plus';

    async showDetailFromId(taskid: number): Promise<void> {
        let task = await this.cSalesTask.loadTask(taskid);
        await this.showDetail(task);
    }

    async showDetail(task: Task): Promise<void> {
        this.openPage(
            this.renderDetail(task)
        );
    }

    renderDetail = (task: Task): JSX.Element => {
        let { caption, renderDetailTop, renderActionsBottom } = this;
        return <Page header={caption} footer={renderActionsBottom(task)} >
            {renderDetailTop(task)}
            {this.renderContent(task)}
        </Page >
    }

    protected renderDetailTop = (task: Task): JSX.Element => {
        return this.renderView(VDetailTop, task);
    }

    protected renderContent = (task: Task): JSX.Element => {
        return <>none</>;
    }

    protected renderActionsBottom = (task: Task): JSX.Element => {
        return this.renderView(VActionsBottom, task);
    }

    async showCreate(task: Task): Promise<void> {
        this.openPage(<Page header={task.typeName}>没有继承哦！</Page>);
    }

    renderCreateTop = (task: Task): JSX.Element => {
        return this.renderView(VCreateTop, task);
    }
}
