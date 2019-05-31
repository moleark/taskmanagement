import * as React from 'react';
import { FA, toUiSelectItems } from 'tonva';
export var NonReagent = {
    caption: '大包装报价跟踪',
    icon: React.createElement(FA, { name: 'flask', size: "lg", fixWidth: true }),
    schema: [
        { name: 'priorty', type: 'number', required: false },
        { name: 'deadline', type: 'string', required: false },
        { name: 'description', type: 'string', required: false },
    ],
    uiSchema: {
        items: {
            priorty: {
                widget: 'radio', label: '重要性', defaultValue: 0,
                list: [{ value: 0, title: '一般' }, { value: 1, title: '重要' }],
                radioClassName: 'w-min-6c d-inline-block'
            },
            deadline: { widget: 'date', label: '完成时间', placeholder: '要求完成时间' },
            description: { widget: 'text', label: '备注', placeholder: '请填写任务备注' },
            submit: { widget: 'button', label: '提交', }
        }
    },
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
                list: toUiSelectItems(['1:有机化学', '2:生物', '3:甲醇', '4:无机']),
                radioClassName: 'w-min-6c d-inline-block'
            },
            priorty: {
                widget: 'radio', label: '状态', defaultValue: 1,
                list: [
                    { value: 1, title: '有效' },
                    { value: 0, title: '无效' }
                ]
            },
            deadline: {
                widget: 'radio', label: '研究方向', placeholder: '研究方向', defaultValue: 1,
                list: [
                    { title: '大客户', value: 1 },
                    { title: '大客户2', value: 2 },
                    { title: '大客户3', value: 3 },
                    { title: '大客户4', value: 4 },
                    { title: '大客户5', value: 5 },
                ],
                radioClassName: 'w-min-6c d-inline-block'
            },
            submit: { widget: 'button', label: '提交', }
        }
    }
};
//# sourceMappingURL=NonReagent.js.map