import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import { StringItemEdit } from './stringItemEdit';
import { ImageItemEdit } from './imageItemEdit';
import { Image } from '../image';
var Edit = /** @class */ (function (_super) {
    tslib_1.__extends(Edit, _super);
    function Edit(props) {
        var _this = _super.call(this, props) || this;
        _this.defaultSepClassName = "border-top edit-sep-light-gray";
        _this.defaultRowContainerClassName = "d-flex px-3 py-2 cursor-pointer bg-white align-items-center";
        _this.rowClick = function (itemSchema, uiItem, label, value) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, onItemChanged, onItemClick, changeValue, itemEdit, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onItemChanged = _a.onItemChanged, onItemClick = _a.onItemClick;
                        if (!(onItemClick !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, onItemClick(itemSchema, uiItem, value)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                    case 2:
                        itemEdit = createItemEdit(itemSchema, uiItem, label, value);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, , 10]);
                        return [4 /*yield*/, itemEdit.start()];
                    case 4:
                        changeValue = _b.sent();
                        if (!(changeValue != value)) return [3 /*break*/, 7];
                        if (!(onItemChanged === undefined)) return [3 /*break*/, 5];
                        alert(itemSchema.name + " value changed, new: " + changeValue + ", pre: " + value);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, onItemChanged(itemSchema, changeValue, value)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [4 /*yield*/, itemEdit.end()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_1 = _b.sent();
                        console.log('no value changed');
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        var topBorderClassName = props.topBorderClassName, bottomBorderClassName = props.bottomBorderClassName, sepClassName = props.sepClassName, rowContainerClassName = props.rowContainerClassName, uiSchema = props.uiSchema;
        _this.topBorder = React.createElement("div", { className: topBorderClassName || _this.defaultSepClassName });
        _this.bottomBorder = React.createElement("div", { className: bottomBorderClassName || _this.defaultSepClassName });
        _this.rowContainerClassName = rowContainerClassName || _this.defaultRowContainerClassName;
        _this.sep = React.createElement("div", { className: sepClassName || _this.defaultSepClassName });
        _this.uiSchema = (uiSchema && uiSchema.items) || {};
        return _this;
    }
    Edit.prototype.render = function () {
        var elItems = [];
        var schema = this.props.schema;
        var len = schema.length;
        elItems.push(this.topBorder);
        for (var i = 0; i < len; i++) {
            if (i > 0)
                elItems.push(this.sep);
            elItems.push(this.renderRow(schema[i]));
        }
        elItems.push(this.bottomBorder);
        return React.createElement("div", null, elItems.map(function (v, index) { return React.createElement(React.Fragment, { key: index }, v); }));
    };
    Edit.prototype.renderRow = function (itemSchema) {
        var _this = this;
        var name = itemSchema.name, type = itemSchema.type;
        var divValue;
        var uiItem = this.uiSchema[name];
        var label = (uiItem && uiItem.label) || name;
        var value = this.props.data[name];
        switch (type) {
            default:
                divValue = value ? React.createElement("b", null, value) : React.createElement("small", { className: "text-muted" }, "(\u65E0)");
                break;
            case 'image':
                divValue = React.createElement(Image, { className: "w-4c h-4c", src: value });
                break;
        }
        return React.createElement("div", { className: this.rowContainerClassName, onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rowClick(itemSchema, uiItem, label, value)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); } },
            React.createElement("div", { className: "w-6c" }, label),
            React.createElement("div", { className: "flex-fill d-flex justify-content-end" }, divValue),
            React.createElement("div", { className: "w-2c text-right" },
                React.createElement("i", { className: "fa fa-chevron-right" })));
    };
    Edit = tslib_1.__decorate([
        observer
    ], Edit);
    return Edit;
}(React.Component));
export { Edit };
function createItemEdit(itemSchema, uiItem, label, value) {
    var itemEdit;
    if (uiItem !== undefined) {
        switch (uiItem.widget) {
            case 'text':
                itemEdit = StringItemEdit;
                break;
            case 'image':
                itemEdit = ImageItemEdit;
                break;
        }
    }
    else {
        switch (itemSchema.type) {
            case 'string':
                itemEdit = StringItemEdit;
                break;
            case 'image':
                itemEdit = ImageItemEdit;
                break;
        }
    }
    if (itemEdit === undefined)
        return;
    return new itemEdit(itemSchema, uiItem, label, value);
}
//# sourceMappingURL=edit.js.map