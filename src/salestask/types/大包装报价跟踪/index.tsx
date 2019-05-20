import * as React from 'react';
import { CTaskType } from '../CTaskType';
import { VPage } from 'tonva-tools';
import { FA } from 'tonva-react-form';
import { VDetail } from './VDetail';
import { VCreate } from './VCreate';
import { Task } from '../../model';

export class 大包装报价跟踪 extends CTaskType {

    icon = <FA name='flask' size="lg" fixWidth={true} />;
    caption = '大包装报价跟踪';

    protected internalStart(param?: any): Promise<void> {
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
