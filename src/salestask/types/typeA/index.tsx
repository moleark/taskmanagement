import { CTaskType } from '../CTaskType';
import { VDetail } from './VDetail';
import { Task } from '../../model';
import { VCreate } from '../大包装报价跟踪/VCreate';

export class TypeA extends CTaskType {
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
