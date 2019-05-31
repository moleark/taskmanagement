import * as tslib_1 from "tslib";
import { CType } from '../CType';
import { VCreate } from '../大包装报价跟踪/VCreate';
var TypeA = /** @class */ (function (_super) {
    tslib_1.__extends(TypeA, _super);
    function TypeA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeA.prototype.internalStart = function (param) {
        return;
    };
    /**
    protected renderContent = (task: Task): JSX.Element => {
        return this.renderView(VDetail, task);
    }
    */
    TypeA.prototype.showCreate = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VCreate, task);
                return [2 /*return*/];
            });
        });
    };
    return TypeA;
}(CType));
export { TypeA };
//# sourceMappingURL=index.js.map