import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
var VSalesTaskHistory = /** @class */ (function (_super) {
    tslib_1.__extends(VSalesTaskHistory, _super);
    function VSalesTaskHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function (task) {
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u62B1\u6B49\uFF0C\u672A\u627E\u5230\u76F8\u5173\u8BB0\u5F55\uFF01");
            return React.createElement(Page, { header: "\u5BA2\u6237\u6C9F\u901A\u8BB0\u5F55" },
                React.createElement(List, { before: '', none: none, items: _this.salestask, item: { render: _this.renderSalesTask } }));
        });
        return _this;
    }
    VSalesTaskHistory.prototype.open = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.salestask = task;
                this.openPage(this.page, task);
                return [2 /*return*/];
            });
        });
    };
    VSalesTaskHistory.prototype.renderSalesTask = function (salesTask, index) {
        var description = salesTask.description, deadline = salesTask.deadline, DATE = salesTask.DATE, result = salesTask.result, type = salesTask.type;
        var right = React.createElement("div", { className: "text-right" },
            React.createElement("div", null,
                React.createElement("small", { className: "text-muted" },
                    "\u9884\u5B9A\uFF1A",
                    React.createElement(EasyDate, { date: deadline }))),
            React.createElement("div", null,
                React.createElement("small", { className: "text-muted" },
                    "\u5B8C\u6210\uFF1A",
                    React.createElement(EasyDate, { date: DATE }))));
        return React.createElement(LMR, { className: "px-3 py-2", right: right },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm-4" }, tv(type, function (v) { return React.createElement(React.Fragment, null, v.name); })),
                React.createElement("div", { className: "col-sm-8 font-weight-bold" }, result)),
            React.createElement("div", null, description));
    };
    return VSalesTaskHistory;
}(VPage));
export { VSalesTaskHistory };
//# sourceMappingURL=VSalesTaskHistory.js.map