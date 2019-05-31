import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva';
var VActionsBottom = /** @class */ (function (_super) {
    tslib_1.__extends(VActionsBottom, _super);
    function VActionsBottom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VActionsBottom.prototype.render = function (task) {
        var _this = this;
        var _a = this.controller.cSalesTask, showTaskComplet = _a.showTaskComplet, showTaskExtension = _a.showTaskExtension, showTaskInvalid = _a.showTaskInvalid;
        var tasks = {
            id: task.id,
            type: task.type,
            typeName: task.typeName,
            biz: task.biz,
            bizName: task.bizName,
            description: null,
            remindDate: null,
            deadline: null,
            customer: task.customer
        };
        var onProcess = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showTaskComplet(tasks)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        var onPostpond = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showTaskExtension(tasks)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        var onInvalid = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showTaskInvalid(tasks)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        return React.createElement("div", { className: "d-flex px-1" },
            React.createElement("div", { className: "flex-grow-1 align-self-center justify-content-start" },
                React.createElement("button", { type: "button", className: "btn btn-primary", onClick: onProcess }, "\u00A0\u5904\u7406\u00A0")),
            React.createElement("button", { type: "button", className: "btn btn-outline-info ml-2 align-self-center", onClick: onPostpond }, "\u63A8\u8FDF"),
            React.createElement("button", { type: "button", className: "btn btn-outline-info ml-2 align-self-center", onClick: onInvalid }, "\u53D6\u6D88"));
    };
    return VActionsBottom;
}(View));
export { VActionsBottom };
//# sourceMappingURL=VActionsBottom.js.map