import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva';
import { PropGrid, LMR, FA } from 'tonva';
import { tv } from 'tonva';
var VCreateTop = /** @class */ (function (_super) {
    tslib_1.__extends(VCreateTop, _super);
    function VCreateTop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemss = "cursor-pointer my-2 w-100";
        return _this;
    }
    VCreateTop.prototype.render = function (task) {
        var _this = this;
        var showCustomerDetail = this.controller.cSalesTask.showCustomerDetail;
        var customer = task.customer;
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
        ];
        return React.createElement(PropGrid, { className: "my-2", rows: rows, values: task });
    };
    return VCreateTop;
}(View));
export { VCreateTop };
//# sourceMappingURL=VCreateTop.js.map