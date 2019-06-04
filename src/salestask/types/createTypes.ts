export * from './CType';

import { 试剂报价跟踪 } from './试剂报价跟踪';
import { 大包装报价跟踪 } from './大包装报价跟踪';
import { CType } from './CType';
import { CSalesTask } from 'salestask';
import { TaskCommonType } from './taskCommonType';
import { CCommonType } from './commonType/CCommonType';
import { Marketing, Trial, NonReagent, Reagent, BagOrderCancel, BagOrder, Signback, NotUptoStandard, RepeatPurchase, CustomerDev, CustomerInfoDev, NewCustomerDev, Graduation } from './templets';

interface CTaskTypeConstructor {
    new(res: any): CType;
}

const taskTypeConstuctors: { [type: string]: CTaskTypeConstructor | TaskCommonType } = {
    reagent: Reagent,
    nonreagent: NonReagent,
    signback: Signback,

    bagorder: BagOrder,
    bagordercancel: BagOrderCancel,
    marketing: Marketing,
    notuptostandard: NotUptoStandard,
    repeatpurchase: RepeatPurchase,
    trial: Trial,

    customerdev: CustomerDev,
    customerinfodev: CustomerInfoDev,
    newcustomerdev: NewCustomerDev,
    graduation: Graduation,
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