import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List, SearchBox, FA } from 'tonva-react-form';
import { observable } from 'mobx';
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
            var _a = _this.controller, showCustomerDetail = _a.showCustomerDetail, pageCustomer = _a.pageCustomer;
            var add = React.createElement("div", { className: "cursor-pointer px-3 py-1" },
                React.createElement(FA, { name: "plus" }));
            var none = React.createElement("div", { className: "my-3 mx-2 text-warning" }, "\u8BF7\u641C\u7D22\u5BA2\u6237\uFF01");
            React.createElement("br", null);
            var header = React.createElement(LMR, { className: "pl-3 py-2 bg-primary text-white", right: add },
                React.createElement("div", { className: "d-flex h-100 align-items-center" }, "\u5BA2\u6237"));
            var size = "sm";
            return React.createElement(Page, { header: header },
                React.createElement(SearchBox, { className: "px-1 w-100  mt-2 mr-2 ", size: size, onSearch: function (key) { return _this.controller.searchByKey(key); }, placeholder: "\u641C\u7D22\u5BA2\u6237\u59D3\u540D\u3001\u5355\u4F4D" }),
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
        return React.createElement(LMR, { className: "px-3 py-2" },
            React.createElement("div", { className: "font-weight-bold" }),
            React.createElement("div", null, name));
    };
    tslib_1.__decorate([
        observable
    ], VCustomerList.prototype, "tasks", void 0);
    return VCustomerList;
}(VPage));
export { VCustomerList };
//# sourceMappingURL=VCustomerList.js.map