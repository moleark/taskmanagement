import { TypeB } from './typeB';
import { TypeA } from './typeA';

export abstract class TaskType {
    static create(typeName: string) {
        switch (typeName) {
            case 'typeA': return new TypeA();
            case 'typeB': return new TypeB();
        }
    }

    edit: any;
    action: any;
}

