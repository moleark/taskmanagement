import * as tslib_1 from "tslib";
import { CTaskType } from '../../CTaskType';
import { VDetail } from './VDetail';
var 大包装报价跟踪 = /** @class */ (function (_super) {
    tslib_1.__extends(大包装报价跟踪, _super);
    function 大包装报价跟踪() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    大包装报价跟踪.prototype.internalStart = function (param) {
        return;
    };
    大包装报价跟踪.prototype.showDetail = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VDetail, task);
                return [2 /*return*/];
            });
        });
    };
    return 大包装报价跟踪;
}(CTaskType));
export { 大包装报价跟踪 };
//# sourceMappingURL=index.js.map