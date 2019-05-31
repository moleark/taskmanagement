import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate, FA } from 'tonva';
import { tv } from 'tonva';
var VEmployeeHistory = /** @class */ (function (_super) {
    tslib_1.__extends(VEmployeeHistory, _super);
    function VEmployeeHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderHistory = function (taskhistory, index) {
            var task = taskhistory.task, date = taskhistory.date, status = taskhistory.status, biz = taskhistory.biz, result = taskhistory.result;
            return React.createElement("div", { className: "d-block p-3" },
                React.createElement(LMR, null,
                    React.createElement("div", null,
                        React.createElement("small", { className: "text-muted" },
                            React.createElement(EasyDate, { date: date }),
                            " ")),
                    React.createElement(LMR, { right: React.createElement("small", null,
                            "  ",
                            tv(status, function (v) { return v.name; })), left: React.createElement("div", null,
                            React.createElement("span", null,
                                React.createElement(FA, { name: 'user', className: 'mr-3 text-info' })),
                            tv(task, function (v) { return tv(v.customer, function (vs) { return vs.name; }); })) }),
                    React.createElement(LMR, { right: React.createElement("small", null, tv(task, function (v) { return tv(v.type, function (vs) { return vs.description || '#'; }); })), left: React.createElement("small", null, tv(task, function (v) { return tv(v.biz, function (vs) { return vs.description || '#'; }); })) })));
        };
        //选择任务
        _this.onTaskClick = function (param) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var tasks, _a, task;
            return tslib_1.__generator(this, function (_b) {
                tasks = param.task;
                _a = param.task;
                task = {
                    id: tasks.id,
                    type: tasks.type,
                    typeName: null,
                    biz: tasks.biz,
                    bizName: null,
                    description: null,
                    remindDate: null,
                    deadline: null,
                    customer: tasks.customer
                };
                this.controller.showDetailFromId(task);
                return [2 /*return*/];
            });
        }); };
        _this.page = observer(function (tasks) {
            var none = React.createElement("div", { className: "m-3 text-muted small" }, "\u3010\u65E0\u8BB0\u5F55\u3011");
            return React.createElement(Page, { header: "\u5DF2\u5B8C\u6210\u4EFB\u52A1" },
                React.createElement(List, { before: '', none: none, items: tasks.tasks, item: { render: _this.renderHistory, onClick: _this.onTaskClick } }));
        });
        return _this;
    }
    VEmployeeHistory.prototype.open = function (tasks) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, tasks);
                return [2 /*return*/];
            });
        });
    };
    return VEmployeeHistory;
}(VPage));
export { VEmployeeHistory };
//# sourceMappingURL=VEmployeeHistory.js.map