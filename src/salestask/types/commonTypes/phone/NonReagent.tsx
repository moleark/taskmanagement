import * as React from 'react';
import { FA } from 'tonva';
import { TaskCommonType } from '../../taskCommonType';
import { UiSchema, UiInputItem, UiRadio } from 'tonva';

export const NonReagent: TaskCommonType = {
    caption: '大包装报价跟踪',
    icon: <FA name='flask' size="lg" fixWidth={true} />,
    schema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            description: { widget: 'text', label: '备注', placeholder: '请填写任务备注' } as UiInputItem,
            priorty: { widget: 'radio', label: '重要性', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }] } as UiRadio,
            deadline: { widget: 'date', label: '完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交', }
        }
    } as UiSchema,
    completSchema: [
        { name: 'description', type: 'number', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'number', required: false },
    ],
    completuiSchema: {
        items: {
            description: {
                widget: 'radio', label: '研究领域', placeholder: '研究领域',
                defaultValue: 1,
                list: [
                    { title: '有机化学', value: 1 },
                    { title: '生物', value: 2 },
                    { title: '甲醇', value: 3 },
                    { title: '无机', value: 4 },
                ]
            } as UiRadio,
            priorty: { widget: 'radio', label: '状态', defaultValue: 1, list: [{ value: 1, title: '有效' }, { value: 0, title: '无效' }] } as UiRadio,
            deadline: {
                widget: 'radio', label: '研究方向', placeholder: '研究方向', defaultValue: 1,
                list: [
                    { title: '大客户', value: 1 },
                    { title: '大客户2', value: 2 },
                    { title: '大客户3', value: 3 },
                    { title: '大客户4', value: 4 },
                    { title: '大客户5', value: 5 },
                ]
            } as UiRadio,
            submit: { widget: 'button', label: '提交', }
        }
    } as UiSchema
}
