import * as React from 'react';
import { FA, UiRadio } from 'tonva-react';
import { TaskCommonType } from '../../taskCommonType';
import { UiSchema, UiCheckItem, UiInputItem } from 'tonva-react';

export const NotUptoStandard: TaskCommonType = {
    caption: '客户计划未达标',
    icon: <FA name='newspaper-o' size="lg" fixWidth={true} />,
    schema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' } as UiInputItem,
            priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' } as UiCheckItem,
            deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', },
        }
    } as UiSchema,
    completSchema: [
        { name: 'result', type: 'string', required: false },
    ],
    completuiSchema: {
        items: {
            result: { widget: 'radio', label: '结案', defaultValue: 1, list: [{ value: 0, title: '成功' }, { value: 1, title: '失败' }] } as UiRadio,
            submit: { widget: 'button', label: '提交', }
        }
    } as UiSchema
}
