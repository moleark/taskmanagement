import * as tslib_1 from "tslib";
import * as React from 'react';
import { PageItems, Controller } from 'tonva-tools';
import { VSalesTaskList } from './VSalesTaskList';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { VSalesTaskComplet } from './VSalesTaskComplet';
import { VSalesTaskExtension } from './VSalesTaskExtension';
import { VSalesTaskAdd } from './VSalesTaskAdd';
import { VSalesTaskHistory } from './VSalesTaskHistory';
import { createTaskTypes } from 'salestask/createTaskTypes';
var PageSalesTask = /** @class */ (function (_super) {
    tslib_1.__extends(PageSalesTask, _super);
    function PageSalesTask(searchsalestskQuery) {
        var _this = _super.call(this) || this;
        _this.firstSize = _this.pageSize = 10;
        _this.searchsalestskQuery = searchsalestskQuery;
        return _this;
    }
    PageSalesTask.prototype.load = function (param, pageStart, pageSize) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (pageStart === undefined)
                            pageStart = 0;
                        return [4 /*yield*/, this.searchsalestskQuery.page(param, pageStart, pageSize)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    PageSalesTask.prototype.setPageStart = function (item) {
        this.pageStart = item === undefined ? 0 : item.id;
    };
    return PageSalesTask;
}(PageItems));
/**
 *
 */
var CSalesTask = /** @class */ (function (_super) {
    tslib_1.__extends(CSalesTask, _super);
    //private tasks: [];
    function CSalesTask(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.taskTypes = {};
        _this.searchByKey = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var task;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qeuryGettask.table({})];
                    case 1:
                        task = _a.sent();
                        //let task = await this.taskTuid.search(key, 0, 100);
                        this.tasks = task;
                        return [2 /*return*/];
                }
            });
        }); };
        //搜索沟通记录
        _this.searchSalesTaskHistory = function (customerid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var task;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qeurySearchHistory.table({ customerid: customerid })];
                    case 1:
                        task = _a.sent();
                        this.tasks = task;
                        return [2 /*return*/];
                }
            });
        }); };
        //显示沟通记录
        _this.showSalesTaskHistory = function (customerid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var param, task;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = ({ customerid: customerid });
                        return [4 /*yield*/, this.qeurySearchHistory.table({ customerid: customerid })];
                    case 1:
                        task = _a.sent();
                        this.openVPage(VSalesTaskHistory, task);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.render = observer(function () {
            return _this.renderView(VSalesTaskList);
        });
        _this.tab = function () {
            return React.createElement(_this.render, null);
        };
        //显示销售任务明细页面
        _this.showSalesTaskDetail = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.getCTaskType(task).showDetail(task);
                return [2 /*return*/];
            });
        }); };
        //加载销售任务明细页面数据
        _this.lodeSalesTaskDetail = function (salestaskid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var salestask;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskTuid.load(salestaskid)];
                    case 1:
                        salestask = _a.sent();
                        return [2 /*return*/, salestask];
                }
            });
        }); };
        //显示任务完结页面
        _this.showSalesTaskComplet = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VSalesTaskComplet, model);
                return [2 /*return*/];
            });
        }); };
        //显示任务延期页面
        _this.showSalesTaskExtension = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VSalesTaskExtension, model);
                return [2 /*return*/];
            });
        }); };
        //无效任务
        _this.onInvalidTask = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var param, index;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = { taskid: model.id, result: "无效任务" };
                        return [4 /*yield*/, this.completionTaskAction.submit(param)];
                    case 1:
                        _a.sent();
                        index = this.tasks.findIndex(function (v) { return v.id === model.id; });
                        if (index >= 0)
                            this.tasks.splice(index, 1);
                        this.closePage(1);
                        return [2 /*return*/];
                }
            });
        }); };
        //显示任务添加页面
        _this.showSalesTaskType = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cSalesTaskType;
            return tslib_1.__generator(this, function (_a) {
                cSalesTaskType = this.cApp.cSalesTaskType;
                cSalesTaskType.start();
                return [2 /*return*/];
            });
        }); };
        //显示任务添加页面
        _this.showSalesTaskAdd = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VSalesTaskAdd, model);
                return [2 /*return*/];
            });
        }); };
        //添加任务
        _this.addSalesTask = function (param) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var customer, type, description, priorty, deadline, customerId, typeId, model, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customer = param.customer, type = param.type, description = param.description, priorty = param.priorty, deadline = param.deadline;
                        customerId = customer.id;
                        typeId = type.id;
                        priorty = priorty ? 1 : 0;
                        model = { id: undefined, description: description, customer: customerId, type: typeId, sourceID: "", sourceType: "", sourceNo: "", priorty: priorty, deadline: deadline };
                        return [4 /*yield*/, this.addTaskAction.submit(model)];
                    case 1:
                        ret = _a.sent();
                        model.id = ret.id;
                        //添加任务--前台页面
                        this.tasks.unshift({
                            id: ret.id,
                            description: description,
                            customer: this.tuidCustomer.boxId(customerId),
                            type: this.taskTypeTuid.boxId(typeId),
                            sourceID: "",
                            sourceType: "",
                            sourceNo: "",
                            priorty: priorty,
                            deadline: deadline
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        //调用客户列表页面
        _this.pickCustomer = function (context, name, value) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cCustomer, customerid;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cCustomer = this.cApp.cCustomer;
                        return [4 /*yield*/, cCustomer.call()];
                    case 1:
                        customerid = _a.sent();
                        return [2 /*return*/, customerid];
                }
            });
        }); };
        //调用客户列表页面
        _this.pickTaskType = function (context, name, value) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cSalesTaskType, taskTypeId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cSalesTaskType = this.cApp.cSalesTaskType;
                        return [4 /*yield*/, cSalesTaskType.call()];
                    case 1:
                        taskTypeId = _a.sent();
                        return [2 /*return*/, taskTypeId];
                }
            });
        }); };
        //显示客户明细页面
        _this.showCustomerDetail = function (customerId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cCustomer;
            return tslib_1.__generator(this, function (_a) {
                cCustomer = this.cApp.cCustomer;
                cCustomer.showCustomerDetail(customerId);
                return [2 /*return*/];
            });
        }); };
        _this.cApp = cApp;
        var _a = _this.cApp, cUqSalesTask = _a.cUqSalesTask, cUqCustomer = _a.cUqCustomer;
        _this.taskTuid = cUqSalesTask.tuid("task");
        _this.tuidCustomer = cUqCustomer.tuid('customer');
        _this.taskTypeTuid = cUqSalesTask.tuid("tasktype");
        _this.taskBook = cUqSalesTask.book("taskbook");
        _this.completionTaskAction = cUqSalesTask.action('CompletionTask');
        _this.extensionTaskAction = cUqSalesTask.action('ExtensionTask');
        _this.addTaskAction = cUqSalesTask.action('AddTask');
        _this.qeuryGettask = cUqSalesTask.query("Gettask");
        _this.qeurySearchHistory = cUqSalesTask.query("searchhistorytask");
        _this.taskTypes = createTaskTypes(_this);
        return _this;
    }
    CSalesTask.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchByKey(param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CSalesTask.prototype.getCTaskType = function (task) {
        var typeName = task.typeName;
        var tt = this.taskTypes[typeName];
        if (tt === undefined) {
            throw typeName + ' is not defined';
        }
        return tt;
    };
    //完结任务
    CSalesTask.prototype.completionTask = function (taskid, result, resulttype) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var param, index;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = { taskid: taskid, result: result };
                        return [4 /*yield*/, this.completionTaskAction.submit(param)];
                    case 1:
                        _a.sent();
                        index = this.tasks.findIndex(function (v) { return v.id === taskid; });
                        if (index >= 0)
                            this.tasks.splice(index, 1);
                        this.closePage(2);
                        return [2 /*return*/];
                }
            });
        });
    };
    //延期任务
    CSalesTask.prototype.extensionTask = function (taskid, result, resulttype, date) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var param;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = { taskid: taskid, result: result, deadline: date };
                        return [4 /*yield*/, this.extensionTaskAction.submit(param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        observable
    ], CSalesTask.prototype, "tasks", void 0);
    return CSalesTask;
}(Controller));
export { CSalesTask };
//# sourceMappingURL=CSalesTask.js.map