import * as tslib_1 from "tslib";
import * as React from 'react';
import { observable } from 'mobx';
import { Page, Edit, nav } from '../ui';
import userApi from './userApi';
var EditMeInfo = /** @class */ (function (_super) {
    tslib_1.__extends(EditMeInfo, _super);
    function EditMeInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.schema = [
            { name: 'nick', type: 'string' },
            { name: 'icon', type: 'image' }
        ];
        _this.uiSchema = {
            items: {
                nick: { widget: 'text', label: '别名', placeholder: '好的别名更方便记忆' },
                icon: { widget: 'image', label: '头像' },
            }
        };
        _this.onItemChanged = function (itemSchema, newValue, preValue) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var name;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = itemSchema.name;
                        return [4 /*yield*/, userApi.userSetProp(name, newValue)];
                    case 1:
                        _a.sent();
                        this.data[name] = newValue;
                        nav.user[name] = newValue;
                        nav.saveLocalUser();
                        return [2 /*return*/];
                }
            });
        }); };
        var _a = nav.user, nick = _a.nick, icon = _a.icon;
        _this.data = {
            nick: nick,
            icon: icon,
        };
        return _this;
    }
    EditMeInfo.prototype.render = function () {
        return React.createElement(Page, { header: "\u4E2A\u4EBA\u4FE1\u606F" },
            React.createElement(Edit, { schema: this.schema, uiSchema: this.uiSchema, data: this.data, onItemChanged: this.onItemChanged }));
    };
    tslib_1.__decorate([
        observable
    ], EditMeInfo.prototype, "data", void 0);
    return EditMeInfo;
}(React.Component));
export { EditMeInfo };
//# sourceMappingURL=meInfo.js.map