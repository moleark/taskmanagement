import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { VPage, Page } from 'tonva';
import { List, LMR, EasyDate, FA } from 'tonva';
import { observer } from 'mobx-react';
import { tv } from 'tonva';
var VMain = /** @class */ (function (_super) {
    tslib_1.__extends(VMain, _super);
    function VMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onScrollBottom = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        //选择任务
        _this.onSalesTaskClick = function (param) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var task;
            return tslib_1.__generator(this, function (_a) {
                task = {
                    id: param.id,
                    type: param.type,
                    typeName: param.typeName,
                    biz: param.biz,
                    bizName: param.bizName,
                    description: null,
                    remindDate: null,
                    deadline: null,
                    customer: param.customer
                };
                this.controller.showTaskDetailEdit(task);
                return [2 /*return*/];
            });
        }); };
        //添加任务
        _this.onSalesTaskAdd = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.showSelectTaskType()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.renderSalesTask = function (salesTask, index) {
            var bizName = salesTask.bizName, deadline = salesTask.deadline, biz = salesTask.biz, customer = salesTask.customer, type = salesTask.type, typeName = salesTask.typeName, priorty = salesTask.priorty;
            var cnFlag = classNames({
                'my-1 mr-3': true,
                'text-danger': priorty > 0,
                'text-info': !(priorty > 0)
            });
            var left = React.createElement("div", { className: cnFlag }, _this.controller.getTaskIcon(bizName));
            var right = React.createElement("div", { className: "text-right" }, deadline && React.createElement("small", { className: "text-muted" },
                "\u65F6\u9650\uFF1A",
                React.createElement(EasyDate, { date: deadline })));
            return React.createElement(LMR, { className: "px-3 py-2", left: left },
                React.createElement(LMR, { className: "", right: right },
                    React.createElement("div", { className: "font-weight-bold" }, tv(customer, function (v) { return React.createElement(React.Fragment, null, v.name); }))),
                React.createElement(LMR, { className: "", right: React.createElement("div", { className: "text-muted" },
                        React.createElement("small", null, tv(type, function (v) { return React.createElement(React.Fragment, null, v.description); }))) },
                    React.createElement("div", { className: "text-muted" },
                        React.createElement("small", null, tv(biz, function (v) { return React.createElement(React.Fragment, null, v.description); })))));
        };
        _this.page = observer(function () {
            var tasks = _this.controller.tasks;
            if (tasks === undefined)
                return null;
            var none = React.createElement("div", { className: "my-3 mx-2 text-muted" }, "\u65E0\u4EFB\u52A1");
            var add = React.createElement("div", { onClick: _this.onSalesTaskAdd, className: "cursor-pointer px-3" },
                React.createElement(FA, { name: "plus" }));
            var item = { render: _this.renderSalesTask, onClick: _this.onSalesTaskClick };
            var tasksNow = tasks.tasksNow, dateTasksList = tasks.dateTasksList;
            return React.createElement(Page, { header: "\u9500\u552E\u52A9\u624B", onScrollBottom: _this.onScrollBottom, right: add, headerClassName: "bg-primary py-1" },
                tasksNow.length > 0 && React.createElement(List, { before: '', none: none, items: tasksNow, item: item }),
                dateTasksList.map(function (v, index) {
                    var date = v.date, list = v.list;
                    if (list.length === 0)
                        return null;
                    return React.createElement(React.Fragment, { key: index },
                        React.createElement("div", { className: "small text-muted pt-3 px-3 pb-2 text-center" },
                            React.createElement(EasyDate, { date: date })),
                        React.createElement(List, { before: '', none: none, items: list, item: item }));
                }));
        });
        return _this;
    }
    VMain.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VMain.prototype.render = function (member) {
        return React.createElement(this.page, null);
    };
    return VMain;
}(VPage));
export { VMain };
//# sourceMappingURL=VMain.js.map