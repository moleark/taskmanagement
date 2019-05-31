import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form } from 'tonva';
import { observer } from 'mobx-react';
var VCreate = /** @class */ (function (_super) {
    tslib_1.__extends(VCreate, _super);
    function VCreate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
            var _a, description, priorty, deadline;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = context.form.data, description = _a.description, priorty = _a.priorty, deadline = _a.deadline;
                        this.task.description = description;
                        this.task.priorty = priorty;
                        this.task.deadline = deadline;
                        return [4 /*yield*/, this.controller.cSalesTask.createTask(context.form.data, this.task)];
                    case 1:
                        _b.sent();
                        this.closePage(5);
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
                this.task = task;
                this.openPage(this.page, task);
                return [2 /*return*/];
            });
        });
    };
    VCreate.prototype.render = function (param) {
        var _this = this;
        var _a = this.controller.taskCommonType, schema = _a.schema, uiSchema = _a.uiSchema;
        var footer = React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: this.onAddSalesTask }, "\u4FDD\u5B58");
        return React.createElement(Page, { header: this.controller.caption, footer: footer, headerClassName: 'bg-primary' },
            React.createElement("div", { className: "App-container container text-left" },
                this.controller.renderCreateTop(param),
                React.createElement(Form, { ref: function (v) { return _this.form = v; }, className: "my-3", schema: schema, uiSchema: uiSchema, onButtonClick: this.onFormButtonClick, requiredFlag: false })));
    };
    return VCreate;
}(VPage));
export { VCreate };
//# sourceMappingURL=VCreate.js.map