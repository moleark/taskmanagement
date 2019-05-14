import * as React from 'react';
import { CTaskType, Task } from '../CTaskType';
import { VPage } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import { VDetail } from './VDetail';
import { VAdd } from './VCreate';

export class 大包装报价跟踪 extends CTaskType {
    icon = <FA name='flask' />;
    caption = '大包装报价跟踪';

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
