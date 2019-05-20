import * as React from 'react';
import { View } from 'tonva';
import { CTaskType } from '../CTaskType';
import { PropGrid, Prop, LMR, ComponentProp, FA, StringProp, EasyDate } from 'tonva';
import { tv } from 'tonva';
import { Task } from '../../model';
import { values } from 'mobx';

export class VContent extends View<CTaskType> {

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