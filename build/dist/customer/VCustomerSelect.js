import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, SearchBox, FA } from 'tonva';
var VCustomerSelect = /** @class */ (function (_super) {
    tslib_1.__extends(VCustomerSelect, _super);
    function VCustomerSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickCustomer = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.selectCustomer(model)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (customer) {
            var pageCustomer = _this.controller.pageCustomer;
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u8BF7\u641C\u7D22\u5BA2\u6237\uFF01");
            return React.createElement(Page, { header: "\u9009\u62E9\u5BA2\u6237", headerClassName: 'bg-primary' },
                React.createElement(SearchBox, { className: "px-1 w-100  mt-2 mr-2", size: 'md', onSearch: function (key) { return _this.controller.searchByKey(key); }, placeholder: "\u641C\u7D22\u5BA2\u6237\u59D3\u540D\u3001\u5355\u4F4D" }),
                React.createElement(List, { before: '', none: none, items: pageCustomer, item: { render: _this.renderCustomer, onClick: _this.onClickCustomer } }));
        });
        return _this;
    }
    VCustomerSelect.prototype.open = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, customer);
                return [2 /*return*/];
            });
        });
    };
    VCustomerSelect.prototype.renderCustomer = function (salesTask, index) {
        var name = salesTask.name;
        return React.createElement(LMR, { className: "px-3 py-2 ", left: React.createElement(FA, { name: 'user', className: ' my-2 mr-3 text-info' }) },
            React.createElement("div", { className: "font-weight-bold" }),
            React.createElement("div", null, name));
    };
    return VCustomerSelect;
}(VPage));
export { VCustomerSelect };
//# sourceMappingURL=VCustomerSelect.js.map