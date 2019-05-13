import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List, SearchBox, FA } from 'tonva-react-form';
import { observable } from 'mobx';
var VProductList = /** @class */ (function (_super) {
    tslib_1.__extends(VProductList, _super);
    function VProductList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function (customer) {
            var pageProduct = _this.controller.pageProduct;
            var add = React.createElement("div", { className: "cursor-pointer px-3 py-1" },
                React.createElement(FA, { name: "plus" }));
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u8BF7\u641C\u7D22\u5BA2\u6237\uFF01");
            React.createElement("br", null);
            var header = React.createElement(LMR, { className: "pl-3 py-2 bg-primary text-white", right: add },
                React.createElement("div", { className: "d-flex h-100 align-items-center" }, "\u4EA7\u54C1"));
            var size = "sm";
            return React.createElement(Page, { header: header },
                React.createElement(SearchBox, { className: "px-1 w-100  mt-2 mr-2 ", size: size, onSearch: function (key) { return _this.controller.searchByKey(key); }, placeholder: "" }),
                React.createElement(List, { before: '', none: none, items: pageProduct, item: { render: _this.renderProduct, onClick: null } }));
        });
        return _this;
    }
    VProductList.prototype.open = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, customer);
                return [2 /*return*/];
            });
        });
    };
    //每个视图都有一个render方法， 用于自定义页面
    VProductList.prototype.render = function (member) {
        return React.createElement(this.page, null);
    };
    VProductList.prototype.renderProduct = function (model, index) {
        var description = model.description;
        return React.createElement(LMR, { className: "px-3 py-2" },
            React.createElement("div", { className: "font-weight-bold" }),
            React.createElement("div", null, description));
    };
    tslib_1.__decorate([
        observable
    ], VProductList.prototype, "tasks", void 0);
    return VProductList;
}(VPage));
export { VProductList };
//# sourceMappingURL=VProductList.js.map