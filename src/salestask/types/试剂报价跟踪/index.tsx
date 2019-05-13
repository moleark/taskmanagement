import * as React from 'react';
import { CTaskType, Task } from '../CTaskType';
import { VDetail } from './VDetail';
import { FA } from 'tonva-react-form';
import { VAdd } from './VAdd';

export class 试剂报价跟踪 extends CTaskType {
    icon = <FA name='heart-o' className="text-danger" />;

    protected internalStart(param?: any): Promise<void> {
        return;
    }

    async showDetail(task: Task): Promise<void> {
        this.openVPage(VDetail, task);
        return;
    }

    async showCreate(task: Task): Promise<void> {
        this.openVPage(VAdd, task);
        return;
    }
}
