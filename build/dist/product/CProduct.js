import * as tslib_1 from "tslib";
import * as React from 'react';
import { PageItems, Controller } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VProductList } from './VProductList';
import { VProductSelect } from './VProductSelect';
//页面类
var PageProduct = /** @class */ (function (_super) {
    tslib_1.__extends(PageProduct, _super);
    function PageProduct(searchProductQuery) {
        var _this = _super.call(this) || this;
        _this.firstSize = _this.pageSize = 10;
        _this.searchProductQuery = searchProductQuery;
        return _this;
    }
    PageProduct.prototype.load = function (param, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (pageStart === undefined)
                            pageStart = 0;
                        return [4 /*yield*/, this.searchProductQuery.page(param, pageStart, pageSize)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    PageProduct.prototype.setPageStart = function (item) {
        this.pageStart = item === undefined ? 0 : item.id;
    };
    return PageProduct;
}(PageItems));
/**
 *
 */
var CProduct = /** @class */ (function (_super) {
    tslib_1.__extends(CProduct, _super);
    //构造函数
    function CProduct(cApp, res) {
        var _this = _super.call(this, res) || this;
        //查询客户--通过名称
        _this.searchByKey = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.pageProduct = new PageProduct(this.querySearchProduct);
                this.pageProduct.first({ key: key, salesRegion: 1 });
                return [2 /*return*/];
            });
        }); };
        //选择客户--给调用页面返回客户id
        _this.returnProduct = function (product) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.returnCall(product);
                return [2 /*return*/];
            });
        }); };
        _this.render = observer(function () {
            _this.pageProduct = null;
            return _this.renderView(VProductList);
        });
        _this.tab = function () {
            return React.createElement(_this.render, null);
        };
        _this.cApp = cApp;
        var cUqProduct = _this.cApp.cUqProduct;
        _this.querySearchProduct = cUqProduct.query("searchProduct");
        return _this;
    }
    //初始化
    CProduct.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VProductSelect, param);
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CProduct.prototype, "pageProduct", void 0);
    tslib_1.__decorate([
        observable
    ], CProduct.prototype, "customerlist", void 0);
    return CProduct;
}(Controller));
export { CProduct };
//# sourceMappingURL=CProduct.js.map