import * as tslib_1 from "tslib";
import { CenterApi } from '../net';
import { decodeUserToken } from '../user';
//import { nav } from '../ui';
var UserApi = /** @class */ (function (_super) {
    tslib_1.__extends(UserApi, _super);
    function UserApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserApi.prototype.login = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret, token, user, nick, icon;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('login', params)];
                    case 1:
                        ret = _a.sent();
                        switch (typeof ret) {
                            default: return [2 /*return*/];
                            case 'string': return [2 /*return*/, decodeUserToken(ret)];
                            case 'object':
                                token = ret.token;
                                user = decodeUserToken(token);
                                nick = ret.nick, icon = ret.icon;
                                if (nick)
                                    user.nick = nick;
                                if (icon)
                                    user.icon = icon;
                                return [2 /*return*/, user];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApi.prototype.register = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('register', params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.setVerify = function (account, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('set-verify', { account: account, type: type })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.checkVerify = function (account, verify) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('check-verify', { account: account, verify: verify })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.isExists = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('is-exists', { account: account })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.resetPassword = function (account, password, verify, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('reset-password', { account: account, password: password, verify: verify, type: type })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApi.prototype.userSetProp = function (prop, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('tie/user-set-prop', { prop: prop, value: value })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserApi;
}(CenterApi));
export { UserApi };
var userApi = new UserApi('tv/user/', undefined);
export default userApi;
//# sourceMappingURL=userApi.js.map