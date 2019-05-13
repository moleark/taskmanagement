export * from './CTaskType';

import { 试剂报价跟踪 } from './试剂报价跟踪';
import { TypeA } from './typeA';
import { 大包装报价跟踪 } from './大包装报价跟踪';
import { CTaskType } from './CTaskType';
import { CSalesTask } from 'salestask';


interface CTaskTypeConstructor {
    new(res: any): CTaskType;
}

const taskTypeConstuctors: { [type: string]: CTaskTypeConstructor } = {
    typeA: TypeA,
    试剂报价跟踪: 试剂报价跟踪,
    大包装报价跟踪: 大包装报价跟踪,
};

export function createTaskTypes(cSalesTask: CSalesTask): { [type: string]: CTaskType } {
    let res: any = undefined;
    let ret: { [type: string]: CTaskType } = {};

    for (let i in taskTypeConstuctors) {
        let tt = ret[i] = new taskTypeConstuctors[i](res);
        tt.cSalesTask = cSalesTask;
        if (!tt.caption) tt.caption = i;
    }
    return ret;
}
