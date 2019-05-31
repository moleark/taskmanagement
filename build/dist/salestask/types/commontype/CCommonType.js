import * as tslib_1 from "tslib";
import { CType } from '../CType';
import { VCreateCheck } from '../../views/VCreateCheck';
import { VCreate } from './VCreate';
var CCommonType = /** @class */ (function (_super) {
    tslib_1.__extends(CCommonType, _super);
    function CCommonType(taskCommonType, res) {
        var _this = _super.call(this, res) || this;
        //显示查询客户页面
        _this.showCrateCheck = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VCreateCheck, task);
                return [2 /*return*/];
            });
        }); };
        //显示选择产品页面
        _this.showPorductSelect = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cSalesTask.showPorductSelect(task)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.taskCommonType = taskCommonType;
        _this.icon = taskCommonType.icon;
        _this.caption = taskCommonType.caption;
        return _this;
    }
    CCommonType.prototype.internalStart = function (param) {
        return;
    };
    /**
    protected renderContent = (task: Task): JSX.Element => {
        return this.renderView(VDetail, task);
    }
    */
    CCommonType.prototype.showCreate = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VCreate, task);
                return [2 /*return*/];
            });
        });
    };
    return CCommonType;
}(CType));
export { CCommonType };
//# sourceMappingURL=CCommonType.js.map