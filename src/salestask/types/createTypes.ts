export * from './CType';

import { 试剂报价跟踪 } from './试剂报价跟踪';
import { TypeA } from './typeA';
import { 大包装报价跟踪 } from './大包装报价跟踪';
import { CType } from './CType';
import { CSalesTask } from 'salestask';
import { TaskCommonType } from './taskCommonType';
import { CCommonType } from './commonType/CCommonType';
import { common1, common2, NonReagent, Reagent } from './templets';


interface CTaskTypeConstructor {
    new(res: any): CType;
}

const taskTypeConstuctors: { [type: string]: CTaskTypeConstructor | TaskCommonType } = {
    typeA: TypeA,
    reagent: Reagent,
    nonreagent: NonReagent,
    visit: NonReagent,
    common1: common1,
    common2: common2,
};

export function createTaskTypes(cSalesTask: CSalesTask): { [type: string]: CType } {
    let res: any = undefined;
    let ret: { [type: string]: CType } = {};

    for (let i in taskTypeConstuctors) {
        let t = taskTypeConstuctors[i];
        if (typeof t === 'function') {
            let tt = ret[i] = new (t as any)(res);
            tt.cSalesTask = cSalesTask;
            if (!tt.caption) tt.caption = i;
        }
        else {
            let tt = ret[i] = new CCommonType(t, res);
            tt.cSalesTask = cSalesTask;
        }
    }
    return ret;
}