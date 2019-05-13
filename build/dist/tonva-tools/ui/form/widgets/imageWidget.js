import * as tslib_1 from "tslib";
import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
import { Image } from '../../image';
import { ImageItemEdit } from '../../edit/imageItemEdit';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
var ImageWidget = /** @class */ (function (_super) {
    tslib_1.__extends(ImageWidget, _super);
    function ImageWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var edit, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        edit = new ImageItemEdit(this.itemSchema, this.ui, this.ui.label, this.value);
                        return [4 /*yield*/, edit.start()];
                    case 1:
                        ret = _a.sent();
                        if (ret !== null) {
                            this.setValue(ret);
                            this.imageSrc = ret;
                        }
                        return [4 /*yield*/, edit.end()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.observerRender = observer(function () {
            var cn = [
                'bg-white p-1 d-flex justify-content-center',
            ];
            var onClick;
            if (!_this.readOnly && !_this.disabled) {
                cn.push('cursor-pointer');
                onClick = _this.onClick;
            }
            return React.createElement("div", { className: classNames(cn), onClick: onClick },
                React.createElement(Image, { src: _this.imageSrc, className: "w-4c h-4c" }));
        });
        return _this;
    }
    ImageWidget.prototype.init = function () {
        _super.prototype.init.call(this);
        this.imageSrc = this.value;
    };
    ImageWidget.prototype.render = function () {
        return React.createElement(this.observerRender, null);
    };
    tslib_1.__decorate([
        observable
    ], ImageWidget.prototype, "imageSrc", void 0);
    return ImageWidget;
}(Widget));
export { ImageWidget };
//# sourceMappingURL=imageWidget.js.map