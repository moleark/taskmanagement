import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate } from 'tonva';
import { tv } from 'tonva';
var VCustomerHistory = /** @class */ (function (_super) {
    tslib_1.__extends(VCustomerHistory, _super);
    function VCustomerHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderHistory = function (taskhistory, index) {
            var task = taskhistory.task, date = taskhistory.date, status = taskhistory.status, principal = taskhistory.principal, result = taskhistory.result;
            // right={tv(principal)}
            return React.createElement("div", { className: "d-block p-3" },
                React.createElement(LMR, { className: 'small', left: React.createElement("small", { className: "text-muted" },
                        React.createElement(EasyDate, { date: date })), right: React.createElement("small", null, tv(status, function (v) { return v.name; })) }),
                React.createElement(LMR, { left: React.createElement("small", null, tv(task, function (v) { return tv(v.biz, function (vs) { return vs.description; }); })), right: React.createElement("small", null, tv(task, function (v) { return tv(v.type, function (vs) { return vs.description; }); })) }));
        };
        //选择任务
        _this.onSalesTaskClick = function (param) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var tasks, task;
            return tslib_1.__generator(this, function (_a) {
                tasks = param.task.obj;
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
                this.controller.showTaskDetailEdit(task);
                return [2 /*return*/];
            });
        }); };
        _this.page = observer(function (tasks) {
            var none = React.createElement("div", { className: "m-3 text-muted small" }, "\u3010\u65E0\u8BB0\u5F55\u3011");
            return React.createElement(Page, { header: "\u4EA4\u6D41\u8BB0\u5F55" },
                React.createElement(List, { before: '', none: none, items: tasks.tasks, item: { render: _this.renderHistory, onClick: _this.onSalesTaskClick } }));
        });
        return _this;
    }
    VCustomerHistory.prototype.open = function (tasks) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, tasks);
                return [2 /*return*/];
            });
        });
    };
    return VCustomerHistory;
}(VPage));
export { VCustomerHistory };
//# sourceMappingURL=VCustomerHistory.js.map