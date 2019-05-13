import * as tslib_1 from "tslib";
import { nav } from '../nav';
import { observable } from 'mobx';
var ItemEdit = /** @class */ (function () {
    function ItemEdit(itemSchema, uiItem, label, value) {
        this.isChanged = false;
        this.itemSchema = itemSchema;
        this.uiItem = uiItem;
        this.value = value;
        var name = itemSchema.name;
        this.name = name;
        this.label = label;
    }
    ItemEdit.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalStart()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ItemEdit.prototype.end = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalEnd()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemEdit.prototype.internalEnd = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            nav.pop();
            return [2 /*return*/];
        }); });
    };
    tslib_1.__decorate([
        observable
    ], ItemEdit.prototype, "isChanged", void 0);
    return ItemEdit;
}());
export { ItemEdit };
//# sourceMappingURL=itemEdit.js.map