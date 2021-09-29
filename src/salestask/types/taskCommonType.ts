import { Schema, UiSchema } from 'tonva-react';

export interface TaskCommonType {
    caption: string;
    icon: any;
    schema: Schema;
    uiSchema: UiSchema;
    completSchema: Schema;
    completuiSchema: UiSchema;
}
