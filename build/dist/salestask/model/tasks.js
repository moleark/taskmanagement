import * as tslib_1 from "tslib";
import { observable } from 'mobx';
import _ from 'lodash';
var Tasks = /** @class */ (function () {
    function Tasks(taskArr) {
        this.tasksNow = observable.array([], { deep: true });
        this.dateTasksList = observable.array([], { deep: true });
        for (var _i = 0, taskArr_1 = taskArr; _i < taskArr_1.length; _i++) {
            var task = taskArr_1[_i];
            this.add(task);
        }
    }
    Tasks.prototype.postPone = function (date, task) {
        this.remove(task);
        var t = _.clone(task);
        t.remindDate = date;
        this.add(t);
    };
    Tasks.prototype.add = function (task) {
        var remindDate = task.remindDate;
        if (!remindDate) {
            this.tasksNow.push(task);
            return;
        }
        var dateTasks = this.dateTasksList.find(function (v) { return v.date === remindDate; });
        if (dateTasks === undefined) {
            dateTasks = { date: remindDate, list: [task] };
            // 插入到合适的地方
            this.dateTasksList.push(dateTasks);
        }
        else {
            dateTasks.list.push(task);
        }
    };
    Tasks.prototype.remove = function (task) {
        var index = this.tasksNow.findIndex(function (v) { return v.id === task.id; });
        if (index >= 0) {
            this.tasksNow.splice(index, 1);
            return;
        }
        var len = this.dateTasksList.length;
        for (var i = 0; i < len; i++) {
            var dt = this.dateTasksList[i];
            var list = dt.list;
            index = list.findIndex(function (v) { return v.id === task.id; });
            if (index >= 0) {
                list.splice(index, 1);
                if (list.length === 0) {
                    this.dateTasksList.splice(i, 1);
                }
                return;
            }
        }
    };
    tslib_1.__decorate([
        observable
    ], Tasks.prototype, "tasksNow", void 0);
    tslib_1.__decorate([
        observable
    ], Tasks.prototype, "dateTasksList", void 0);
    return Tasks;
}());
export { Tasks };
//# sourceMappingURL=tasks.js.map