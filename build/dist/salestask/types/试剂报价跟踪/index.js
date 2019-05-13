import * as tslib_1 from "tslib";
import { CTaskType } from '../../CTaskType';
import { VDetail } from './VDetail';
var 试剂报价跟踪 = /** @class */ (function (_super) {
    tslib_1.__extends(试剂报价跟踪, _super);
    function 试剂报价跟踪() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    试剂报价跟踪.prototype.internalStart = function (param) {
        return;
    };
    试剂报价跟踪.prototype.showDetail = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VDetail, task);
                return [2 /*return*/];
            });
        });
    };
    return 试剂报价跟踪;
}(CTaskType));
export { 试剂报价跟踪 };
//# sourceMappingURL=index.js.map