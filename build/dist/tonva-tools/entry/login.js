import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav, Page, Form, resLang } from '../ui';
import { RegisterController, ForgetController } from './register';
import userApi from './userApi';
import { loginRes } from './res';
import { tonvaTop, getSender } from './tools';
var schema = [
    { name: 'username', type: 'string', required: true, maxLength: 100 },
    { name: 'password', type: 'string', required: true, maxLength: 100 },
    { name: 'login', type: 'submit' },
];
var Login = /** @class */ (function (_super) {
    tslib_1.__extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.res = resLang(loginRes);
        _this.uiSchema = {
            items: {
                username: { placeholder: '手机/邮箱/用户名', label: '登录账号' },
                password: { widget: 'password', placeholder: '密码', label: '密码' },
                login: { widget: 'button', className: 'btn btn-primary btn-block mt-3', label: '登录' },
            }
        };
        _this.onSubmit = function (name, context) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var values, un, pwd, user, sender, type;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = context.form.data;
                        un = values['username'];
                        pwd = values['password'];
                        if (pwd === undefined) {
                            return [2 /*return*/, 'something wrong, pwd is undefined'];
                        }
                        return [4 /*yield*/, userApi.login({
                                user: un,
                                pwd: pwd,
                                guest: nav.guest,
                            })];
                    case 1:
                        user = _a.sent();
                        if (user === undefined) {
                            sender = getSender(un);
                            type = sender !== undefined ? sender.caption : '用户名';
                            return [2 /*return*/, type + '或密码错！'];
                        }
                        console.log("onLoginSubmit: user=%s pwd:%s", user.name, user.token);
                        return [4 /*yield*/, nav.logined(user, this.props.callback)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onEnter = function (name, context) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(name === 'password')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onSubmit('login', context)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.clickReg = function () {
            //nav.replace(<RegisterView />);
            var register = new RegisterController(undefined);
            register.start();
        };
        _this.clickForget = function () {
            var forget = new ForgetController(undefined);
            forget.start();
        };
        return _this;
    }
    Login.prototype.render = function () {
        var _this = this;
        var footer = React.createElement("div", { className: 'text-center' },
            React.createElement("button", { className: "btn btn-link", color: "link", style: { margin: '0px auto' }, onClick: this.clickReg }, "\u6CE8\u518C\u8D26\u53F7"));
        var header = false;
        if (this.props.withBack === true) {
            header = '登录';
        }
        return React.createElement(Page, { header: header, footer: footer },
            React.createElement("div", { className: "d-flex h-100 flex-column justify-content-center align-items-center" },
                React.createElement("div", { className: "flex-fill" }),
                React.createElement("div", { className: "w-20c" },
                    tonvaTop(),
                    React.createElement("div", { className: "h-2c" }),
                    React.createElement(Form, { schema: schema, uiSchema: this.uiSchema, onButtonClick: this.onSubmit, onEnter: this.onEnter, requiredFlag: false }),
                    React.createElement("button", { className: "btn btn-link btn-block", onClick: function () { return _this.clickForget(); } }, "\u5FD8\u8BB0\u5BC6\u7801")),
                React.createElement("div", { className: "flex-fill" }),
                React.createElement("div", { className: "flex-fill" })));
    };
    return Login;
}(React.Component));
export default Login;
//# sourceMappingURL=login.js.map