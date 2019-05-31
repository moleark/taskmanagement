import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { View } from 'tonva';
import { PropGrid, LMR, FA, EasyDate } from 'tonva';
import { tv } from 'tonva';
var cnRow = 'w-100 py-3';
var cnRowCustor = classNames(cnRow, 'cursor-pointer');
var right = React.createElement("div", { className: "w-2c text-right" },
    React.createElement("i", { className: "fa fa-chevron-right" }));
var VDetailTop = /** @class */ (function (_super) {
    tslib_1.__extends(VDetailTop, _super);
    function VDetailTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VDetailTop.prototype.render = function (task) {
        var _this = this;
        var _a = this.controller.cSalesTask, showCustomerDetail = _a.showCustomerDetail, showTaskHistory = _a.showTaskHistory;
        var type = task.type, customer = task.customer, description = task.description, deadline = task.deadline, id = task.id;
        var onShowSalesTaskHistory = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showTaskHistory(id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        var onClickCustomer = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showCustomerDetail(customer.id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        var rows = [
            {
                type: 'component',
                name: 'customer',
                component: React.createElement(LMR, { className: cnRowCustor, onClick: onClickCustomer, left: React.createElement("div", { className: "mr-2" },
                        " ",
                        React.createElement(FA, { name: "user", className: "text-info mr-2 pt-1" }),
                        " "), right: right }, tv(customer, function (v) { return React.createElement(React.Fragment, null, v.name); })),
            },
        ];
        if (deadline) {
            rows.push({
                type: 'component',
                name: 'deadline',
                component: React.createElement(LMR, { className: cnRow, left: React.createElement("div", { className: "mr-2" },
                        " ",
                        React.createElement(FA, { name: "clock-o", className: "text-info mr-2 pt-1 " }),
                        " ") }, React.createElement(EasyDate, { date: deadline })),
            });
        }
        rows.push({
            type: 'component',
            name: 'customer',
            component: React.createElement(LMR, { className: cnRowCustor, onClick: onShowSalesTaskHistory, left: React.createElement("span", null,
                    React.createElement(FA, { className: "text-warning", name: "hand-o-right" }),
                    " \u00A0 \u8BE6\u60C5"), right: right }),
        });
        if (description) {
            rows.push({
                type: 'component',
                name: 'description',
                component: React.createElement("div", { className: "w-100 py-3" }, description),
            });
        }
        return React.createElement(PropGrid, { className: "my-2", rows: rows, values: task });
    };
    return VDetailTop;
}(View));
export { VDetailTop };
//# sourceMappingURL=VDetailTop.js.map