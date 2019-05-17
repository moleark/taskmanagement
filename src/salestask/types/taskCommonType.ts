import { Schema, UiSchema } from 'tonva-tools';

export interface TaskCommonType {
    caption: string;
    icon: any;
    schema: Schema;
    uiSchema: UiSchema;
}
