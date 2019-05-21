import * as React from 'react';
import { View } from 'tonva';
import { CTaskType } from '../CTaskType';
import { LMR, FA } from 'tonva';
import { Task } from '../../model';

export class VDetailContent extends View<CTaskType> {

    render(task: Task) {
        let { fields } = task;
        if (fields === undefined) return <></>;
        return <>
            {fields.map((v, index) => {
                let { fieldName, value } = v;
                let left = <div className='mx-3'><FA name='circle' className='small text-info mx-3' ></FA>{fieldName}</div>;
                return <LMR className='bg-white row' left={left}  >
                    <div>{value}</div>
                </LMR>
            })}
        </>;
    }
}