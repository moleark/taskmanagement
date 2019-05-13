import { TypeB } from './typeB';
import { TypeA } from './typeA';
var TaskType = /** @class */ (function () {
    function TaskType() {
    }
    TaskType.create = function (typeName) {
        switch (typeName) {
            case 'typeA': return new TypeA();
            case 'typeB': return new TypeB();
        }
    };
    return TaskType;
}());
export { TaskType };
//# sourceMappingURL=type.js.map