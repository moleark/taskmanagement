import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form } from 'tonva-tools';
import { observer } from 'mobx-react';
var schema = [
    { name: 'resulttype', type: 'string', required: false },
    { name: 'result', type: 'string', required: true },
    { name: 'date', type: 'date', required: true },
];
var VSalesTaskExtension = /** @class */ (function (_super) {
    tslib_1.__extends(VSalesTaskExtension, _super);
    function VSalesTaskExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uiSchema = {
            items: {
                resulttype: { visible: false },
                result: { widget: 'textarea', label: '结果', placeholder: '请输入处理结果！', rows: 12 },
                date: { widget: 'date', label: '日期', placeholder: '请输入日期！' },
                submit: { widget: 'button', label: '提交', },
            }
        };
        _this.onExtensionTask = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
            var _a, result, resulttype, date;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = context.form.data, result = _a.result, resulttype = _a.resulttype, date = _a.date;
                        return [4 /*yield*/, this.controller.extensionTask(this.taskid, result, resulttype, date)];
                    case 1:
                        _b.sent();
                        this.closePage(2);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (product) {
            var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: _this.onExtensionTask }, "\u5B8C\u7ED3");
            return React.createElement(Page, { header: "\u5EF6\u671F\u4EFB\u52A1", footer: footer },
                React.createElement("div", { className: "App-container container text-left" },
                    React.createElement(Form, { ref: function (v) { return _this.form = v; }, className: "my-3", schema: schema, uiSchema: _this.uiSchema, onButtonClick: _this.onFormButtonClick })));
        });
        return _this;
    }
    VSalesTaskExtension.prototype.open = function (salestask) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.taskid = salestask.id;
                this.openPage(this.page, salestask);
                return [2 /*return*/];
            });
        });
    };
    return VSalesTaskExtension;
}(VPage));
export { VSalesTaskExtension };
//# sourceMappingURL=VSalesTaskExtension.js.map