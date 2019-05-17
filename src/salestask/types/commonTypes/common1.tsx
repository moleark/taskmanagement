import * as React from 'react';
import { FA } from 'tonva-react-form';
import { TaskCommonType } from '../taskCommonType';
import { UiSchema, UiCheckItem, UiInputItem } from 'tonva-tools';

export const common1: TaskCommonType = {
    caption: 'Common1',
    icon: <FA name='flask' size="lg" fixWidth={true} />,
    schema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
        //{ name: 'submit', type: 'submit' },
    ],
    uiSchema: {
        items: {
            description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' } as UiInputItem,
            priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' } as UiCheckItem,
            deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    } as UiSchema
}
