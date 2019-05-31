import * as tslib_1 from "tslib";
import * as React from 'react';
import { Controller, Page } from 'tonva';
import { VDetailTop } from './share/VDetailTop';
import { VCreateTop } from './share/VCreateTop';
import { VActionsBottom } from './share/VActionsBottom';
import { VDetailContent } from './share/VDetailContent';
import { VFinish } from './commonType/VFinish';
var CType = /** @class */ (function (_super) {
    tslib_1.__extends(CType, _super);
    function CType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = 'plus';
        _this.renderDetailValues = function (task) {
            var _a = _this, caption = _a.caption, renderDetailTop = _a.renderDetailTop, renderDetailContent = _a.renderDetailContent;
            return React.createElement(Page, { header: caption, headerClassName: 'bg-primary' },
                renderDetailTop(task),
                renderDetailContent(task));
        };
        _this.renderDetailEdit = function (task) {
            var _a = _this, caption = _a.caption, renderDetailTop = _a.renderDetailTop, renderActionsBottom = _a.renderActionsBottom, renderDetailContent = _a.renderDetailContent;
            return React.createElement(Page, { header: caption, footer: renderActionsBottom(task), headerClassName: 'bg-primary' },
                renderDetailTop(task),
                renderDetailContent(task));
        };
        _this.renderDetailTop = function (task) {
            return _this.renderView(VDetailTop, task);
        };
        _this.renderDetailContent = function (task) {
            return _this.renderView(VDetailContent, task);
        };
        _this.renderActionsBottom = function (task) {
            return _this.renderView(VActionsBottom, task);
        };
        _this.renderComplet = function (task) {
            var caption = _this.caption;
            return React.createElement(Page, { header: caption, headerClassName: 'bg-primary' }, _this.renderCompletContent(task));
        };
        _this.renderCompletContent = function (task) {
            return _this.renderView(VFinish, task);
        };
        _this.renderCreateTop = function (task) {
            return _this.renderView(VCreateTop, task);
        };
        return _this;
    }
    //显示任务明细--无操作
    CType.prototype.showDetailFromId = function (taskid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var task;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cSalesTask.loadTask(taskid)];
                    case 1:
                        task = _a.sent();
                        this.openPage(this.renderDetailValues(task));
                        return [2 /*return*/];
                }
            });
        });
    };
    //显示任务明细--有操作
    CType.prototype.showDetailEdit = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tasks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cSalesTask.loadTask(task.id)];
                    case 1:
                        tasks = _a.sent();
                        task.fields = tasks.fields;
                        this.openPage(this.renderDetailEdit(task));
                        return [2 /*return*/];
                }
            });
        });
    };
    //完结任务
    CType.prototype.showComplet = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tasks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cSalesTask.loadTask(task.id)];
                    case 1:
                        tasks = _a.sent();
                        this.openPage(this.renderComplet(tasks));
                        return [2 /*return*/];
                }
            });
        });
    };
    //创建任务
    CType.prototype.showCreate = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                //let biz = await task.biz.getObj<any>();
                this.openPage(React.createElement(Page, { header: "biz.name" }, "\u6CA1\u6709\u7EE7\u627FshowCreate\uFF01"));
                return [2 /*return*/];
            });
        });
    };
    return CType;
}(Controller));
export { CType };
//# sourceMappingURL=CType.js.map