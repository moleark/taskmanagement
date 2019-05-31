import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, nav } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, PropGrid, FA } from 'tonva';
function rowCom(iconName, iconColor, caption, onClick) {
    return React.createElement(LMR, { className: "cursor-pointer w-100 py-3 align-items-center", onClick: onClick, left: React.createElement(FA, { name: iconName, className: 'mr-3 ' + iconColor, fixWidth: true, size: "lg" }), right: React.createElement("div", { className: "w-2c text-right" },
            " ",
            React.createElement("i", { className: "fa fa-chevron-right" })) }, caption);
}
var VMe = /** @class */ (function (_super) {
    tslib_1.__extends(VMe, _super);
    function VMe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logout = function () {
            nav.showLogout();
        };
        _this.page = observer(function (customer) {
            var cSalesTask = _this.controller.cApp.cSalesTask;
            var showEmployeeHistory = cSalesTask.showEmployeeHistory;
            var onshowEmployeeHistory = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showEmployeeHistory()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            var rows = [
                {
                    type: 'component',
                    name: 'customer',
                    component: rowCom('tag', 'text-info', '已完成任务', onshowEmployeeHistory),
                },
                {
                    type: 'component',
                    name: 'customer',
                    component: rowCom('line-chart', 'text-danger', '销量', undefined),
                },
            ];
            var right = React.createElement("div", { className: 'mr-3' },
                React.createElement(FA, { name: 'bars' }));
            var footer = React.createElement("button", { type: "button", className: "btn btn-danger w-100", onClick: _this.logout }, "\u9000\u51FA");
            return React.createElement(Page, { header: '\u6211\u7684', footer: footer, headerClassName: 'bg-primary py-1 px-3' },
                React.createElement(PropGrid, { className: "my-2", rows: rows, values: customer, alignValue: "right" }));
        });
        return _this;
    }
    VMe.prototype.open = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, customer);
                return [2 /*return*/];
            });
        });
    };
    VMe.prototype.render = function (member) {
        return React.createElement(this.page, null);
    };
    return VMe;
}(VPage));
export { VMe };
//# sourceMappingURL=VMe.js.map