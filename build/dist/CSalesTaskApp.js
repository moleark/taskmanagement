import * as tslib_1 from "tslib";
import { CApp } from 'tonva';
import { CSalesTask } from 'salestask';
import { consts } from './consts';
import { CCustomer } from 'customer/CCustomer';
import { CProduct } from 'product/CProduct';
import { CMe } from 'me/CMe';
var CSalesTaskApp = /** @class */ (function (_super) {
    tslib_1.__extends(CSalesTaskApp, _super);
    function CSalesTaskApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CSalesTaskApp.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /** 初始化 QU*/
                        this.cUqSalesTask = this.getCUq(consts.uqSalesTask);
                        this.cUqCustomer = this.getCUq(consts.uqCustomer);
                        this.cUqProduct = this.getCUq(consts.uqProduct);
                        /** 初始化 Conctrolle*/
                        this.cCustomer = new CCustomer(this, undefined);
                        this.cProduct = new CProduct(this, undefined);
                        this.cSalesTask = new CSalesTask(this, this.res);
                        this.cMe = new CMe(this, undefined);
                        /** 启动销售任务列表*/
                        this.cSalesTask.start();
                        /** 启动主程序*/
                        return [4 /*yield*/, _super.prototype.internalStart.call(this, param)];
                    case 1:
                        /** 启动主程序*/
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CSalesTaskApp;
}(CApp));
export { CSalesTaskApp };
//# sourceMappingURL=CSalesTaskApp.js.map