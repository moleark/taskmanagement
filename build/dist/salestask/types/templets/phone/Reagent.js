import * as React from 'react';
import { FA } from 'tonva';
export var Reagent = {
    caption: '试剂报价跟踪',
    icon: React.createElement(FA, { name: 'flask', size: "lg", fixWidth: true }),
    schema: [
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
        { name: 'description', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            priorty: { widget: 'radio', label: '重要性', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }] },
            deadline: { widget: 'date', label: '完成时间', placeholder: '要求完成时间' },
            description: { widget: 'text', label: '备注', placeholder: '请填写任务备注' },
            submit: { widget: 'button', label: '提交', }
        }
    },
    completSchema: [
        { name: 'description', type: 'string', required: false },
        { name: 'priorty', type: 'number', required: false },
    ],
    completuiSchema: {
        items: {
            priorty: { widget: 'radio', label: '重要性', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }] },
            description: { widget: 'radio', label: '客户情况', defaultValue: 0, list: [{ value: 0, title: '一般' }, { value: 1, title: '很有钱' }] },
            submit: { widget: 'button', label: '提交', }
        }
    }
};
//# sourceMappingURL=Reagent.js.map