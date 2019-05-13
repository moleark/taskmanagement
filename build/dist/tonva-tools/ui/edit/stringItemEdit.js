import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav } from '../nav';
import { Page } from '../page';
import { observer } from 'mobx-react';
import { ItemEdit } from './itemEdit';
var StringItemEdit = /** @class */ (function (_super) {
    tslib_1.__extends(StringItemEdit, _super);
    function StringItemEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.newValue = evt.target.value;
            var preValue = _this.value;
            _this.isChanged = (_this.newValue != preValue);
        };
        _this.page = observer(function (props) {
            var resolve = props.resolve, reject = props.reject;
            var right = React.createElement("button", { className: "btn btn-sm btn-success", disabled: !_this.isChanged, onClick: function () { return resolve(_this.newValue); } }, "\u4FDD\u5B58");
            return React.createElement(Page, { header: '更改' + _this.label, right: right },
                React.createElement("div", { className: "m-3" },
                    React.createElement("input", { type: "text", onChange: _this.onChange, className: "form-control", defaultValue: _this.value }),
                    _this.uiItem && React.createElement("div", { className: "small muted m-2" }, _this.uiItem.placeholder)));
        });
        return _this;
    }
    StringItemEdit.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var element = React.createElement(_this.page, { resolve: resolve, reject: reject });
                        nav.push(element, reject);
                    })];
            });
        });
    };
    return StringItemEdit;
}(ItemEdit));
export { StringItemEdit };
//# sourceMappingURL=stringItemEdit.js.map