import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { LMR, List, FA } from 'tonva';
var VSelectType = /** @class */ (function (_super) {
    tslib_1.__extends(VSelectType, _super);
    function VSelectType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderList = function (model, index) {
            var description = model.description, name = model.name;
            var left = React.createElement("div", { className: 'text-info mr-3' }, _this.controller.cSalesTask.getTaskIcon(name));
            return React.createElement(LMR, { className: "px-3 py-2", left: left },
                React.createElement("div", { className: "font-weight-bold" }, description));
        };
        _this.onClickTaskType = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.selectTaskType(model)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.ai = function () {
            return React.createElement(LMR, { className: "p-3 bg-white mb-1 cursor-pointer", left: React.createElement(FA, { className: "text-success mr-3 mt-1", name: "android", size: "lg", fixWidth: true }), onClick: _this.controller.aiClick },
                React.createElement("div", { className: "font-weight-bold" }, "\u5E2E\u6211\u627E\u627E\u673A\u4F1A"));
        };
        _this.page = (function (customer) {
            var tasktypelist = _this.controller.tasktypelist;
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u65E0\u4EFB\u52A1\u7C7B\u578B\uFF01");
            return React.createElement(Page, { header: "\u65B0\u5EFA\u4EFB\u52A1", headerClassName: 'bg-primary' },
                _this.ai(),
                React.createElement(List, { none: none, items: tasktypelist, item: { render: _this.renderList, onClick: _this.onClickTaskType } }));
        });
        return _this;
    }
    VSelectType.prototype.open = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, customer);
                return [2 /*return*/];
            });
        });
    };
    return VSelectType;
}(VPage));
export { VSelectType };
//# sourceMappingURL=VSelectType.js.map