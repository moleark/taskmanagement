import * as tslib_1 from "tslib";
import * as React from 'react';
import { Page, Form, nav } from '../ui';
import { CenterAppApi } from '../net';
var ChangePasswordPage = /** @class */ (function (_super) {
    tslib_1.__extends(ChangePasswordPage, _super);
    function ChangePasswordPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.schema = [
            { name: 'orgPassword', type: 'string', maxLength: 60, required: true },
            { name: 'newPassword', type: 'string', maxLength: 60, required: true },
            { name: 'newPassword1', type: 'string', maxLength: 60, required: true },
            { name: 'submit', type: 'button' }
        ];
        _this.uiSchema = {
            items: {
                orgPassword: {
                    label: '原密码',
                    placeholder: '输入原来的密码'
                },
                newPassword: {
                    label: '新密码',
                    placeholder: '输入新设的密码'
                },
                newPassword1: {
                    label: '确认密码',
                    placeholder: '再次输入新设密码'
                },
                submit: {
                    widget: 'button',
                    label: '提交',
                    className: 'btn btn-primary'
                },
            }
        };
        _this.onSubmit = function (name, context) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, orgPassword, newPassword, newPassword1, centerAppApi, ret;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = context.data, orgPassword = _a.orgPassword, newPassword = _a.newPassword, newPassword1 = _a.newPassword1;
                        if (newPassword !== newPassword1) {
                            context.setError('newPassword1', '新密码错误，请重新输入');
                            return [2 /*return*/];
                        }
                        centerAppApi = new CenterAppApi('tv/', undefined);
                        return [4 /*yield*/, centerAppApi.changePassword({ orgPassword: orgPassword, newPassword: newPassword })];
                    case 1:
                        ret = _b.sent();
                        if (ret === false) {
                            context.setError('orgPassword', '原密码错误');
                            return [2 /*return*/];
                        }
                        nav.replace(React.createElement(Page, { header: "\u4FEE\u6539\u5BC6\u7801", back: "close" },
                            React.createElement("div", { className: "m-3  text-success" }, "\u5BC6\u7801\u4FEE\u6539\u6210\u529F\uFF01")));
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ChangePasswordPage.prototype.render = function () {
        return React.createElement(Page, { header: "\u4FEE\u6539\u5BC6\u7801" },
            React.createElement(Form, { className: "m-3", schema: this.schema, uiSchema: this.uiSchema, onButtonClick: this.onSubmit, fieldLabelSize: 2 }));
    };
    return ChangePasswordPage;
}(React.Component));
export { ChangePasswordPage };
//# sourceMappingURL=changePassword.js.map