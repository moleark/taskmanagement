import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, LMR, List, FA, tv } from 'tonva';
var VSelectBiz = /** @class */ (function (_super) {
    tslib_1.__extends(VSelectBiz, _super);
    function VSelectBiz() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderItem = function (model, index) {
            var biz = model.biz, type = model.type;
            var left = React.createElement("div", { className: 'text-info mr-3' }, tv(type, function (obj) { return _this.controller.cSalesTask.getTaskIcon(biz.obj.name); }));
            return React.createElement(LMR, { className: "px-3 py-2", left: left },
                React.createElement("div", { className: "font-weight-bold" }, tv(biz, function (obj) { return obj.description; })));
        };
        _this.onClickTaskBiz = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.selectTaskBiz(model)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.ai = function () {
            return null;
            return React.createElement(LMR, { className: "p-3 bg-white mb-1 cursor-pointer", left: React.createElement(FA, { className: "text-success mr-3 mt-1", name: "android", size: "lg", fixWidth: true }), onClick: _this.controller.aiClick },
                React.createElement("div", { className: "font-weight-bold" }, "\u5E2E\u6211\u627E\u627E\u673A\u4F1A"));
        };
        _this.page = function () {
            var _a = _this.controller, taskType = _a.taskType, taskBizs = _a.taskBizs;
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u6B63\u5728\u7B79\u5907\u4E2D");
            return React.createElement(Page, { header: taskType.description || taskType.name, headerClassName: 'bg-primary' },
                _this.ai(),
                React.createElement(List, { none: none, items: taskBizs.ret, item: { render: _this.renderItem, onClick: _this.onClickTaskBiz } }));
        };
        return _this;
    }
    VSelectBiz.prototype.open = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page);
                return [2 /*return*/];
            });
        });
    };
    return VSelectBiz;
}(VPage));
export { VSelectBiz };
//# sourceMappingURL=VSelectBiz.js.map