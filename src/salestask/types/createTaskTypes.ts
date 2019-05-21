export * from './CTaskType';

import { 试剂报价跟踪 } from './试剂报价跟踪';
import { TypeA } from './typeA';
import { 大包装报价跟踪 } from './大包装报价跟踪';
import { CTaskType } from './CTaskType';
import { CSalesTask } from 'salestask';
import { TaskCommonType } from './taskCommonType';
import { CTaskCommonType } from './common';
import { common1, common2, NonReagent, Reagent } from './commonTypes';


interface CTaskTypeConstructor {
    new(res: any): CTaskType;
}

const taskTypeConstuctors: { [type: string]: CTaskTypeConstructor | TaskCommonType } = {
    typeA: TypeA,
    试剂报价跟踪: Reagent,
    大包装报价跟踪: NonReagent,
    common1: common1,
    common2: common2,
};

export function createTaskTypes(cSalesTask: CSalesTask): { [type: string]: CTaskType } {
    let res: any = undefined;
    let ret: { [type: string]: CTaskType } = {};

    for (let i in taskTypeConstuctors) {
        let t = taskTypeConstuctors[i];
        if (typeof t === 'function') {
            let tt = ret[i] = new (t as any)(res);
            tt.cSalesTask = cSalesTask;
            if (!tt.caption) tt.caption = i;
        }
        else {
            let tt = ret[i] = new CTaskCommonType(t, res);
            tt.cSalesTask = cSalesTask;
        }
    }
    return ret;
}