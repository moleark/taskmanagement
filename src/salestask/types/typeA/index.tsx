import { CTaskType, Task } from '../CTaskType';
import { VDetail } from './VDetail';

export class TypeA extends CTaskType {
    protected internalStart(param?: any): Promise<void> {
        return;
    }

    async showDetail(task: Task): Promise<void> {
        this.openVPage(VDetail, task);
        return;
    }

}
