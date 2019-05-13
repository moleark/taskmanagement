import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form } from 'tonva-tools';
import { observer } from 'mobx-react';
var schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'customer', type: 'id', required: true },
    { name: 'type', type: 'id', required: true },
    { name: 'description', type: 'string', required: true },
    { name: 'priorty', type: 'number', required: true },
    { name: 'deadline', type: 'string', required: true },
];
var VSalesTaskAdd = /** @class */ (function (_super) {
    tslib_1.__extends(VSalesTaskAdd, _super);
    function VSalesTaskAdd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uiSchema = {
            items: {
                id: { visible: false },
                customer: {
                    widget: 'id', label: '客户', placeholder: '请选择客户',
                    pickId: function (context, name, value) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.controller.pickCustomer(context, name, value)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                    Templet: function (item) {
                        var obj = item.obj;
                        if (!obj)
                            return React.createElement("small", { className: "text-muted" }, "\u8BF7\u9009\u62E9\u5BA2\u6237");
                        var id = obj.id, name = obj.name;
                        return React.createElement(React.Fragment, null, name);
                    }
                },
                type: {
                    widget: 'id', label: '类型', placeholder: '请选择任务类型',
                    pickId: function (context, name, value) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.controller.pickTaskType(context, name, value)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                    Templet: function (item) {
                        var obj = item.obj;
                        if (!obj)
                            return React.createElement("small", { className: "text-muted" }, "\u8BF7\u9009\u62E9\u4EFB\u52A1\u7C7B\u578B");
                        var id = obj.id, name = obj.name;
                        return React.createElement(React.Fragment, null, name);
                    }
                },
                description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' },
                priorty: { widget: 'text', label: '重要性', placeholder: '重要性' },
                deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' },
                submit: { widget: 'button', label: '提交', },
            }
        };
        _this.onAddSalesTask = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.addSalesTask(context.form.data)];
                    case 1:
                        _a.sent();
                        this.closePage(1);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (product) {
            var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: _this.onAddSalesTask }, "\u4FDD\u5B58");
            return React.createElement(Page, { header: "\u6DFB\u52A0\u4EFB\u52A1", footer: footer },
                React.createElement("div", { className: "App-container container text-left" },
                    React.createElement(Form, { ref: function (v) { return _this.form = v; }, className: "my-3", schema: schema, uiSchema: _this.uiSchema, onButtonClick: _this.onFormButtonClick, fieldLabelSize: 3 })));
        });
        return _this;
    }
    VSalesTaskAdd.prototype.open = function (salestask) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, salestask);
                return [2 /*return*/];
            });
        });
    };
    return VSalesTaskAdd;
}(VPage));
export { VSalesTaskAdd };
//# sourceMappingURL=VSalesTaskAdd.js.map