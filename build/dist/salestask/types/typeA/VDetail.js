import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { LMR, EasyDate, PropGrid } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';
var VDetail = /** @class */ (function (_super) {
    tslib_1.__extends(VDetail, _super);
    function VDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function (task) {
            var _a = _this.controller.cSalesTask, showSalesTaskComplet = _a.showSalesTaskComplet, showSalesTaskExtension = _a.showSalesTaskExtension, onInvalidTask = _a.onInvalidTask, showCustomerDetail = _a.showCustomerDetail, showSalesTaskHistory = _a.showSalesTaskHistory;
            var type = task.type, customer = task.customer, deadline = task.deadline;
            var onProcess = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showSalesTaskComplet(task)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            var onPostpond = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showSalesTaskExtension(task)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            var onInvalidTaskClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, onInvalidTask(task)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            var onClickCustoemr = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showCustomerDetail(customer.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            var onShowSalesTaskHistory = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showSalesTaskHistory(customer.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            var rows = [
                {
                    type: 'component',
                    name: 'customer',
                    component: React.createElement(LMR, { className: "cursor-pointer w-100", onClick: onClickCustoemr, right: React.createElement("div", { className: "w-2c text-right" },
                            React.createElement("i", { className: "fa fa-chevron-right" })) }, tv(customer, function (v) { return React.createElement(React.Fragment, null, v.name); })),
                    label: '客户',
                },
                {
                    type: 'component',
                    name: 'type',
                    component: React.createElement(LMR, { className: "cursor-pointer w-100" }, tv(type, function (v) { return React.createElement(React.Fragment, null, v.name); })),
                    label: '类型',
                },
                {
                    type: 'string',
                    name: 'description',
                    label: '内容'
                },
                {
                    type: 'string',
                    name: 'priorty',
                    label: '重要性'
                },
                {
                    type: 'component',
                    name: 'deadline',
                    component: React.createElement(EasyDate, { date: deadline }),
                    label: '要求完成日期',
                },
                {
                    type: 'component',
                    name: 'customer',
                    component: React.createElement(LMR, { className: "cursor-pointer w-100", onClick: onShowSalesTaskHistory, right: React.createElement("div", { className: "w-2c text-right" },
                            React.createElement("i", { className: "fa fa-chevron-right" })) }),
                    label: '交流记录',
                },
            ];
            var buttons = React.createElement("span", null,
                React.createElement("button", { type: "button", className: "btn btn-primary px-5", onClick: onProcess }, "\u5904\u7406"));
            var rightButton = React.createElement("span", null,
                React.createElement("button", { type: "button", className: "btn btn-outline-info ml-3", onClick: onPostpond }, "\u63A8\u8FDF"),
                React.createElement("button", { type: "button", className: "btn btn-outline-info ml-3", onClick: onInvalidTaskClick }, "\u62D2\u7EDD"));
            var footer = React.createElement(LMR, { className: "px-1", left: buttons, right: rightButton });
            return React.createElement(Page, { header: "\u4EFB\u52A1\u8BE6\u60C5", footer: footer },
                React.createElement(PropGrid, { rows: rows, values: task }));
        });
        return _this;
    }
    VDetail.prototype.open = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var model;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.cSalesTask.lodeSalesTaskDetail(task.id)];
                    case 1:
                        model = _a.sent();
                        this.openPage(this.page, model);
                        return [2 /*return*/];
                }
            });
        });
    };
    return VDetail;
}(VPage));
export { VDetail };
//# sourceMappingURL=VDetail.js.map