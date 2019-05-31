import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, PropGrid, FA } from 'tonva';
var VCustomerDetail = /** @class */ (function (_super) {
    tslib_1.__extends(VCustomerDetail, _super);
    function VCustomerDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function (customer) {
            var cSalesTask = _this.controller.cApp.cSalesTask;
            var showCustomerHistory = cSalesTask.showCustomerHistory;
            var onshowCustomerHistory = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showCustomerHistory(customer.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            var rows = [
                {
                    type: 'component',
                    name: 'customer',
                    component: React.createElement(LMR, { className: "cursor-pointer w-100 py-3", left: React.createElement("div", null,
                            " ",
                            React.createElement("small", null,
                                React.createElement(FA, { name: 'university', className: 'text-info' })),
                            " \u00A0\u5317\u4EAC\u5927\u5B66"), right: React.createElement("div", { className: "w-2c text-right" },
                            " ",
                            React.createElement("i", { className: "fa fa-chevron-right" })) }),
                },
                {
                    type: 'component',
                    name: 'customer',
                    component: React.createElement(LMR, { className: "cursor-pointer w-100 py-3", onClick: onshowCustomerHistory, left: React.createElement("div", null,
                            " ",
                            React.createElement("small", null,
                                React.createElement(FA, { name: 'hand-o-right', className: 'text-info' })),
                            " \u00A0\u6C9F\u901A\u8BB0\u5F55"), right: React.createElement("div", { className: "w-2c text-right" },
                            " ",
                            React.createElement("i", { className: "fa fa-chevron-right" })) }),
                },
                {
                    type: 'string',
                    name: 'no',
                    label: '编号',
                    vAlign: "center",
                },
                {
                    type: 'string',
                    name: 'name',
                    label: '姓名',
                    vAlign: "stretch",
                },
                {
                    type: 'string',
                    name: 'gender',
                    label: '性别',
                    vAlign: "stretch"
                },
                {
                    type: 'string',
                    name: 'birthday',
                    label: '生日'
                },
                {
                    type: 'string',
                    name: 'birthday',
                    label: '领域',
                    vAlign: 'center'
                },
                {
                    type: 'string',
                    name: 'birthday',
                    label: 'TOP单位',
                    vAlign: "stretch",
                }
            ];
            return React.createElement(Page, { header: "\u5BA2\u6237\u8BE6\u60C5" },
                React.createElement(PropGrid, { className: "my-2", rows: rows, values: customer, alignValue: "right" }));
        });
        return _this;
    }
    VCustomerDetail.prototype.open = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, customer);
                return [2 /*return*/];
            });
        });
    };
    return VCustomerDetail;
}(VPage));
export { VCustomerDetail };
//# sourceMappingURL=VCustomerDetail.js.map