import * as React from 'react';
import { View } from 'tonva';
import { CType } from '../CType';
import { PropGrid, Prop, LMR, ComponentProp, FA } from 'tonva';
import { tv } from 'tonva';
import { Task } from '../../model';

export class VActionsBottom extends View<CType> {

    render(task: Task) {
        let { showTaskComplet, showTaskExtension, showTaskInvalid } = this.controller.cSalesTask;
        let tasks = {
            id: task.id,
            type: task.type,
            biz: task.biz,
            description: null,
            remindDate: null,
            deadline: null,
            customer: task.customer
        }
        let onProcess = async () => await showTaskComplet(tasks);
        let onPostpond = async () => await showTaskExtension(tasks);
        let onInvalid = async () => await showTaskInvalid(tasks);

        return <div className="d-flex px-1">
            <div className="flex-grow-1 align-self-center justify-content-start">
                <button type="button" className="btn btn-primary" onClick={onProcess} >&nbsp;处理&nbsp;</button>
            </div>
            <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={onPostpond} >推迟</button>
            <button type="button" className="btn btn-outline-info ml-2 align-self-center" onClick={onInvalid} >取消</button>
        </div>;
    }
}