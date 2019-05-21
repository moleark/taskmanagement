import * as React from 'react';
import { View, Widget, UiSelectBase } from 'tonva';
import { CTaskType } from '../CTaskType';
import { LMR, FA } from 'tonva';
import { Task } from '../../model';
import { TaskCommonType } from '../taskCommonType';
import { CTaskCommonType } from '../common';

export class VDetailContent extends View<CTaskType> {

    render(task: Task): JSX.Element {
        let model = this.controller.cSalesTask.getCTaskType(task.type.obj.name);

        let ss: CTaskCommonType = model as CTaskCommonType;

        let { completuiSchema } = ss.taskCommonType;

        let { fields } = task;
        if (fields === undefined) return <></>;

        return <div className='w-100'>
            {fields.map((v, index) => {
                let { fieldName, value } = v;
                let { label, list } = completuiSchema.items[fieldName] as UiSelectBase;
                let left = <div className=''><FA name='caret-right' className='small text-info' fixWidth={true} />{label || fieldName}</div>;
                let selectItem = list.find(v => v.value === value);
                return <div className='row bg-white py-2' key={index}>
                    <div className="col-4 align-self-center">{left}</div>
                    <div className="col-8">{selectItem ? selectItem.title : value} </div>
                </div>
            })}
        </div>;
    }
}