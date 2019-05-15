import * as React from 'react';
import { Controller, VPage, Page } from 'tonva-tools';
import { CSalesTask } from 'salestask';
import { Prop, LMR, ComponentProp, PropGrid } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { VDetailTop } from './share/VDetailTop';
import { VCreateTop } from './share/VCreateTop';
import { VActionsBottom } from './share/VActionsBottom';

export interface Task {
    id: number;
    typeName: string;
    type: any;
    description: string;
    deadline: Date;
    customer: any;
}


export abstract class CTaskType extends Controller {
    caption: string;
    cSalesTask: CSalesTask;

    async showDetail(task: Task): Promise<void> {
        //this.openVPage(VTaskDetailShare, task);
        this.openPage(<Page header={task.typeName}>没有继承哦！</Page>);
    }

    async showCreate(task: Task): Promise<void> {
        //this.openVPage(VTaskDetailShare, task);
        this.openPage(<Page header={task.typeName}>没有继承哦！</Page>);
    }

    renderDetailTop = (task: Task): JSX.Element => {
        return this.renderView(VDetailTop, task);
    }

    renderActionsBottom = (task: Task): JSX.Element => {
        return this.renderView(VActionsBottom, task);
    }

    renderCreateTop = (task: Task): JSX.Element => {
        return this.renderView(VCreateTop, task);
    }

    icon: any = 'plus';
}
