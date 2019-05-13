import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, PropGrid } from 'tonva-react-form';
var VCustomerDetail = /** @class */ (function (_super) {
    tslib_1.__extends(VCustomerDetail, _super);
    function VCustomerDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = observer(function (customer) {
            var rows = [
                {
                    type: 'component',
                    name: 'customer',
                    component: React.createElement(LMR, { className: "cursor-pointer w-100", right: React.createElement("div", { className: "w-2c text-right" },
                            React.createElement("i", { className: "fa fa-chevron-right" })) }, "\u5317\u4EAC\u5927\u5B66"),
                    label: '单位',
                    full: false
                },
                {
                    type: 'string',
                    name: 'no',
                    label: '编号'
                },
                {
                    type: 'string',
                    name: 'name',
                    label: '姓名'
                },
                {
                    type: 'string',
                    name: 'gender',
                    label: '性别',
                },
                {
                    type: 'string',
                    name: 'birthday',
                    label: '生日'
                },
                {
                    type: 'string',
                    name: 'birthday',
                    label: '领域'
                },
                {
                    type: 'string',
                    name: 'birthday',
                    label: 'TOP单位'
                }
            ];
            return React.createElement(Page, { header: "\u5BA2\u6237\u8BE6\u60C5" },
                React.createElement(PropGrid, { rows: rows, values: customer, alignValue: "right" }));
        });
        return _this;
    }
    VCustomerDetail.prototype.open = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, customer);
                return [2 /*return*/];
            });
        });
    };
    return VCustomerDetail;
}(VPage));
export { VCustomerDetail };
//# sourceMappingURL=VCustomerDetail.js.map