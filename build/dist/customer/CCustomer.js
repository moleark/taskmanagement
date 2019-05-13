import * as tslib_1 from "tslib";
import { PageItems, Controller } from 'tonva-tools';
import { observable } from 'mobx';
import { VCustomer } from './VCustomer';
import { VCustomerDetail } from './VCustomerDetail';
//页面类
var PageCustomer = /** @class */ (function (_super) {
    tslib_1.__extends(PageCustomer, _super);
    function PageCustomer(searchCustomerQuery) {
        var _this = _super.call(this) || this;
        _this.firstSize = _this.pageSize = 10;
        _this.searchCustomerQuery = searchCustomerQuery;
        return _this;
    }
    PageCustomer.prototype.load = function (param, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (pageStart === undefined)
                            pageStart = 0;
                        return [4 /*yield*/, this.searchCustomerQuery.page(param, pageStart, pageSize)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    PageCustomer.prototype.setPageStart = function (item) {
        this.pageStart = item === undefined ? 0 : item.id;
    };
    return PageCustomer;
}(PageItems));
/**
 *
 */
var CCustomer = /** @class */ (function (_super) {
    tslib_1.__extends(CCustomer, _super);
    //构造函数
    function CCustomer(cApp, res) {
        var _this = _super.call(this, res) || this;
        //查询客户--通过名称
        _this.searchByKey = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                //let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
                //let task = await this.querySearchCustomer.table({ key: "小明" });
                //let task = await this.tuidCustomer.search(key, 0, 100);
                //this.customerlist = task;
                this.pageCustomer = new PageCustomer(this.querySearchCustomer);
                this.pageCustomer.first({ key: key });
                return [2 /*return*/];
            });
        }); };
        //查询客户--通过ID
        _this.showCustomerDetail = function (customerid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var customer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tuidCustomer.load(customerid)];
                    case 1:
                        customer = _a.sent();
                        this.openVPage(VCustomerDetail, customer);
                        return [2 /*return*/];
                }
            });
        }); };
        //选择客户--给调用页面返回客户id
        _this.selectCustomer = function (customerid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var addcustomerId;
            return tslib_1.__generator(this, function (_a) {
                addcustomerId = this.tuidCustomer.boxId(customerid);
                this.returnCall(addcustomerId);
                return [2 /*return*/];
            });
        }); };
        _this.cApp = cApp;
        var _a = _this.cApp, cUqSalesTask = _a.cUqSalesTask, cUqCustomer = _a.cUqCustomer;
        _this.tuidCustomer = cUqSalesTask.tuid("customer");
        _this.querySearchCustomer = cUqCustomer.query("searchcustomer");
        return _this;
    }
    //初始化
    CCustomer.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VCustomer, param);
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CCustomer.prototype, "pageCustomer", void 0);
    tslib_1.__decorate([
        observable
    ], CCustomer.prototype, "customerlist", void 0);
    return CCustomer;
}(Controller));
export { CCustomer };
//# sourceMappingURL=CCustomer.js.map