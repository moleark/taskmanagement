import * as tslib_1 from "tslib";
import * as React from 'react';
import { nav } from './nav';
var ResUploader = /** @class */ (function (_super) {
    tslib_1.__extends(ResUploader, _super);
    function ResUploader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.upload = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var maxSize, resUrl, files, data, len, i, file, abortController, res, json, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxSize = this.props.maxSize;
                        if (maxSize === undefined || maxSize <= 0)
                            maxSize = 100000000000;
                        else
                            maxSize = maxSize * 1024;
                        resUrl = nav.resUrl + 'upload';
                        files = this.fileInput.files;
                        data = new FormData();
                        len = files.length;
                        for (i = 0; i < len; i++) {
                            file = files[i];
                            if (file.size > maxSize)
                                return [2 /*return*/, null];
                            data.append('files[]', file, file.name);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        abortController = new AbortController();
                        return [4 /*yield*/, fetch(resUrl, {
                                method: "POST",
                                body: data,
                                signal: abortController.signal,
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        json = _a.sent();
                        return [2 /*return*/, ':' + json.res.id];
                    case 4:
                        err_1 = _a.sent();
                        console.error('%s %s', resUrl, err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ResUploader.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, multiple = _a.multiple, onFilesChange = _a.onFilesChange;
        return React.createElement("input", { className: className, ref: function (t) { return _this.fileInput = t; }, onChange: onFilesChange, type: 'file', name: 'file', multiple: multiple });
    };
    return ResUploader;
}(React.Component));
export { ResUploader };
//# sourceMappingURL=resUploader.js.map