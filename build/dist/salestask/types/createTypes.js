export * from './CType';
import { TypeA } from './typeA';
import { CCommonType } from './commonType/CCommonType';
import { common1, common2, NonReagent, Reagent, Visit, Exhibition } from './templets';
var taskTypeConstuctors = {
    typeA: TypeA,
    reagent: Reagent,
    nonreagent: NonReagent,
    visit: Visit,
    exhibition: Exhibition,
    common1: common1,
    common2: common2,
};
export function createTaskTypes(cSalesTask) {
    var res = undefined;
    var ret = {};
    for (var i in taskTypeConstuctors) {
        var t = taskTypeConstuctors[i];
        if (typeof t === 'function') {
            var tt = ret[i] = new t(res);
            tt.cSalesTask = cSalesTask;
            if (!tt.caption)
                tt.caption = i;
        }
        else {
            var tt = ret[i] = new CCommonType(t, res);
            tt.cSalesTask = cSalesTask;
        }
    }
    return ret;
}
//# sourceMappingURL=createTypes.js.map