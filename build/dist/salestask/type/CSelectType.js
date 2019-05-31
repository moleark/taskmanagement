import * as tslib_1 from "tslib";
import { Controller } from 'tonva';
import { observable } from 'mobx';
import { VSelectType } from './VSelectType';
import { VAi } from './VAi';
/**
 *
 */
var CSelectType = /** @class */ (function (_super) {
    tslib_1.__extends(CSelectType, _super);
    //构造函数
    function CSelectType(cSalesTask, res) {
        var _this = _super.call(this, res) || this;
        //返回添加任务页面
        _this.selectTaskType = function (type) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task = {
                    id: null,
                    type: type,
                    typeName: null,
                    biz: null,
                    bizName: null,
                    description: null,
                    remindDate: null,
                    deadline: null,
                    customer: null
                };
                this.cSalesTask.cSalesTaskBiz.start(this.task);
                return [2 /*return*/];
            });
        }); };
        _this.returnTaskType = function (type) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.returnCall(type);
                return [2 /*return*/];
            });
        }); };
        _this.aiClick = function () {
            _this.openVPage(VAi);
        };
        _this.cSalesTask = cSalesTask;
        var cUqSalesTask = _this.cSalesTask.cApp.cUqSalesTask;
        _this.tuidTaskType = cUqSalesTask.tuid("tasktype");
        return _this;
    }
    //初始化
    CSelectType.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.customerid = param;
                        return [4 /*yield*/, this.searchByKey('')];
                    case 1:
                        _a.sent();
                        this.openVPage(VSelectType, param);
                        return [2 /*return*/];
                }
            });
        });
    };
    //搜索任务类型
    CSelectType.prototype.searchByKey = function (key) {
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
    ], CSelectType.prototype, "tasktypelist", void 0);
    return CSelectType;
}(Controller));
export { CSelectType };
//# sourceMappingURL=CSelectType.js.map