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
        this.openPage(
            this.renderDetailValues(task)
        );
    }

    async showDetailEdit(task: Task): Promise<void> {
        this.openPage(
            this.renderDetailEdit(task)
        );
    }

    private renderDetailEdit = (task: Task): JSX.Element => {
        let { caption, renderDetailTop, renderActionsBottom } = this;
        return <Page header={caption} footer={renderActionsBottom(task)} >
            {renderDetailTop(task)}
            {this.renderContent(task)}
        </Page >
    }

    private renderDetailValues = (task: Task): JSX.Element => {
        let { caption, renderDetailTop } = this;
        return <Page header={caption}>
            {renderDetailTop(task)}
            {this.renderContent(task)}
        </Page >
    }

    protected renderDetailTop = (task: Task): JSX.Element => {
        return this.renderView(VDetailTop, task);
    }

    protected renderContent = (task: Task): JSX.Element => {
        let { fields } = task;
        if (fields === undefined) return <></>;
        return <>
            {fields.map((v, index) => {
                let { fieldName, value } = v;
                return <div key={index}>
                    {fieldName}: {value}
                </div>
            })}
        </>;
    }

    protected renderActionsBottom = (task: Task): JSX.Element => {
        return this.renderView(VActionsBottom, task);
    }

    async showCreate(task: Task): Promise<void> {
        this.openPage(<Page header={task.typeName}>没有继承showCreate！</Page>);
    }

    renderCreateTop = (task: Task): JSX.Element => {
        return this.renderView(VCreateTop, task);
    }
}
