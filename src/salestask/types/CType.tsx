import * as React from 'react';
import { Controller, Page } from 'tonva';
import { CSalesTask } from 'salestask';
import { VDetailTop } from './share/VDetailTop';
import { VCreateTop } from './share/VCreateTop';
import { VActionsBottom } from './share/VActionsBottom';
import { Task } from '../model';
import { VDetailContent } from './share/VDetailContent';
import { VFinish } from './commonType/VFinish';

export abstract class CType extends Controller {
    caption: string;
    cSalesTask: CSalesTask;
    icon: any = 'plus';

    //显示任务明细--无操作
    async showDetailFromId(taskid: number): Promise<void> {
        let task = await this.cSalesTask.loadTask(taskid);
        this.openPage(
            this.renderDetailValues(task)
        );
    }
    //显示明细--有操作
    async showDetailEdit(task: Task): Promise<void> {
        let tasks = await this.cSalesTask.loadTask(task.id);
        this.openPage(
            this.renderDetailEdit(tasks)
        );
    }
    //完结任务
    async showComplet(task: Task): Promise<void> {
        let tasks = await this.cSalesTask.loadTask(task.id);
        this.openPage(
            this.renderComplet(tasks)
        );
    }

    private renderComplet = (task: Task): JSX.Element => {
        let { caption } = this;
        return <Page header={caption} headerClassName='bg-primary' >
            {this.renderCompletContent(task)}
        </Page >
    }

    private renderCompletContent = (task: Task): JSX.Element => {
        return this.renderView(VFinish, task);
    }

    private renderDetailEdit = (task: Task): JSX.Element => {
        let { caption, renderDetailTop, renderActionsBottom, renderDetailContent } = this;
        return <Page header={caption} footer={renderActionsBottom(task)} headerClassName='bg-primary'  >
            {renderDetailTop(task)}
            {renderDetailContent(task)}
        </Page >
    }

    private renderDetailValues = (task: Task): JSX.Element => {
        let { caption, renderDetailTop, renderDetailContent } = this;
        return <Page header={caption} headerClassName='bg-primary' >
            {renderDetailTop(task)}
            {renderDetailContent(task)}
        </Page >
    }

    protected renderDetailTop = (task: Task): JSX.Element => {
        return this.renderView(VDetailTop, task);
    }

    protected renderDetailContent = (task: Task): JSX.Element => {
        return this.renderView(VDetailContent, task);
    }

    protected renderActionsBottom = (task: Task): JSX.Element => {
        return this.renderView(VActionsBottom, task);
    }

    //创建任务
    async showCreate(task: Task): Promise<void> {
        this.openPage(<Page header={task.biz.name}>没有继承showCreate！</Page>);
    }

    renderCreateTop = (task: Task): JSX.Element => {
        return this.renderView(VCreateTop, task);
    }
}
