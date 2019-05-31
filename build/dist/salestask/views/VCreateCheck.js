import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, LMR, FA, tv, PropGrid } from 'tonva';
import { observer } from 'mobx-react';
var VCreateCheck = /** @class */ (function (_super) {
    tslib_1.__extends(VCreateCheck, _super);
    function VCreateCheck() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAddTask = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task.description = undefined;
                this.task.deadline = undefined;
                this.controller.getCTaskType(this.task.bizName).showCreate(this.task);
                return [2 /*return*/];
            });
        }); };
        _this.onFinishTask = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.task.priorty = 0;
                        return [4 /*yield*/, this.controller.createAndFinishTask(this.task)];
                    case 1:
                        _a.sent();
                        this.closePage();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (param) {
            return _this.render(param);
        });
        _this.itemss = "cursor-pointer my-2 w-100";
        return _this;
    }
    VCreateCheck.prototype.open = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task = task;
                this.openPage(this.page, task);
                return [2 /*return*/];
            });
        });
    };
    VCreateCheck.prototype.render = function (task) {
        var _this = this;
        var showCustomerDetail = this.controller.cApp.cSalesTask.showCustomerDetail;
        var customer = task.customer, type = task.type, biz = task.biz;
        var onClickCustoemr = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showCustomerDetail(customer.id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        var rows = [
            {
                type: 'component',
                name: 'customer',
                component: React.createElement(LMR, { className: this.itemss, onClick: onClickCustoemr, left: React.createElement("div", null,
                        " ",
                        React.createElement(FA, { name: "user", className: "text-info mr-2 pt-1 " }),
                        " "), right: React.createElement("div", { className: "text-right" },
                        React.createElement("i", { className: "fa fa-chevron-right" })) }, tv(customer, function (v) { return React.createElement(React.Fragment, null, v.name); })),
            },
            {
                type: 'component',
                name: 'type',
                component: React.createElement(LMR, { className: this.itemss, onClick: onClickCustoemr, left: React.createElement("div", null,
                        " ",
                        React.createElement(FA, { name: "circle", className: "text-info mr-2 pt-1" }),
                        " ") }, tv(type, function (v) { return React.createElement(React.Fragment, null, v.description); })),
            },
        ];
        var footer = React.createElement("div", { className: "d-flex px-1" },
            React.createElement("div", { className: "flex-grow-1 align-self-center justify-content-start" },
                React.createElement("button", { type: "button", className: "btn btn-primary", onClick: this.onAddTask }, "\u00A0\u65B0\u5EFA\u00A0")),
            React.createElement("button", { type: "button", className: "btn btn-outline-info ml-2 align-self-center", onClick: this.onFinishTask }, "\u5904\u7406"));
        var header = React.createElement("div", null,
            this.task.description,
            "\u00A0");
        return React.createElement(Page, { header: header, footer: footer, headerClassName: 'bg-primary' },
            React.createElement(PropGrid, { className: "my-2", rows: rows, values: task }));
    };
    return VCreateCheck;
}(VPage));
export { VCreateCheck };
//# sourceMappingURL=VCreateCheck.js.map