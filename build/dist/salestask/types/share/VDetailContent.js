import * as tslib_1 from "tslib";
import * as React from 'react';
import { View } from 'tonva';
import { FA } from 'tonva';
var VDetailContent = /** @class */ (function (_super) {
    tslib_1.__extends(VDetailContent, _super);
    function VDetailContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VDetailContent.prototype.render = function (task) {
        var model = this.controller.cSalesTask.getCommonType(task.bizName);
        var completuiSchema = model.taskCommonType.completuiSchema;
        var fields = task.fields;
        if (fields === undefined)
            return React.createElement(React.Fragment, null);
        return React.createElement("div", { className: 'w-100' }, fields.map(function (v, index) {
            var fieldName = v.fieldName, value = v.value;
            var _a = completuiSchema.items[fieldName], label = _a.label, list = _a.list;
            var left = React.createElement("div", { className: '' },
                React.createElement(FA, { name: 'caret-right', className: 'small text-info', fixWidth: true }),
                label || fieldName);
            var selectItem = list.find(function (v) { return v.value === value; });
            return React.createElement("div", { className: 'row bg-white py-2', key: index },
                React.createElement("div", { className: "col-4 align-self-center" }, left),
                React.createElement("div", { className: "col-8" },
                    selectItem ? selectItem.title : value,
                    " "));
        }));
    };
    return VDetailContent;
}(View));
export { VDetailContent };
//# sourceMappingURL=VDetailContent.js.map