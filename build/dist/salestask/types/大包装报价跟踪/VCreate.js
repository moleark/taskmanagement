import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form } from 'tonva';
import { observer } from 'mobx-react';
var schema = [
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
                    case 0: return [4 /*yield*/, this.controller.cSalesTask.createTask(context.form.data, this.salestask)];
                    case 1:
                        _a.sent();
                        this.closePage(1);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (param) {
            return _this.render(param);
        });
        return _this;
    }
    VCreate.prototype.open = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.salestask = task;
                this.openPage(this.page, task);
                return [2 /*return*/];
            });
        });
    };
    VCreate.prototype.render = function (param) {
        var _this = this;
        var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: this.onAddSalesTask }, "\u4FDD\u5B58");
        return React.createElement(Page, { header: this.controller.caption, footer: footer, headerClassName: 'bg-primary' },
            React.createElement("div", { className: "App-container container text-left" },
                this.controller.renderCreateTop(param),
                React.createElement(Form, { ref: function (v) { return _this.form = v; }, className: "my-3", schema: schema, uiSchema: this.uiSchema, onButtonClick: this.onFormButtonClick, requiredFlag: false })));
    };
    return VCreate;
}(VPage));
export { VCreate };
//# sourceMappingURL=VCreate.js.map