import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
var VAi = /** @class */ (function (_super) {
    tslib_1.__extends(VAi, _super);
    function VAi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function () {
            return React.createElement(Page, { header: "AI" },
                React.createElement("div", { className: "p-3" }, _this.finished === false ?
                    React.createElement(React.Fragment, null,
                        React.createElement("i", { className: "fa fa-spinner fa-spin fa-3x fa-fw" }),
                        React.createElement("span", { className: "sr-only" }, "Loading..."),
                        "\u597D\u963F\uFF0C\u6211\u6765\u7B97\u7B97\uFF0C\u7A0D\u7B49......")
                    :
                        React.createElement(React.Fragment, null,
                            React.createElement("i", { className: "fa fa-frown-o fa-2x fa-fw text-warning" }),
                            " \u6CA1\u6709\u627E\u5230\u9002\u5408\u4F60\u7684\u673A\u4F1A\uFF01")));
        });
        return _this;
    }
    VAi.prototype.open = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.finished = false;
                this.openPage(this.page);
                setTimeout(function () {
                    _this.finished = true;
                }, 3000);
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], VAi.prototype, "finished", void 0);
    return VAi;
}(VPage));
export { VAi };
//# sourceMappingURL=VAi.js.map