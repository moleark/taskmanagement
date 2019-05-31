import * as tslib_1 from "tslib";
import * as React from 'react';
import { FA } from 'tonva';
import { CType } from '../CType';
import { VCreate } from './VCreate';
var 试剂报价跟踪 = /** @class */ (function (_super) {
    tslib_1.__extends(试剂报价跟踪, _super);
    function 试剂报价跟踪() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = React.createElement(FA, { name: 'flask', size: "lg", fixWidth: true });
        return _this;
    }
    试剂报价跟踪.prototype.internalStart = function (param) {
        return;
    };
    /**
     protected renderContent = (task: Task): JSX.Element => {
         return this.renderView(VDetail, task);
    }
    */
    试剂报价跟踪.prototype.showCreate = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VCreate, task);
                return [2 /*return*/];
            });
        });
    };
    return 试剂报价跟踪;
}(CType));
export { 试剂报价跟踪 };
//# sourceMappingURL=index.js.map