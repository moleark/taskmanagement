export interface Task {
    id: number;
    typeName: string;
    type: any;
    description: string;
    remindDate: Date;
    deadline: Date;
    customer: any;
    fields?: TaskField[];
}

export interface TaskField {
    fieldName: string;
    value: number;
}