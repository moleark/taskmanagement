import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { ResUploader } from '../resUploader';
import { Image } from '../image';
import { nav } from '../nav';
import { Page } from '../page';
import { ItemEdit } from './itemEdit';
var ImageItemEdit = /** @class */ (function (_super) {
    tslib_1.__extends(ImageItemEdit, _super);
    function ImageItemEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overSize = false;
        _this.upload = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ret;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.resUploader)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.resUploader.upload()];
                    case 1:
                        ret = _a.sent();
                        if (ret === null) {
                            this.overSize = true;
                            setTimeout(function () { return _this.overSize = false; }, 3000);
                            return [2 /*return*/];
                        }
                        this.resId = ret;
                        this.isChanged = (this.resId != this.value);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (props) {
            var resolve = props.resolve;
            var right = React.createElement("button", { className: "btn btn-sm btn-success", disabled: !_this.isChanged, onClick: function () { return resolve(_this.resId); } }, "\u4FDD\u5B58");
            var overSize;
            if (_this.overSize === true) {
                overSize = React.createElement("div", { className: "text-danger" },
                    React.createElement("i", { className: "fa fa-times-circle" }),
                    " \u56FE\u7247\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC72M\uFF0C\u65E0\u6CD5\u4E0A\u4F20");
            }
            return React.createElement(Page, { header: '更改' + _this.label, right: right },
                React.createElement("div", { className: "my-3 px-3 py-3 bg-white" },
                    React.createElement("div", null,
                        React.createElement("div", null, "\u4E0A\u4F20\u56FE\u7247\uFF1A"),
                        React.createElement("div", { className: "my-3" },
                            React.createElement(ResUploader, { ref: function (v) { return _this.resUploader = v; }, multiple: false, maxSize: 2048 })),
                        React.createElement("div", null,
                            React.createElement("button", { className: "btn btn-primary", onClick: _this.upload }, "\u4E0A\u4F20"))),
                    overSize,
                    React.createElement("div", { className: "small muted my-4" }, "\u652F\u6301JPG\u3001GIF\u3001PNG\u683C\u5F0F\u56FE\u7247\uFF0C\u4E0D\u8D85\u8FC72M\u3002"),
                    React.createElement("div", { className: "d-flex" },
                        React.createElement("div", { className: "w-12c h-12c mr-4", style: { border: '1px dotted gray', padding: '8px' } },
                            React.createElement(Image, { className: "w-100 h-100", src: _this.resId })),
                        React.createElement("div", null,
                            React.createElement("div", { className: "small" }, "\u56FE\u7247\u9884\u89C8"),
                            React.createElement(Image, { className: "w-4c h-4c mt-3", src: _this.resId })))));
        });
        return _this;
    }
    ImageItemEdit.prototype.internalStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.resId = this.value;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        nav.push(React.createElement(_this.page, { resolve: resolve, reject: reject }), function () { return reject(); });
                    })];
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], ImageItemEdit.prototype, "resId", void 0);
    tslib_1.__decorate([
        observable
    ], ImageItemEdit.prototype, "overSize", void 0);
    return ImageItemEdit;
}(ItemEdit));
export { ImageItemEdit };
//# sourceMappingURL=imageItemEdit.js.map