import * as tslib_1 from "tslib";
import * as React from 'react';
import { PageItems, Controller } from 'tonva';
import { observable } from 'mobx';
import { VCustomerSelect } from './VCustomerSelect';
import { VCustomerDetail } from './VCustomerDetail';
import { observer } from 'mobx-react';
import { VCustomerList } from './VCustomerList';
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
                this.pageCustomer = new PageCustomer(this.querySearchCustomer);
                this.pageCustomer.first({ key: key });
                return [2 /*return*/];
            });
        }); };
        //加载客户明细
        _this.loadCustomerDetail = function (customerid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tuidCustomer.load(customerid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        //查询客户--通过ID
        _this.showCustomerDetail = function (customerid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var customer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCustomerDetail(customerid)];
                    case 1:
                        customer = _a.sent();
                        this.openVPage(VCustomerDetail, customer);
                        return [2 /*return*/];
                }
            });
        }); };
        //选择客户--给调用页面返回客户id
        _this.selectCustomer = function (customer) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.task.customer = customer;
                this.cApp.cSalesTask.showCrateCheck(this.task);
                return [2 /*return*/];
            });
        }); };
        //选择客户--给调用页面返回客户id
        _this.returnCustomer = function (customer) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.returnCall(customer);
                return [2 /*return*/];
            });
        }); };
        _this.render = observer(function () {
            _this.pageCustomer = null;
            return _this.renderView(VCustomerList);
        });
        _this.tab = function () {
            return React.createElement(_this.render, null);
        };
        _this.cApp = cApp;
        var cUqCustomer = _this.cApp.cUqCustomer;
        _this.tuidCustomer = cUqCustomer.tuid("customer");
        _this.querySearchCustomer = cUqCustomer.query("searchcustomer");
        return _this;
    }
    //初始化
    CCustomer.prototype.internalStart = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.pageCustomer = null;
                this.task = task;
                this.openVPage(VCustomerSelect);
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CCustomer.prototype, "pageCustomer", void 0);
    return CCustomer;
}(Controller));
export { CCustomer };
//# sourceMappingURL=CCustomer.js.map