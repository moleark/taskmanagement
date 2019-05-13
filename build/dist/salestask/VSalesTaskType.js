import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List } from 'tonva-react-form';
var VSalesTaskType = /** @class */ (function (_super) {
    tslib_1.__extends(VSalesTaskType, _super);
    function VSalesTaskType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickTaskType = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.selectTaskType(model.id)];
                    case 1:
                        _a.sent();
                        this.closePage();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (product) {
            var _a = _this.controller, tasktypelist = _a.tasktypelist, selectTaskType = _a.selectTaskType;
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u62B1\u6B49\uFF0C\u672A\u627E\u5230\u76F8\u5173\u4EA7\u54C1\uFF0C\u8BF7\u91CD\u65B0\u641C\u7D22\uFF01");
            return React.createElement(Page, { header: "\u9009\u62E9\u4EFB\u52A1\u7C7B\u578B" },
                React.createElement(List, { before: '', none: none, items: tasktypelist, item: { render: _this.renderList, onClick: _this.onClickTaskType } }));
        });
        return _this;
    }
    VSalesTaskType.prototype.open = function (salestask) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, salestask);
                return [2 /*return*/];
            });
        });
    };
    VSalesTaskType.prototype.renderList = function (model, index) {
        var description = model.description, name = model.name;
        var right = React.createElement("small", { className: "text-muted" }, description);
        return React.createElement(LMR, { className: "px-3 py-2", right: right },
            React.createElement("div", { className: "font-weight-bold" }, name));
    };
    return VSalesTaskType;
}(VPage));
export { VSalesTaskType };
//# sourceMappingURL=VSalesTaskType.js.map