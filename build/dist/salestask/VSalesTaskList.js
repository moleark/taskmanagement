import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { List, LMR, EasyDate, FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';
var VSalesTaskList = /** @class */ (function (_super) {
    tslib_1.__extends(VSalesTaskList, _super);
    function VSalesTaskList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onScrollBottom = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        //选择任务
        _this.onSalesTaskClick = function (salestask) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.controller.showSalesTaskDetail(salestask);
                return [2 /*return*/];
            });
        }); };
        //添加任务
        _this.onSalesTaskAdd = function (salestask) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.controller.showSalesTaskAdd(salestask);
                return [2 /*return*/];
            });
        }); };
        _this.page = observer(function () {
            var pageSalesTask = _this.controller.tasks;
            _this.tasklist = pageSalesTask;
            var none = React.createElement("div", { className: "my-3 mx-2 text-muted" }, "\u65E0\u4EFB\u52A1");
            var add = React.createElement("div", { onClick: _this.onSalesTaskAdd, className: "cursor-pointer px-3 py-1" },
                React.createElement(FA, { name: "plus" }));
            var header = React.createElement(LMR, { className: "pl-3 py-2 bg-primary text-white", right: add },
                React.createElement("div", { className: "d-flex h-100 align-items-center" }, "\u9500\u552E\u52A9\u624B"));
            var tasksss = [{ name: "今天" }, { name: "明天" }, { name: "一周" }];
            return React.createElement(Page, { header: header, onScrollBottom: _this.onScrollBottom },
                React.createElement(List, { before: '', none: none, items: _this.controller.tasks, item: { render: _this.renderSalesTask, onClick: _this.onSalesTaskClick } }));
        });
        return _this;
    }
    VSalesTaskList.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VSalesTaskList.prototype.render = function (member) {
        return React.createElement(this.page, null);
    };
    VSalesTaskList.prototype.renderSalesTask = function (salesTask, index) {
        var description = salesTask.description, deadline = salesTask.deadline, createTime = salesTask.createTime, customer = salesTask.customer, type = salesTask.type;
        var right = React.createElement("div", { className: "text-right" },
            React.createElement("div", null,
                React.createElement("small", { className: "text-muted" },
                    React.createElement(EasyDate, { date: deadline }))));
        return React.createElement(LMR, { className: "px-3 py-2", right: right },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm-8 font-weight-bold" }, tv(customer, function (v) { return React.createElement(React.Fragment, null, v.name); })),
                React.createElement("div", { className: "col-sm-4" }, tv(type, function (v) { return React.createElement(React.Fragment, null, v.name); }))),
            React.createElement("div", null, description));
    };
    return VSalesTaskList;
}(VPage));
export { VSalesTaskList };
//# sourceMappingURL=VSalesTaskList.js.map