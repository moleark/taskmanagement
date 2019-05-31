import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage } from 'tonva';
import { observer } from 'mobx-react';
var VDetail = /** @class */ (function (_super) {
    tslib_1.__extends(VDetail, _super);
    function VDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function (task) {
            return _this.render(task);
        });
        return _this;
    }
    VDetail.prototype.open = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, task);
                return [2 /*return*/];
            });
        });
    };
    VDetail.prototype.render = function (task) {
        return React.createElement(React.Fragment, null, "\u5927\u5305\u88C5\u8BD5\u5242\u53EF\u586B\u5B57\u6BB5");
    };
    return VDetail;
}(VPage));
export { VDetail };
//# sourceMappingURL=VDetail.js.map