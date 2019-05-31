import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { List, SearchBox, FA } from 'tonva';
import { tv } from 'tonva';
import { ProductImage } from 'tools/productImage';
var VProductSelect = /** @class */ (function (_super) {
    tslib_1.__extends(VProductSelect, _super);
    function VProductSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderBrand = function (brand) {
            return _this.productPropItem('品牌', brand.name);
        };
        _this.productPropItem = function (caption, value) {
            if (value === null || value === undefined)
                return null;
            return React.createElement(React.Fragment, null,
                React.createElement("div", { className: "col-4 col-sm-2 col-lg-4 text-muted pr-0 small" }, caption),
                React.createElement("div", { className: "col-8 col-sm-4 col-lg-8" }, value));
        };
        _this.renderProduct = function (product, index) {
            var brand = product.brand, description = product.description, descriptionC = product.descriptionC, CAS = product.CAS, purity = product.purity, molecularFomula = product.molecularFomula, molecularWeight = product.molecularWeight, origin = product.origin, imageUrl = product.imageUrl;
            return React.createElement("div", { className: "d-block mb-4 px-2" },
                React.createElement("div", { className: "py-2" },
                    React.createElement("div", null,
                        React.createElement("strong", null, description)),
                    React.createElement("div", null, descriptionC)),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-3" },
                        React.createElement(ProductImage, { chemicalId: imageUrl, className: "w-100" })),
                    React.createElement("div", { className: "col-9" },
                        React.createElement("div", { className: "row" },
                            _this.productPropItem('CAS', CAS),
                            _this.productPropItem('纯度', purity),
                            _this.productPropItem('分子式', molecularFomula),
                            _this.productPropItem('分子量', molecularWeight),
                            _this.productPropItem('产品编号', origin),
                            tv(brand, _this.renderBrand)))));
        };
        _this.onScrollBottom = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.pageProduct.more()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (customer) {
            var _a = _this.controller, pageProduct = _a.pageProduct, returnProduct = _a.returnProduct;
            var add = React.createElement("div", { className: "cursor-pointer " },
                React.createElement(FA, { name: "plus" }));
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u672A\u641C\u7D22\u5230\u4EA7\u54C1");
            return React.createElement(Page, { header: '\u6DFB\u52A0\u4EA7\u54C1', onScrollBottom: _this.onScrollBottom, headerClassName: 'bg-primary py-1 px-3' },
                React.createElement(SearchBox, { className: "px-1 w-100  mt-2 mr-2 ", size: 'md', onSearch: function (key) { return _this.controller.searchByKey(key); }, placeholder: "\u641C\u7D22\u54C1\u540D\u3001\u7F16\u53F7\u3001CAS\u3001MDL\u7B49" }),
                React.createElement(List, { before: '', none: none, items: pageProduct, item: { render: _this.renderProduct, onClick: returnProduct } }));
        });
        return _this;
    }
    VProductSelect.prototype.open = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, customer);
                return [2 /*return*/];
            });
        });
    };
    //每个视图都有一个render方法， 用于自定义页面
    VProductSelect.prototype.render = function (member) {
        return React.createElement(this.page, null);
    };
    return VProductSelect;
}(VPage));
export { VProductSelect };
//# sourceMappingURL=VProductSelect.js.map