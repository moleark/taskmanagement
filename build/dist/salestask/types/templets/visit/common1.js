import * as React from 'react';
import { FA } from 'tonva';
export var common1 = {
    caption: 'Common1',
    icon: React.createElement(FA, { name: 'flask', size: "lg", fixWidth: true }),
    schema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            description: { widget: 'text', label: '内容', placeholder: '请填写任务内容' },
            priorty: { widget: 'checkbox', label: '重要性', placeholder: '重要性' },
            deadline: { widget: 'date', label: '要求完成时间', placeholder: '要求完成时间' },
            submit: { widget: 'button', label: '提交', },
        }
    },
    completSchema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
    ],
    completuiSchema: {
        items: {
            description: { widget: 'text', label: '备注', placeholder: '请填写任务备注' },
            priorty: { widget: 'radio', label: '重要性', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }], radioClassName: 'w-min-6c d-inline-block' },
            deadline: { widget: 'date', label: '完成时间', placeholder: '要求完成时间' },
            submit: { widget: 'button', label: '提交', }
        }
    }
};
//# sourceMappingURL=common1.js.map