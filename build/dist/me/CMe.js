import * as tslib_1 from "tslib";
import * as React from 'react';
import { Controller } from 'tonva';
import { observer } from 'mobx-react';
import { VMe } from './VMe';
/**
 *
 */
var CMe = /** @class */ (function (_super) {
    tslib_1.__extends(CMe, _super);
    //构造函数
    function CMe(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.render = observer(function () {
            return _this.renderView(VMe);
        });
        _this.tab = function () {
            return React.createElement(_this.render, null);
        };
        _this.cApp = cApp;
        var _a = _this.cApp, cUqSalesTask = _a.cUqSalesTask, cUqCustomer = _a.cUqCustomer;
        _this.tuidCustomer = cUqSalesTask.tuid("customer");
        _this.querySearchCustomer = cUqCustomer.query("searchcustomer");
        return _this;
    }
    //初始化
    CMe.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VMe, param);
                return [2 /*return*/];
            });
        });
    };
    return CMe;
}(Controller));
export { CMe };
//# sourceMappingURL=CMe.js.map