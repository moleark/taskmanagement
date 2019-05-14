import * as React from 'react';
import { VPage, Page, PageItems, TabCaptionComponent, Tabs } from 'tonva-tools';
import { List, LMR, EasyDate, PropGrid, Prop, StringProp, ComponentProp, FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';
import { CTaskType, Task } from '../CTaskType';

export class VDetail extends VPage<CTaskType> {

    async open(task: any) {

        let model = await this.controller.cSalesTask.loadSalesTaskDetail(task.id);
        this.openPage(this.page, model);

    }
    private page = observer((task: any) => {
        return this.render(task);
    });

    itemrender(param: any) {

        let { deadline, description, priorty } = param;
        var divpriorty: any
        if (priorty == 1)
            divpriorty = <FA name='circle' className="text-danger"></FA>

        let right = <div className="text-right">
            <div><small className="text-muted"><small>{divpriorty}</small><EasyDate date={deadline} /></small></div>
        </div>;
        return <LMR className="cursor-pointer w-100" right={right} left="内容" >
            {description}
        </LMR>;
    }

    render(task: any) {

        let { showSalesTaskComplet, showSalesTaskExtension, onInvalidTask, showCustomerDetail, showSalesTaskHistory } = this.controller.cSalesTask;
        let { deadline, description, priorty } = task;

        let onProcess = async () => await showSalesTaskComplet(task);
        let onPostpond = async () => await showSalesTaskExtension(task);
        let onInvalidTaskClick = async () => await onInvalidTask(task);
        let rows: Prop[] = [
            {
                type: 'component',
                name: 'description',
                component: this.itemrender(task),
                label: '',
            } as ComponentProp,
        ];

        let buttons = <span>
            <button type="button" className="btn btn-primary px-5" onClick={onProcess} >处理</button>
        </span>;
        let rightButton = <span>
            <button type="button" className="btn btn-outline-info ml-3" onClick={onPostpond} >推迟</button>
            <button type="button" className="btn btn-outline-info ml-3" onClick={onInvalidTaskClick} >拒绝</button>
        </span>;

        let footer = <LMR className="px-1" left={buttons} right={rightButton}>
        </LMR>

        return <Page header={this.controller.caption} footer={footer} >
            {this.controller.renderDetailTop(task)}
            <PropGrid rows={rows} values={task} />
        </Page >
    }
}