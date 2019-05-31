import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
var VCreateEnd = /** @class */ (function (_super) {
    tslib_1.__extends(VCreateEnd, _super);
    function VCreateEnd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAddSalesTask = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        _this.page = observer(function (param) {
            return _this.render(param);
        });
        return _this;
    }
    VCreateEnd.prototype.open = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task = task;
                this.openPage(this.page, task);
                return [2 /*return*/];
            });
        });
    };
    VCreateEnd.prototype.render = function (param) {
        var _a = this.controller.taskCommonType, schema = _a.schema, uiSchema = _a.uiSchema;
        var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: this.onAddSalesTask }, "\u4FDD\u5B58");
        return React.createElement(Page, { header: this.controller.caption, footer: footer, headerClassName: 'bg-primary' },
            React.createElement("div", null, "\u4EFB\u52A1\u5DF2\u5B8C\u7ED3\uFF0C5\u79D2\u5185\u8FD4\u56DE\u4E3B\u9875\u9762"),
            React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: this.onAddSalesTask }, "\u8FD4\u56DE"));
    };
    return VCreateEnd;
}(VPage));
export { VCreateEnd };
//# sourceMappingURL=VFinishEnd.js.map