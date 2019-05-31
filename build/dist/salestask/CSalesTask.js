import * as tslib_1 from "tslib";
import * as React from 'react';
import { FA } from 'tonva';
import { PageItems, Controller } from 'tonva';
import { VMain } from './views/VMain';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { VSalesTaskExtension } from './views/VSalesTaskExtension';
import { VTaskHistory } from './views/VTaskHistory';
import { createTaskTypes } from 'salestask/types/createTypes';
import { CSelectType } from './type';
import { Tasks } from './model/tasks';
import { VSalesTaskInvalid } from './views/VSalesTaskInvalid';
import { VEmployeeHistory } from './views/VEmployeeHistory';
import { VCustomerHistory } from './views/VCustomerHistory';
import { CSelectBiz } from './type/CSelectBiz';
import { VCreateCheck } from './views/VCreateCheck';
import { VCreateProduct } from './types/commonType/VCreateProduct';
import { VProductDetail } from './types/commonType/VProductDetail';
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
    function CSalesTask(cApp, res) {
        var _this = _super.call(this, res) || this;
        _this.taskTypes = {};
        //搜索开始------------------------------------------------
        //搜索所有未处理任务
        _this.searchTaskByKey = function (key) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var tasks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qeurySearchTask.table({})];
                    case 1:
                        tasks = _a.sent();
                        this.tasks = new Tasks(tasks);
                        return [2 /*return*/];
                }
            });
        }); };
        //搜索单个任务
        _this.loadTask = function (taskid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var task, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.taskTuid.load(taskid)];
                    case 1:
                        task = _b.sent();
                        _a = task;
                        return [4 /*yield*/, this.searchTaskCompletion(taskid)];
                    case 2:
                        _a.fields = _b.sent();
                        return [2 /*return*/, task];
                }
            });
        }); };
        //搜索处理结果的记录
        _this.searchTaskCompletion = function (taskid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qeurySearchTaskCompletion.table({ taskid: taskid })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        //显示任务沟通记录
        _this.showTaskHistory = function (taskid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var tasks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qeurySearchHistory.table({ taskid: taskid })];
                    case 1:
                        tasks = _a.sent();
                        this.openVPage(VTaskHistory, { tasks: tasks });
                        return [2 /*return*/];
                }
            });
        }); };
        //显示员工沟通记录
        _this.showEmployeeHistory = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var tasks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qeurySearchEmployeeHistory.table({})];
                    case 1:
                        tasks = _a.sent();
                        this.openVPage(VEmployeeHistory, { tasks: tasks });
                        return [2 /*return*/];
                }
            });
        }); };
        //显示客户沟通记录
        _this.showCustomerHistory = function (customerid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var tasks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qeurySearchCustomerHistory.table({ customerid: customerid })];
                    case 1:
                        tasks = _a.sent();
                        this.openVPage(VCustomerHistory, { tasks: tasks });
                        return [2 /*return*/];
                }
            });
        }); };
        //搜索结束------------------------------------------------
        //显示开始------------------------------------------------
        //显示销售任务明细页面
        _this.showTaskDetailEdit = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var tt;
            return tslib_1.__generator(this, function (_a) {
                tt = this.getCTaskType(task.bizName);
                if (tt !== undefined)
                    tt.showDetailEdit(task);
                return [2 /*return*/];
            });
        }); };
        //显示销售任务明细页面
        _this.showDetailFromId = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.getCTaskType(task.bizName).showDetailFromId(task.id);
                return [2 /*return*/];
            });
        }); };
        //显示任务完结页面
        _this.showTaskComplet = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.getCTaskType(task.bizName).showComplet(task);
                return [2 /*return*/];
            });
        }); };
        //添加并完结任务
        _this.createAndFinishTask = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var newtask;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTasks(task)];
                    case 1:
                        newtask = _a.sent();
                        return [4 /*yield*/, this.showTaskComplet(newtask)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        //显示任务延期页面
        _this.showTaskExtension = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VSalesTaskExtension, model);
                return [2 /*return*/];
            });
        }); };
        //显示拒绝任务页面
        _this.showTaskInvalid = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VSalesTaskInvalid, model);
                return [2 /*return*/];
            });
        }); };
        //拒绝任务
        _this.onInvalidTask = function (task, result, resulttype) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var param;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = { taskid: task.id, resulttype: "Inval", result: result };
                        return [4 /*yield*/, this.completionTaskAction.submit(param)];
                    case 1:
                        _a.sent();
                        /*
                        let index = this.tasks.findIndex(v => v.id === model.id);
                        if (index >= 0) this.tasks.splice(index, 1);
                        */
                        this.tasks.remove(task);
                        return [2 /*return*/];
                }
            });
        }); };
        //显示选择产品页面
        _this.showPorductSelect = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cProduct, product, createproduct;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cProduct = this.cApp.cProduct;
                        return [4 /*yield*/, cProduct.call()];
                    case 1:
                        product = _a.sent();
                        createproduct = {
                            task: task,
                            product: product,
                            note: null
                        };
                        this.openVPage(VCreateProduct, createproduct);
                        return [2 /*return*/];
                }
            });
        }); };
        //添加产品
        _this.createProduct = function (createProduct) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var product, task, note, param;
            return tslib_1.__generator(this, function (_a) {
                product = createProduct.product, task = createProduct.task, note = createProduct.note;
                note = note ? note : undefined;
                param = { taskid: task.id, productid: product.id, note: note };
                this.createTaskProductAction.submit(param);
                return [2 /*return*/];
            });
        }); };
        //显示产品列表
        _this.showProductDetail = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var products;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.qeurySearchTaskProduct.table({ taskid: task.id })];
                    case 1:
                        products = _a.sent();
                        this.openVPage(VProductDetail, products);
                        return [2 /*return*/];
                }
            });
        }); };
        //处理任务结束------------------------------------------------
        //添加任务开始------------------------------------------------
        //显示任务类页面
        _this.showSelectTaskType = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //return await this.cSalesTaskType.call();
                    return [4 /*yield*/, this.cSelectType.start()];
                    case 1:
                        //return await this.cSalesTaskType.call();
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        //显示选择处理方式的页面
        _this.showCrateCheck = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.openVPage(VCreateCheck, task);
                return [2 /*return*/];
            });
        }); };
        //添加任务
        _this.createTask = function (param, task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var newtask;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTasks(task)];
                    case 1:
                        newtask = _a.sent();
                        return [4 /*yield*/, this.searchTaskByKey('')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.createTasks = function (task) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var customer, type, biz, description, priorty, deadline, customerId, typeId, bizIds, model, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customer = task.customer, type = task.type, biz = task.biz, description = task.description, priorty = task.priorty, deadline = task.deadline;
                        customerId = customer.id;
                        typeId = type.id;
                        bizIds = biz.id;
                        priorty = priorty ? 1 : 0;
                        deadline = deadline ? deadline : undefined;
                        description = description ? description : undefined;
                        model = { id: undefined, description: description, customer: customerId, type: typeId, biz: bizIds, sourceID: "", sourceType: "", sourceNo: "", priorty: priorty, deadline: deadline };
                        return [4 /*yield*/, this.addTaskAction.submit(model)];
                    case 1:
                        ret = _a.sent();
                        task.id = ret.id;
                        return [2 /*return*/, task];
                }
            });
        }); };
        //添加任务结束------------------------------------------------
        //显示客户明细页面
        _this.showCustomerDetail = function (customerId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cCustomer;
            return tslib_1.__generator(this, function (_a) {
                cCustomer = this.cApp.cCustomer;
                cCustomer.showCustomerDetail(customerId);
                return [2 /*return*/];
            });
        }); };
        _this.render = observer(function () {
            return _this.renderView(VMain);
        });
        _this.tab = function () {
            return React.createElement(_this.render, null);
        };
        _this.cApp = cApp;
        _this.cSelectType = new CSelectType(_this, undefined);
        _this.cSalesTaskBiz = new CSelectBiz(_this, undefined);
        var _a = _this.cApp, cUqSalesTask = _a.cUqSalesTask, cUqCustomer = _a.cUqCustomer;
        _this.taskTuid = cUqSalesTask.tuid("task");
        _this.tuidCustomer = cUqCustomer.tuid('customer');
        _this.taskTypeTuid = cUqSalesTask.tuid("tasktype");
        _this.taskBook = cUqSalesTask.book("taskbook");
        _this.completionTaskAction = cUqSalesTask.action('CompletionTask');
        _this.extensionTaskAction = cUqSalesTask.action('ExtensionTask');
        _this.addTaskAction = cUqSalesTask.action('AddTask');
        _this.createTaskProductAction = cUqSalesTask.action('CreateTaskProduct');
        _this.qeurySearchTask = cUqSalesTask.query("searchtask");
        _this.qeurySearchHistory = cUqSalesTask.query("searchhistorytask");
        _this.qeurySearchEmployeeHistory = cUqSalesTask.query("searchhistorytaskbyemployee");
        _this.qeurySearchCustomerHistory = cUqSalesTask.query("searchhistorytaskbycustomer");
        _this.qeurySearchTaskCompletion = cUqSalesTask.query("searchtaskcompletion");
        _this.qeurySearchTaskProduct = cUqSalesTask.query("SearchTaskProduct");
        _this.taskTypes = createTaskTypes(_this);
        return _this;
    }
    //初始化
    CSalesTask.prototype.internalStart = function (param) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchTaskByKey(param)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //获取类型的图表
    CSalesTask.prototype.getTaskIcon = function (typeName) {
        var tt = this.taskTypes[typeName];
        if (tt === undefined) {
            if (typeName == 'phone') {
                return React.createElement(FA, { name: 'fax', size: "lg", fixWidth: true });
            }
            else {
                return React.createElement(FA, { name: 'car', size: "lg", fixWidth: true });
            }
        }
        return tt.icon;
    };
    //获取任务类型
    CSalesTask.prototype.getCTaskType = function (typeName) {
        return this.taskTypes[typeName];
    };
    //获取任务类型
    CSalesTask.prototype.getCommonType = function (bizName) {
        var model = this.getCTaskType(bizName);
        return model;
    };
    //显示结束------------------------------------------------
    //处理任务开始------------------------------------------------
    //完结任务
    CSalesTask.prototype.finishTask = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var param;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            taskid: task.id,
                            resulttype: "compl",
                            result: "完结",
                            fields: task.fields
                        };
                        return [4 /*yield*/, this.completionTaskAction.submit(param)];
                    case 1:
                        _a.sent();
                        this.tasks.remove(task);
                        this.closePage(2);
                        return [2 /*return*/];
                }
            });
        });
    };
    //延期任务
    CSalesTask.prototype.extensionTask = function (task, result, resulttype, date) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dd, param;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dd = date.getUTCFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
                        param = { taskid: task.id, result: result, remindDate: "2019-06-02" };
                        return [4 /*yield*/, this.extensionTaskAction.submit(param)];
                    case 1:
                        _a.sent();
                        this.tasks.postPone(date, task);
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