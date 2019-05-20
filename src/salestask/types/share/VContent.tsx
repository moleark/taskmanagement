import * as React from 'react';
import { View } from 'tonva-tools';
import { CTaskType } from '../CTaskType';
import { PropGrid, Prop, LMR, ComponentProp, FA, StringProp, EasyDate } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { Task } from '../../model';
import { values } from 'mobx';

export class VContent extends View<CTaskType> {



    render(task: Task) {

        let { fields } = task;

        if (fields === undefined) return <></>;
        return <>
            {fields.map((v, index) => {
                let { fieldName, value } = v;

                let left = <div className='ml-4'>{fieldName}</div>;
                let right = <div className='mr-4'>{value}</div>
                return <LMR className='bg-white row' left={left} right={right}>
                </LMR>
            })}
        </>;
    }
}