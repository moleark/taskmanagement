import * as tslib_1 from "tslib";
import _ from 'lodash';
import { CEntity } from "../CVEntity";
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { VTuidInfo } from "./vTuidInfo";
import { TuidPageItems } from "./pageItems";
import { VTuidMainList } from './vTuidList';
var CTuid = /** @class */ (function (_super) {
    tslib_1.__extends(CTuid, _super);
    function CTuid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuid.prototype.buildPageItems = function () {
        return new TuidPageItems(this.entity.owner || this.entity);
    };
    CTuid.prototype.searchMain = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.PageItems === undefined) {
                            this.PageItems = this.buildPageItems();
                        }
                        if (!(key !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.PageItems.first(key)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CTuid.prototype.getDivItems = function (ownerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.searchArr(ownerId, undefined, 0, 1000)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return CTuid;
}(CEntity));
export { CTuid };
var CTuidBase = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidBase, _super);
    function CTuidBase(cUq, entity, ui, res) {
        var _this = _super.call(this, cUq, entity, ui, res) || this;
        //let tuid = this.entity;
        //this.proxies = tuid.proxies;
        if (_this.proxies !== undefined) {
            _this.proxyLinks = [];
            for (var i in _this.proxies) {
                var link = _this.cUq.linkFromName('tuid', i);
                _this.proxyLinks.push(link);
            }
        }
        return _this;
    }
    CTuidBase.prototype.from = function () {
        var ret = this.entity.cFrom();
        if (ret === undefined)
            return this;
        return ret;
    };
    CTuidBase.prototype.cUqFrom = function () {
        return this.entity.cUqFrom();
    };
    CTuidBase.prototype.cEditFrom = function () {
        var cUq = this.entity.cUqFrom();
        return cUq.cTuidEditFromName(this.entity.name);
    };
    CTuidBase.prototype.cInfoFrom = function () {
        var cUq = this.entity.cUqFrom();
        return cUq.cTuidInfoFromName(this.entity.name);
    };
    CTuidBase.prototype.cSelectFrom = function () {
        var cUq = this.entity.cUqFrom();
        return cUq.cTuidSelectFromName(this.entity.name);
    };
    CTuidBase.prototype.getLable = function (tuid) {
        if (tuid === this.entity)
            return this.label;
        var name = tuid.name;
        var arrs = this.res.arrs;
        if (arrs !== undefined) {
            var arr = arrs[name];
            if (arr !== undefined) {
                var label = arr.label;
                if (label !== undefined)
                    return label;
            }
        }
        return name;
    };
    Object.defineProperty(CTuidBase.prototype, "VTuidMain", {
        get: function () { return VTuidMain; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CTuidBase.prototype, "VTuidEdit", {
        get: function () { return VTuidEdit; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CTuidBase.prototype, "VTuidList", {
        get: function () { return VTuidMainList; },
        enumerable: true,
        configurable: true
    });
    CTuidBase.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isFrom = this.entity.schemaFrom !== undefined;
                        return [4 /*yield*/, this.openVPage(this.VTuidMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.onEvent = function (type, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, cTuidInfo;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = type;
                        switch (_a) {
                            case 'new': return [3 /*break*/, 2];
                            case 'list': return [3 /*break*/, 4];
                            case 'edit': return [3 /*break*/, 6];
                            case 'item-changed': return [3 /*break*/, 8];
                            case 'info': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 1];
                    case 1: return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.onNew()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 4: return [4 /*yield*/, this.onList()];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 6: return [4 /*yield*/, this.onEdit(value)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                    case 8:
                        this.itemChanged(value);
                        return [2 /*return*/];
                    case 9:
                        cTuidInfo = new CTuidInfo(this.cUq, this.entity, this.ui, this.res);
                        return [4 /*yield*/, cTuidInfo.start(value)];
                    case 10:
                        _b.sent();
                        return [2 /*return*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.edit = function (values) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cTuidEdit;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cTuidEdit = this.ui && this.ui.CTuidEdit;
                        if (!(cTuidEdit === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.openVPage(this.VTuidEdit, values)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (new cTuidEdit(this.cUq, this.entity, this.ui, this.res)).start(values)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.onNew = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.edit(undefined)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.onList = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cTuidList;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cTuidList = this.ui && this.ui.CTuidList;
                        if (!(cTuidList === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.openVPage(this.VTuidList, undefined)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (new cTuidList(this.cUq, this.entity, this.ui, this.res)).start(undefined)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.onEdit = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var values;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = undefined;
                        if (!(id !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.entity.load(id)];
                    case 1:
                        values = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.edit(values);
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidBase.prototype.itemChanged = function (_a) {
        var id = _a.id, values = _a.values;
        if (this.PageItems === undefined)
            return;
        var items = this.PageItems.items;
        var item = items.find(function (v) { return v.id === id; });
        if (item !== undefined) {
            _.merge(item, values);
        }
    };
    return CTuidBase;
}(CTuid));
export { CTuidBase };
var CTuidMain = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidMain, _super);
    function CTuidMain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidMain.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isFrom = this.entity.schemaFrom !== undefined;
                        return [4 /*yield*/, this.openVPage(this.VTuidMain)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CTuidMain;
}(CTuidBase));
export { CTuidMain };
var CTuidEdit = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidEdit, _super);
    function CTuidEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidEdit.prototype.internalStart = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isFrom = this.entity.schemaFrom !== undefined;
                        if (!(typeof (id) === 'number')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onEdit(id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.edit(id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CTuidEdit.prototype.edit = function (values) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VTuidEdit, values)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CTuidEdit;
}(CTuidBase));
export { CTuidEdit };
var CTuidList = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidList, _super);
    function CTuidList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidList.prototype.internalStart = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isFrom = this.entity.schemaFrom !== undefined;
                        return [4 /*yield*/, this.openVPage(this.VTuidList)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CTuidList;
}(CTuidBase));
export { CTuidList };
var CTuidDiv = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidDiv, _super);
    function CTuidDiv() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidDiv.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                alert('tuid div: ' + this.entity.name);
                return [2 /*return*/];
            });
        });
    };
    return CTuidDiv;
}(CTuid));
export { CTuidDiv };
var CTuidSelect = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidSelect, _super);
    function CTuidSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidSelect.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openVPage(this.VTuidSelect, param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CTuidSelect.prototype.beforeStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //if (await super.beforeStart() === false) return false;
                    return [4 /*yield*/, this.entity.loadSchema()];
                    case 1:
                        //if (await super.beforeStart() === false) return false;
                        _a.sent();
                        if (this.PageItems !== undefined)
                            this.PageItems.reset();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Object.defineProperty(CTuidSelect.prototype, "VTuidSelect", {
        get: function () { return VTuidSelect; },
        enumerable: true,
        configurable: true
    });
    CTuidSelect.prototype.idFromItem = function (item) {
        return item.id;
    };
    return CTuidSelect;
}(CTuid));
export { CTuidSelect };
var CTuidInfo = /** @class */ (function (_super) {
    tslib_1.__extends(CTuidInfo, _super);
    function CTuidInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTuidInfo.prototype.internalStart = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entity.load(id)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.openVPage(this.VTuidInfo, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CTuidInfo.prototype, "VTuidInfo", {
        get: function () { return VTuidInfo; },
        enumerable: true,
        configurable: true
    });
    return CTuidInfo;
}(CTuid));
export { CTuidInfo };
//# sourceMappingURL=cTuid.js.map