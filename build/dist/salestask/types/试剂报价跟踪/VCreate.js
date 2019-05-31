import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form } from 'tonva';
import { observer } from 'mobx-react';
var schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'customer', type: 'id', required: false },
    { name: 'type', type: 'id', required: false },
    { name: 'description', type: 'string', required: false },
    { name: 'priorty', type: 'number', required: false },
    { name: 'deadline', type: 'string', required: false },
];
var VCreate = /** @class */ (function (_super) {
    tslib_1.__extends(VCreate, _super);
    function VCreate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uiSchema = {
            items: {
                id: { visible: false },
                customer: { visible: false },
                type: { visible: false },
                description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' },
                priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' },
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
                    case 0: return [4 /*yield*/, this.controller.cSalesTask.createTask(context.form.data, this.task)];
                    case 1:
                        _a.sent();
                        this.closePage(1);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (param) {
            var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: _this.onAddSalesTask }, "\u4FDD\u5B58");
            return React.createElement(Page, { header: _this.controller.caption, footer: footer, headerClassName: 'bg-primary' },
                React.createElement("div", { className: "App-container container text-left" },
                    _this.controller.renderCreateTop(param),
                    React.createElement(Form, { ref: function (v) { return _this.form = v; }, className: "my-3", schema: schema, uiSchema: _this.uiSchema, onButtonClick: _this.onFormButtonClick, requiredFlag: false })));
        });
        return _this;
    }
    VCreate.prototype.open = function (salestask) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task = salestask;
                this.openPage(this.page, salestask);
                return [2 /*return*/];
            });
        });
    };
    return VCreate;
}(VPage));
export { VCreate };
//# sourceMappingURL=VCreate.js.map