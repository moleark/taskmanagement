import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, SearchBox, FA } from 'tonva';
var VCustomerList = /** @class */ (function (_super) {
    tslib_1.__extends(VCustomerList, _super);
    function VCustomerList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickCustomer = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controller.showCustomerDetail(model.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (customer) {
            var pageCustomer = _this.controller.pageCustomer;
            var add = React.createElement("div", { className: "cursor-pointer" },
                React.createElement(FA, { name: "plus" }));
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u8BF7\u641C\u7D22\u5BA2\u6237\uFF01");
            return React.createElement(Page, { header: '\u5BA2\u6237', headerClassName: 'bg-primary py-1 px-3' },
                React.createElement(SearchBox, { className: "px-1 w-100  mt-2 mr-2  ", size: 'md', onSearch: function (key) { return _this.controller.searchByKey(key); }, placeholder: "\u641C\u7D22\u5BA2\u6237\u59D3\u540D\u3001\u5355\u4F4D" }),
                React.createElement(List, { before: '', none: none, items: pageCustomer, item: { render: _this.renderCustomer, onClick: _this.onClickCustomer } }));
        });
        return _this;
    }
    VCustomerList.prototype.open = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.page, customer);
                return [2 /*return*/];
            });
        });
    };
    //每个视图都有一个render方法， 用于自定义页面
    VCustomerList.prototype.render = function (member) {
        return React.createElement(this.page, null);
    };
    VCustomerList.prototype.renderCustomer = function (salesTask, index) {
        var name = salesTask.name;
        return React.createElement(LMR, { className: "px-3 py-2 ", left: React.createElement(FA, { name: 'user', className: ' my-2 mr-3 text-info' }) },
            React.createElement("div", { className: "font-weight-bold" }),
            React.createElement("div", null, name));
    };
    return VCustomerList;
}(VPage));
export { VCustomerList };
//# sourceMappingURL=VCustomerList.js.map