import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Form, LMR, FA } from 'tonva';
import { observer } from 'mobx-react';
var VFinish = /** @class */ (function (_super) {
    tslib_1.__extends(VFinish, _super);
    function VFinish() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function (param) {
            return _this.render(param);
        });
        _this.onCompletionTask = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.form)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.form.buttonClick("submit")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onFormButtonClick = function (name, context) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var completSchema, fieldValues;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        completSchema = this.controller.taskCommonType.completSchema;
                        fieldValues = completSchema.map(function (v, index) {
                            var name = v.name;
                            return {
                                fieldName: name,
                                value: context.form.data[name]
                            };
                        });
                        this.task.fields = fieldValues;
                        return [4 /*yield*/, this.controller.cSalesTask.finishTask(this.task)];
                    case 1:
                        _a.sent();
                        this.closePage(2);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onCreateProduct = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.showPorductSelect(this.task)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    VFinish.prototype.open = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task = task;
                this.openPage(this.page, task);
                return [2 /*return*/];
            });
        });
    };
    VFinish.prototype.render = function (task) {
        var _this = this;
        this.task = task;
        var _a = this.controller.taskCommonType, completSchema = _a.completSchema, completuiSchema = _a.completuiSchema;
        var showProductDetail = this.controller.cSalesTask.showProductDetail;
        var onShowProduct = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showProductDetail(this.task)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        var cssLMR = "bg-white row my-1 py-2";
        return React.createElement("div", { className: "mx-3" },
            React.createElement(LMR, { className: cssLMR, right: React.createElement("div", { onClick: this.onCreateProduct, className: "mr-3" },
                    React.createElement(FA, { name: "plus" })) },
                React.createElement("div", { className: "w-100 ml-3", onClick: onShowProduct },
                    "\u4EA7\u54C1\u5217\u8868 ",
                    React.createElement("span", { className: "fa-stack" }, "4"))),
            React.createElement(LMR, { className: cssLMR, right: React.createElement("div", { onClick: this.onCreateProduct, className: "mr-3" },
                    React.createElement(FA, { name: "plus" })) },
                React.createElement("div", { className: "w-100 ml-3" },
                    "\u5305\u88C5\u5217\u8868 ",
                    React.createElement("span", { className: "fa-stack" }, "4"))),
            React.createElement(LMR, { className: cssLMR, right: React.createElement("div", { onClick: this.onCreateProduct, className: "mr-3" },
                    React.createElement(FA, { name: "plus" })) },
                React.createElement("div", { className: "w-100 ml-3" },
                    "\u9879\u76EE\u5217\u8868 ",
                    React.createElement("span", { className: "fa-stack" }, "4"))),
            React.createElement(Form, { ref: function (v) { return _this.form = v; }, schema: completSchema, uiSchema: completuiSchema, onButtonClick: this.onFormButtonClick, requiredFlag: false }),
            React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: this.onCompletionTask }, "\u5B8C\u7ED3"));
    };
    return VFinish;
}(VPage));
export { VFinish };
//# sourceMappingURL=VFinish.js.map