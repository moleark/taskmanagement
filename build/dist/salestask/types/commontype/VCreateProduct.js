import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, Form } from 'tonva';
import { observer } from 'mobx-react';
var schema = [
    { name: 'note', type: 'string', required: false },
];
var VCreateProduct = /** @class */ (function (_super) {
    tslib_1.__extends(VCreateProduct, _super);
    function VCreateProduct() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uiSchema = {
            items: {
                note: { widget: 'textarea', label: '备注', placeholder: '' },
                submit: { widget: 'button', label: '提交', },
            }
        };
        _this.page = observer(function (param) {
            return _this.render(param);
        });
        _this.onCreateTaskProduct = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                    case 0:
                        this.createproduct.note = context.data.note;
                        return [4 /*yield*/, this.controller.createProduct(this.createproduct)];
                    case 1:
                        _a.sent();
                        this.closePage(2);
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    VCreateProduct.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.createproduct = param;
                this.openPage(this.page, param);
                return [2 /*return*/];
            });
        });
    };
    VCreateProduct.prototype.render = function (param) {
        var _this = this;
        return React.createElement(Page, { header: "\u6DFB\u52A0\u4EA7\u54C1", footer: null, headerClassName: 'bg-primary' },
            React.createElement("div", { className: "mx-3" },
                React.createElement(Form, { ref: function (v) { return _this.form = v; }, schema: schema, uiSchema: this.uiSchema, onButtonClick: this.onFormButtonClick, requiredFlag: false }),
                React.createElement("button", { type: "button", className: "btn btn-primary w-100", onClick: this.onCreateTaskProduct }, "\u6DFB\u52A0")));
    };
    return VCreateProduct;
}(VPage));
export { VCreateProduct };
//# sourceMappingURL=VCreateProduct.js.map