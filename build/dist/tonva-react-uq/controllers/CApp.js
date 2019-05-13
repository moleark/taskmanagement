import * as tslib_1 from "tslib";
import * as React from 'react';
import _ from 'lodash';
import { Page, loadAppUqs, nav, appInFrame, Controller, VPage, resLang, getExHash } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { CUq } from './uq';
import { centerApi } from '../centerApi';
var CApp = /** @class */ (function (_super) {
    tslib_1.__extends(CApp, _super);
    function CApp(ui) {
        var _this = _super.call(this, resLang(ui && ui.res)) || this;
        _this.cImportUqs = {};
        _this.cUqCollection = {};
        _this.renderRow = function (item, index) {
            var id = item.id, nick = item.nick, name = item.name;
            return React.createElement(LMR, { className: "px-3 py-2", right: 'id: ' + id },
                React.createElement("div", null, nick || name));
        };
        _this.onRowClick = function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appInFrame.unit = item.id; // 25;
                        return [4 /*yield*/, this.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.selectUnitPage = function () {
            return React.createElement(Page, { header: "\u9009\u62E9\u5C0F\u53F7", logout: true },
                React.createElement(List, { items: _this.appUnits, item: { render: _this.renderRow, onClick: _this.onRowClick } }));
        };
        nav.setSettings(ui);
        var tonvaApp = ui.appName;
        if (tonvaApp === undefined) {
            throw 'appName like "owner/app" must be defined in UI';
        }
        var parts = tonvaApp.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        _this.appOwner = parts[0];
        _this.appName = parts[1];
        if (ui.uqs === undefined)
            ui.uqs = {};
        _this.ui = ui;
        _this.caption = _this.res.caption || 'Tonva';
        return _this;
    }
    CApp.prototype.startDebug = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var appName, cApp, keepNavBackButton;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appName = this.appOwner + '/' + this.appName;
                        cApp = new CApp({ appName: appName, uqs: {} });
                        keepNavBackButton = true;
                        return [4 /*yield*/, cApp.start(keepNavBackButton)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.loadUqs = function (app) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retErrors, unit, id, uqs, promises, promiseChecks, roleAppUI, _i, uqs_1, appUq, uqId, uqOwner, uqName, access, uq, uqUI, cUq, results, _a, results_1, result, retError;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        retErrors = [];
                        unit = appInFrame.unit;
                        id = app.id, uqs = app.uqs;
                        this.id = id;
                        promises = [];
                        promiseChecks = [];
                        return [4 /*yield*/, this.buildRoleAppUI()];
                    case 1:
                        roleAppUI = _b.sent();
                        this.ui = roleAppUI;
                        for (_i = 0, uqs_1 = uqs; _i < uqs_1.length; _i++) {
                            appUq = uqs_1[_i];
                            uqId = appUq.id, uqOwner = appUq.uqOwner, uqName = appUq.uqName, access = appUq.access;
                            uq = uqOwner + '/' + uqName;
                            uqUI = roleAppUI && roleAppUI.uqs && roleAppUI.uqs[uq];
                            cUq = this.newCUq(uq, uqId, access, uqUI || {});
                            this.cUqCollection[uq] = cUq;
                            promises.push(cUq.loadSchema());
                            promiseChecks.push(cUq.entities.uqApi.checkAccess());
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        results = _b.sent();
                        Promise.all(promiseChecks).then(function (checks) {
                            for (var _i = 0, checks_1 = checks; _i < checks_1.length; _i++) {
                                var c = checks_1[_i];
                                if (c === false) {
                                    //debugger;
                                    //nav.start();
                                    //return;
                                }
                            }
                        });
                        for (_a = 0, results_1 = results; _a < results_1.length; _a++) {
                            result = results_1[_a];
                            retError = result;
                            if (retError !== undefined) {
                                retErrors.push(retError);
                                continue;
                            }
                        }
                        if (retErrors.length === 0)
                            return [2 /*return*/];
                        return [2 /*return*/, retErrors];
                }
            });
        });
    };
    CApp.prototype.buildRoleAppUI = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var hashParam, roles, roleAppUI, ret, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ui)
                            return [2 /*return*/, undefined];
                        hashParam = nav.hashParam;
                        if (!hashParam)
                            return [2 /*return*/, this.ui];
                        roles = this.ui.roles;
                        roleAppUI = roles && roles[hashParam];
                        if (!roleAppUI)
                            return [2 /*return*/, this.ui];
                        ret = {};
                        for (i in this.ui) {
                            if (i === 'roles')
                                continue;
                            ret[i] = this.ui[i];
                        }
                        if (!(typeof roleAppUI === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, roleAppUI()];
                    case 1:
                        roleAppUI = _a.sent();
                        _a.label = 2;
                    case 2:
                        _.merge(ret, roleAppUI);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    CApp.prototype.getImportUq = function (uqOwner, uqName) {
        var uq = uqOwner + '/' + uqName;
        var cUq = this.cImportUqs[uq];
        if (cUq !== undefined)
            return cUq;
        var ui = this.ui && this.ui.uqs && this.ui.uqs[uq];
        var uqId = -1; // unknown
        this.cImportUqs[uq] = cUq = this.getCUq(uq);
        //this.newCUq(uq, uqId, undefined, ui || {});
        /*
        let retError = await cUq.loadSchema();
        if (retError !== undefined) {
            console.error(retError);
            debugger;
            return;
        }
        */
        return cUq;
    };
    CApp.prototype.newCUq = function (uq, uqId, access, ui) {
        var cUq = new (this.ui.CUq || CUq)(this, uq, this.id, uqId, access, ui);
        Object.setPrototypeOf(cUq.x, this.x);
        return cUq;
    };
    Object.defineProperty(CApp.prototype, "cUqArr", {
        get: function () {
            var ret = [];
            for (var i in this.cUqCollection) {
                ret.push(this.cUqCollection[i]);
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.getCUq = function (uq) {
        return this.cUqCollection[uq];
    };
    Object.defineProperty(CApp.prototype, "VAppMain", {
        get: function () { return (this.ui && this.ui.main) || VAppMain; },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.beforeStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app, predefinedUnit_1, id, user, _a, appUnit, retErrors, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, loadAppUqs(this.appOwner, this.appName)];
                    case 1:
                        app = _b.sent();
                        predefinedUnit_1 = appInFrame.predefinedUnit;
                        id = app.id;
                        this.id = id;
                        user = nav.user;
                        if (!(user !== undefined && user.id > 0)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, centerApi.userAppUnits(this.id)];
                    case 2:
                        _a.appUnits = _b.sent();
                        switch (this.appUnits.length) {
                            case 0:
                                this.showUnsupport(predefinedUnit_1);
                                return [2 /*return*/, false];
                            case 1:
                                appUnit = this.appUnits[0].id;
                                if (appUnit === undefined || appUnit < 0 ||
                                    predefinedUnit_1 !== undefined && appUnit != predefinedUnit_1) {
                                    this.showUnsupport(predefinedUnit_1);
                                    return [2 /*return*/, false];
                                }
                                appInFrame.unit = appUnit;
                                break;
                            default:
                                if (predefinedUnit_1 > 0 && this.appUnits.find(function (v) { return v.id === predefinedUnit_1; }) !== undefined) {
                                    appInFrame.unit = predefinedUnit_1;
                                    break;
                                }
                                nav.push(React.createElement(this.selectUnitPage, null));
                                return [2 /*return*/, false];
                        }
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.loadUqs(app)];
                    case 4:
                        retErrors = _b.sent();
                        if (retErrors !== undefined) {
                            this.openPage(React.createElement(Page, { header: "ERROR" },
                                React.createElement("div", { className: "m-3" },
                                    React.createElement("div", null, "Load Uqs \u53D1\u751F\u9519\u8BEF\uFF1A"),
                                    retErrors.map(function (r, i) { return React.createElement("div", { key: i }, r); }))));
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                    case 5:
                        err_1 = _b.sent();
                        nav.push(React.createElement(Page, { header: "App start error!" },
                            React.createElement("pre", null, typeof err_1 === 'string' ? err_1 : err_1.message)));
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (param !== true) {
                            this.clearPrevPages();
                        }
                        return [4 /*yield*/, this.showMainPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.render = function () {
        return this.renderView(this.VAppMain);
    };
    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    CApp.prototype.clearPrevPages = function () {
        nav.clear();
    };
    CApp.prototype.showUnsupport = function (predefinedUnit) {
        this.clearPrevPages();
        var user = nav.user;
        var userName = user ? user.name : '[未登录]';
        this.openPage(React.createElement(Page, { header: "APP\u65E0\u6CD5\u8FD0\u884C", logout: true },
            React.createElement("div", { className: "m-3 text-danger container" },
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "\u767B\u5F55\u7528\u6237: "),
                    React.createElement("div", { className: "col" }, userName)),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "App:"),
                    React.createElement("div", { className: "col" }, this.appOwner + "/" + this.appName)),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" }, "\u9884\u8BBE\u5C0F\u53F7:"),
                    React.createElement("div", { className: "col" }, predefinedUnit || React.createElement("small", { className: "text-muted" }, "[\u65E0\u9884\u8BBE\u5C0F\u53F7]"))),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-2" },
                        React.createElement(FA, { name: "exclamation-triangle" })),
                    React.createElement("div", { className: "col" },
                        React.createElement("div", { className: "text-muted" }, "\u65E0\u6CD5\u8FD0\u884C\u53EF\u80FD\u539F\u56E0\uFF1A"),
                        React.createElement("ul", { className: "p-0" },
                            React.createElement("li", null,
                                "\u6CA1\u6709\u5C0F\u53F7\u8FD0\u884C ",
                                this.ui.appName),
                            React.createElement("li", null,
                                "\u7528\u6237 ",
                                React.createElement("b", null, userName),
                                " \u6CA1\u6709\u52A0\u5165\u4EFB\u4F55\u4E00\u4E2A\u8FD0\u884C",
                                this.ui.appName,
                                "\u7684\u5C0F\u53F7"),
                            predefinedUnit &&
                                React.createElement("li", null,
                                    "\u9884\u8BBE\u5C0F\u53F7 ",
                                    React.createElement("b", null, predefinedUnit),
                                    " \u6CA1\u6709\u8FD0\u884CApp ",
                                    this.ui.appName)))),
                predefinedUnit ||
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("div", { className: "col-2" }),
                        React.createElement("div", { className: "col" },
                            "\u9884\u8BBE\u5C0F\u53F7\u5B9A\u4E49\u5728 public/unit.json \u6587\u4EF6\u4E2D\u3002 \u5B9A\u4E49\u4E86\u8FD9\u4E2A\u6587\u4EF6\u7684\u7A0B\u5E8F\uFF0C\u53EA\u80FD\u7531url\u76F4\u63A5\u542F\u52A8\u3002 \u7528\u6237\u7B2C\u4E00\u6B21\u8BBF\u95EEapp\u4E4B\u540E\uFF0C\u4F1A\u7F13\u5B58\u5728localStorage\u91CC\u3002",
                            React.createElement("br", null),
                            "\u5982\u679C\u8981\u5220\u53BB\u7F13\u5B58\u7684\u9884\u5B9A\u4E49Unit\uFF0Clogout\u7136\u540E\u518Dlogin\u3002")))));
    };
    CApp.prototype.showMainPage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var exHash, parts, action, uqId, sheetTypeId, sheetId, cUq;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exHash = getExHash();
                        if (!(exHash !== undefined)) return [3 /*break*/, 2];
                        parts = exHash.split('-');
                        if (!(parts.length > 3)) return [3 /*break*/, 2];
                        action = parts[3];
                        if (!(action === 'sheet' || action === 'sheet_debug')) return [3 /*break*/, 2];
                        uqId = Number(parts[4]);
                        sheetTypeId = Number(parts[5]);
                        sheetId = Number(parts[6]);
                        cUq = this.getCUqFromId(uqId);
                        if (cUq === undefined) {
                            alert('unknown uqId: ' + uqId);
                            return [2 /*return*/];
                        }
                        this.clearPrevPages();
                        return [4 /*yield*/, cUq.navSheet(sheetTypeId, sheetId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.openVPage(this.VAppMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.getCUqFromId = function (uqId) {
        for (var i in this.cUqCollection) {
            var cUq = this.cUqCollection[i];
            if (cUq.id === uqId)
                return cUq;
        }
        return;
    };
    return CApp;
}(Controller));
export { CApp };
var VAppMain = /** @class */ (function (_super) {
    tslib_1.__extends(VAppMain, _super);
    function VAppMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appPage = function () {
            var caption = _this.controller.caption;
            return React.createElement(Page, { header: caption, logout: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                    appInFrame.unit = undefined;
                    return [2 /*return*/];
                }); }); } }, _this.appContent());
        };
        _this.appContent = function () {
            var cUqArr = _this.controller.cUqArr;
            var content;
            if (cUqArr.length === 0) {
                content = React.createElement("div", { className: "text-danger" },
                    React.createElement(FA, { name: "" }),
                    " \u6B64APP\u6CA1\u6709\u7ED1\u5B9A\u4EFB\u4F55\u7684UQ");
            }
            else {
                content = cUqArr.map(function (v, i) { return React.createElement("div", { key: i }, v.render()); });
            }
            return React.createElement(React.Fragment, null, content);
        };
        return _this;
    }
    VAppMain.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.appPage);
                return [2 /*return*/];
            });
        });
    };
    VAppMain.prototype.render = function (param) {
        return this.appContent();
    };
    return VAppMain;
}(VPage));
//# sourceMappingURL=CApp.js.map