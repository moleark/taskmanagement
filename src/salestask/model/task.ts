export interface Task {
    id: number;
    type: any;
    biz: any;
    description: string;
    remindDate: Date;
    deadline: Date;
    customer: any;
    fields?: TaskField[];
}

export interface TaskType {
    id: number;
    name: string;
    description: string;
}

export interface BizType {
    id: number;
    name: string;
    description: string;
}


export interface TaskField {
    fieldName: string;
    value: number;
}