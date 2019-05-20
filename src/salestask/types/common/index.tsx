import * as React from 'react';
import { CTaskType } from '../CTaskType';
import { VPage } from 'tonva';
import { FA } from 'tonva';
import { VDetail } from './VDetail';
//import { VAdd } from './VCreate';
import { Task } from '../../model';
import { TaskCommonType } from '../taskCommonType';
import { VCreate } from './VCreate';

export class CTaskCommonType extends CTaskType {
    taskCommonType: TaskCommonType;

    constructor(taskCommonType: TaskCommonType, res: any) {
        super(res);
        this.taskCommonType = taskCommonType;
        this.icon = taskCommonType.icon;
        this.caption = taskCommonType.caption;
    }

    protected internalStart(param?: TaskCommonType): Promise<void> {
        return;
    }

    /**
    protected renderContent = (task: Task): JSX.Element => {
        return this.renderView(VDetail, task);
    }
    */

    async showCreate(task: Task): Promise<void> {
        this.openVPage(VCreate, task);
        return;
    }
}
