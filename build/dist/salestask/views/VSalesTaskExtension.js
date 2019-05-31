import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form, Widget } from 'tonva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
var schema = [
    { name: 'resulttype', type: 'string', required: false },
    { name: 'date', type: 'string', required: true },
    { name: 'result', type: 'string', required: false },
];
var SomeDay = /** @class */ (function (_super) {
    tslib_1.__extends(SomeDay, _super);
    function SomeDay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateVisible = false;
        _this.list = [{ value: 1, title: '明天' }, { value: 2, title: '后天' }];
        _this.onChange = function (evt) {
            var val = evt.currentTarget.value;
            _this.dateVisible = val === '0';
            var day2 = new Date();
            if (val === '1') {
                day2.setDate(day2.getDate() + 1);
                _this.setValue(new Date(evt.currentTarget.value));
            }
            else if (val === '2') {
                day2.setDate(day2.getDate() + 2);
                _this.setValue(day2);
            }
        };
        _this.onDateChange = function (evt) {
            _this.setValue(evt.currentTarget.value);
        };
        _this.render = function () {
            return React.createElement("div", { className: "form-control", style: { height: 'auto' } },
                _this.list.map(function (v, index) {
                    return React.createElement("label", { className: "my-1" },
                        React.createElement("input", { type: "radio", value: v.value, name: "a", onChange: _this.onChange }),
                        " ",
                        v.title,
                        " \u00A0 ");
                }),
                React.createElement("div", null,
                    React.createElement("label", { className: "my-1" },
                        React.createElement("input", { type: "radio", value: 0, name: "a", onChange: _this.onChange }),
                        " \u65E5\u671F \u00A0 "),
                    _this.dateVisible && React.createElement("input", { type: "date", defaultValue: (new Date).toDateString(), onChange: _this.onDateChange })));
        };
        return _this;
    }
    tslib_1.__decorate([
        observable
    ], SomeDay.prototype, "dateVisible", void 0);
    return SomeDay;
}(Widget));
var VSalesTaskExtension = /** @class */ (function (_super) {
    tslib_1.__extends(VSalesTaskExtension, _super);
    function VSalesTaskExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uiSchema = {
            items: {
                resulttype: { visible: false },
                date: {
                    widget: 'custom',
                    label: '提醒日期',
                    WidgetClass: SomeDay,
                },
                result: { widget: 'textarea', label: '备注', placeholder: '请输入处理结果！', rows: 12 },
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
                        return [4 /*yield*/, this.controller.extensionTask(this.task, result, resulttype, date)];
                    case 1:
                        _b.sent();
                        this.closePage(2);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (product) {
            var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: _this.onExtensionTask }, "\u63A8\u8FDF");
            return React.createElement(Page, { header: "\u63A8\u8FDF", footer: footer, headerClassName: 'bg-primary' },
                React.createElement("div", { className: "App-container container text-left" },
                    React.createElement(Form, { ref: function (v) { return _this.form = v; }, className: "my-3", schema: schema, uiSchema: _this.uiSchema, onButtonClick: _this.onFormButtonClick })));
        });
        return _this;
    }
    VSalesTaskExtension.prototype.open = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task = task;
                this.openPage(this.page, task);
                return [2 /*return*/];
            });
        });
    };
    return VSalesTaskExtension;
}(VPage));
export { VSalesTaskExtension };
//# sourceMappingURL=VSalesTaskExtension.js.map