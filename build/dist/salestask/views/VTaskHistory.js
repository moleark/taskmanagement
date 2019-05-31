import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, nav } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate } from 'tonva';
import { tv } from 'tonva';
var VTaskHistory = /** @class */ (function (_super) {
    tslib_1.__extends(VTaskHistory, _super);
    function VTaskHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderHistory = function (taskhistory, index) {
            var date = taskhistory.date, status = taskhistory.status, principal = taskhistory.principal, result = taskhistory.result;
            var right = React.createElement("small", { className: "text-muted" },
                principal.id !== nav.user.id && React.createElement("span", { className: "text-muted small" }),
                tv(status, function (v) { return v.name; }),
                " ");
            return React.createElement("div", { className: "d-block p-3" },
                React.createElement(LMR, { left: React.createElement("small", { className: "text-muted" },
                        React.createElement(EasyDate, { date: date }),
                        " "), right: React.createElement("small", { className: "text-muted" }, right) }),
                React.createElement("div", null, result));
        };
        _this.page = observer(function (tasks) {
            var none = React.createElement("div", { className: "m-3 text-muted small" }, "\u3010\u672A\u5904\u7406\u3011");
            return React.createElement(Page, { header: "\u5904\u7406\u8BE6\u60C5" },
                React.createElement(List, { before: '', none: none, items: tasks.tasks, item: { render: _this.renderHistory } }));
        });
        return _this;
    }
    VTaskHistory.prototype.open = function (tasks) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, tasks);
                return [2 /*return*/];
            });
        });
    };
    return VTaskHistory;
}(VPage));
export { VTaskHistory };
//# sourceMappingURL=VTaskHistory.js.map