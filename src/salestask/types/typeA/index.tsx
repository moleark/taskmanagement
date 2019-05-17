import { CTaskType } from '../CTaskType';
import { VDetail } from './VDetail';
import { Task } from '../../model';

export class TypeA extends CTaskType {
    protected internalStart(param?: any): Promise<void> {
        return;
    }

    async showDetailEdit(task: Task): Promise<void> {
        this.openVPage(VDetail, task);
        return;
    }

}
