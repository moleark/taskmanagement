import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page, tv, List } from 'tonva';
import { observer } from 'mobx-react';
var schema = [
    { name: 'note', type: 'string', required: false },
];
var VProductDetail = /** @class */ (function (_super) {
    tslib_1.__extends(VProductDetail, _super);
    function VProductDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function (param) {
            return _this.render(param);
        });
        _this.renderItem = function (param, index) {
            var product = param.product;
            return React.createElement("div", null, tv(product, function (v) { return React.createElement(React.Fragment, null,
                " ",
                v.description); }));
        };
        return _this;
    }
    VProductDetail.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, param);
                return [2 /*return*/];
            });
        });
    };
    VProductDetail.prototype.render = function (param) {
        var none = React.createElement("div", { className: "my-3 mx-2 text-muted" }, "\u65E0\u4EA7\u54C1");
        return React.createElement(Page, { header: "\u4EA7\u54C1\u8BE6\u60C5", headerClassName: 'bg-primary' },
            React.createElement("div", { className: "mx-3" },
                "\u4F60\u597D",
                React.createElement(List, { before: '', none: none, items: param, item: { render: this.renderItem } })));
    };
    return VProductDetail;
}(VPage));
export { VProductDetail };
//# sourceMappingURL=VProductDetail.js.map