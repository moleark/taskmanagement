import * as tslib_1 from "tslib";
import { CTaskType } from '../../CTaskType';
import { VDetail } from './VDetail';
var TypeA = /** @class */ (function (_super) {
    tslib_1.__extends(TypeA, _super);
    function TypeA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeA.prototype.internalStart = function (param) {
        return;
    };
    TypeA.prototype.showDetail = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VDetail, task);
                return [2 /*return*/];
            });
        });
    };
    return TypeA;
}(CTaskType));
export { TypeA };
//# sourceMappingURL=index.js.map