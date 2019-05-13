import * as tslib_1 from "tslib";
export var isDevelopment = process.env.NODE_ENV === 'development';
var centerHost = process.env['REACT_APP_CENTER_HOST'];
var centerDebugHost = 'localhost:3000'; //'192.168.86.64';
var resHost = process.env['REACT_APP_RES_HOST'] || centerHost;
var resDebugHost = 'localhost:3015'; //'192.168.86.63';
var uqDebugHost = 'localhost:3015'; //'192.168.86.63';
var uqDebugBuilderHost = 'localhost:3009';
var hosts = {
    centerhost: {
        value: process.env['REACT_APP_CENTER_DEBUG_HOST'] || centerDebugHost,
        local: false
    },
    reshost: {
        value: process.env['REACT_APP_RES_DEBUG_HOST'] || resDebugHost,
        local: false
    },
    uqhost: {
        value: process.env['REACT_APP_UQ_DEBUG_HOST'] || uqDebugHost,
        local: false
    },
    unitxhost: {
        value: process.env['REACT_APP_UQ_DEBUG_HOST'] || uqDebugHost,
        local: false
    },
    "uq-build": {
        value: process.env['REACT_APP_UQ_DEBUG_BUILDER_HOST'] || uqDebugBuilderHost,
        local: false
    }
};
function centerUrlFromHost(host) { return "http://" + host + "/"; }
function centerWsFromHost(host) { return "ws://" + host + "/tv/"; }
var fetchOptions = {
    method: "GET",
    mode: "no-cors",
    headers: {
        "Content-Type": "text/plain"
    },
};
var Host = /** @class */ (function () {
    function Host() {
    }
    Host.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var host;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(isDevelopment === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tryLocal()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        host = this.getCenterHost();
                        this.url = centerUrlFromHost(host);
                        this.ws = centerWsFromHost(host);
                        this.resHost = this.getResHost();
                        return [2 /*return*/];
                }
            });
        });
    };
    Host.prototype.debugHostUrl = function (host) { return "http://" + host + "/hello"; };
    Host.prototype.tryLocal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises, hostArr, _loop_1, i, _i, hostArr_1, host_1, fetchUrl, results, len, i, local, host_2, j, hostValue;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        hostArr = [];
                        _loop_1 = function (i) {
                            var hostValue = hosts[i];
                            var value = hostValue.value;
                            if (hostArr.findIndex(function (v) { return v === value; }) < 0)
                                hostArr.push(value);
                        };
                        for (i in hosts) {
                            _loop_1(i);
                        }
                        for (_i = 0, hostArr_1 = hostArr; _i < hostArr_1.length; _i++) {
                            host_1 = hostArr_1[_i];
                            fetchUrl = this.debugHostUrl(host_1);
                            promises.push(localCheck(fetchUrl));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        results = _a.sent();
                        len = hostArr.length;
                        for (i = 0; i < len; i++) {
                            local = results[i];
                            host_2 = hostArr[i];
                            for (j in hosts) {
                                hostValue = hosts[j];
                                if (hostValue.value === host_2) {
                                    hostValue.local = local;
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Host.prototype.getCenterHost = function () {
        var _a = hosts.centerhost, value = _a.value, local = _a.local;
        var hash = document.location.hash;
        if (hash.includes('sheet_debug') === true) {
            return value;
        }
        if (isDevelopment === true) {
            if (local === true)
                return value;
        }
        return centerHost;
    };
    Host.prototype.getResHost = function () {
        var _a = hosts.reshost, value = _a.value, local = _a.local;
        var hash = document.location.hash;
        if (hash.includes('sheet_debug') === true) {
            return value;
        }
        if (isDevelopment === true) {
            if (local === true)
                return value;
        }
        return resHost;
    };
    Host.prototype.getUrlOrDebug = function (url, urlDebug) {
        if (isDevelopment !== true)
            return url;
        if (!urlDebug)
            return url;
        for (var i in hosts) {
            var host_3 = hosts[i];
            var value = host_3.value, local = host_3.local;
            var hostString = "://" + i + "/";
            var pos = urlDebug.indexOf(hostString);
            if (pos > 0) {
                if (local === false)
                    return url;
                urlDebug = urlDebug.replace(hostString, "://" + value + "/");
                return urlDebug;
            }
        }
        return url;
    };
    Host.prototype.localCheck = function (urlDebug) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localCheck(urlDebug)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Host;
}());
export var host = new Host();
// 因为测试的都是局域网服务器，甚至本机服务器，所以一秒足够了
// 网上找了上面的fetch timeout代码。
// 尽管timeout了，fetch仍然继续，没有cancel
// 实际上，一秒钟不够。web服务器会自动停。重启的时候，可能会比较长时间。也许两秒甚至更多。
//const timeout = 2000;
var timeout = 200;
function fetchLocalCheck(url) {
    return new Promise(function (resolve, reject) {
        fetch(url, fetchOptions)
            .then(function (v) {
            v.text().then(resolve).catch(reject);
        })
            .catch(reject);
        var e = new Error("Connection timed out");
        setTimeout(reject, timeout, e);
    });
}
function localCheck(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchLocalCheck(url)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=host.js.map