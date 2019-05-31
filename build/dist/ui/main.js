import * as tslib_1 from "tslib";
import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva';
var color = function (selected) { return selected === true ? 'text-primary' : 'text-muted'; };
var VHome = /** @class */ (function (_super) {
    tslib_1.__extends(VHome, _super);
    function VHome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function (param) {
            var _a = _this.controller, cSalesTask = _a.cSalesTask, cCustomer = _a.cCustomer, cProduct = _a.cProduct, cMe = _a.cMe;
            var faceTabs = [
                { name: 'home', label: '任务', content: cSalesTask.tab, icon: 'home', notify: undefined /*store.homeCount*/ },
                { name: 'member', label: '客户', content: cCustomer.tab, icon: 'vcard' },
                { name: 'member', label: '产品', content: cProduct.tab, icon: 'flask' },
                { name: 'member', label: '我', content: cMe.tab, icon: 'user' }
            ].map(function (v) {
                var name = v.name, label = v.label, icon = v.icon, content = v.content, notify = v.notify;
                return {
                    name: name,
                    caption: function (selected) { return TabCaptionComponent(label, icon, color(selected)); },
                    content: content,
                    notify: notify,
                };
            });
            return React.createElement(Page, { header: false },
                React.createElement(Tabs, { tabs: faceTabs }));
        };
        return _this;
    }
    VHome.prototype.open = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openPage(this.render);
                return [2 /*return*/];
            });
        });
    };
    return VHome;
}(VPage));
export { VHome };
//# sourceMappingURL=main.js.map