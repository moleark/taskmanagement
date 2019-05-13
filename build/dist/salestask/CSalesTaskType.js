import * as tslib_1 from "tslib";
import { Controller } from 'tonva-tools';
import { observable } from 'mobx';
import { VSalesTaskType } from './VSalesTaskType';
/**
 *
 */
var CSalesTaskType = /** @class */ (function (_super) {
    tslib_1.__extends(CSalesTaskType, _super);
    //构造函数
    function CSalesTaskType(cApp, res) {
        var _this = _super.call(this, res) || this;
        //返回添加任务页面
        _this.selectTaskType = function (typeid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var addtypeId;
            return tslib_1.__generator(this, function (_a) {
                addtypeId = this.tuidTaskType.boxId(typeid);
                this.returnCall(addtypeId);
                return [2 /*return*/];
            });
        }); };
        _this.cApp = cApp;
        var cUqSalesTask = _this.cApp.cUqSalesTask;
        _this.tuidTaskType = cUqSalesTask.tuid("tasktype");
        return _this;
    }
    //初始化
    CSalesTaskType.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchByKey(param)];
                    case 1:
                        _a.sent();
                        this.openVPage(VSalesTaskType);
                        return [2 /*return*/];
                }
            });
        });
    };
    //搜索任务类型
    CSalesTaskType.prototype.searchByKey = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.tuidTaskType.search(key, 0, 100)];
                    case 1:
                        _a.tasktypelist = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CSalesTaskType.prototype, "tasktypelist", void 0);
    return CSalesTaskType;
}(Controller));
export { CSalesTaskType };
//# sourceMappingURL=CSalesTaskType.js.map