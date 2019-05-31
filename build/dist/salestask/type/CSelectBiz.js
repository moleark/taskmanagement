import * as tslib_1 from "tslib";
import { Controller } from 'tonva';
import { VAi } from './VAi';
import { VSelectBiz } from './VSelectBiz';
/**
 *
 */
var CSelectBiz = /** @class */ (function (_super) {
    tslib_1.__extends(CSelectBiz, _super);
    //构造函数
    function CSelectBiz(cSalesTask, res) {
        var _this = _super.call(this, res) || this;
        //返回添加任务页面
        _this.selectTaskBiz = function (taskbiz) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task.biz = taskbiz.biz.obj;
                this.cSalesTask.cApp.cCustomer.start(this.task);
                return [2 /*return*/];
            });
        }); };
        //返回添加任务页面
        _this.returnTaskBiz = function (type) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
        _this.mapTaskBiz = cUqSalesTask.map('taskbiz');
        return _this;
    }
    //初始化
    CSelectBiz.prototype.internalStart = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.task = task;
                        this.taskType = task.type;
                        return [4 /*yield*/, this.getBizFromTaskTypeId(this.taskType)];
                    case 1:
                        _a.sent();
                        this.openVPage(VSelectBiz);
                        return [2 /*return*/];
                }
            });
        });
    };
    //搜索任务类型
    CSelectBiz.prototype.getBizFromTaskTypeId = function (taskType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.mapTaskBiz.query({ type: taskType.id })];
                    case 1:
                        _a.taskBizs = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CSelectBiz;
}(Controller));
export { CSelectBiz };
//# sourceMappingURL=CSelectBiz.js.map