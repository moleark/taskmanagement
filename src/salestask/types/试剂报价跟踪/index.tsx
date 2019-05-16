import * as React from 'react';
import { FA } from 'tonva-react-form';
import { CTaskType } from '../CTaskType';
import { VDetail } from './VDetail';
import { VCreate } from './VCreate';
import { Task } from '../../model';

export class 试剂报价跟踪 extends CTaskType {
    icon = <FA name='flask' size="lg" fixWidth={true} />;

    protected internalStart(param?: any): Promise<void> {
        return;
    }

    /** 
    async showDetail(task: Task): Promise<void> {
        this.openVPage(VDetail, task);
        return;
    }
    */

    protected renderContent = (task: Task): JSX.Element => {
        return this.renderView(VDetail, task);
    }

    async showCreate(task: Task): Promise<void> {
        this.openVPage(VCreate, task);
        return;
    }
}
