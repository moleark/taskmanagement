import * as React from 'react';
import { FA } from 'tonva-react-form';
import { TaskCommonType } from '../taskCommonType';
import { UiSchema, UiCheckItem, UiInputItem, UiRadio } from 'tonva-tools';

export const common2: TaskCommonType = {
    caption: 'Common2',
    icon: <FA name='plus' size="lg" fixWidth={true} />,
    schema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
        { name: 'description1', type: 'string', required: false },
        { name: 'description2', type: 'number', required: false },
    ],
    uiSchema: {
        items: {
            description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' } as UiInputItem,
            priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' } as UiCheckItem,
            deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },

            description2: { widget: 'radio', label: '描述2', defaultValue: 1, list: [{ value: 0, title: '女' }, { value: 1, title: '男' }] } as UiRadio,
        }
    } as UiSchema
}
