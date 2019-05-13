export * from './CTaskType';
import { 试剂报价跟踪 } from './types/试剂报价跟踪';
import { TypeA } from './types/typeA';
import { 大包装报价跟踪 } from './types/大包装报价跟踪';
var taskTypeConstuctors = {
    typeA: TypeA,
    试剂报价跟踪: 试剂报价跟踪,
    大包装报价跟踪: 大包装报价跟踪,
};
export function createTaskTypes(cSalesTask) {
    var res = undefined;
    var ret = {};
    for (var i in taskTypeConstuctors) {
        var tt = ret[i] = new taskTypeConstuctors[i](res);
        tt.cSalesTask = cSalesTask;
    }
    return ret;
}
//# sourceMappingURL=createTaskTypes.js.map