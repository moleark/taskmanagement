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
        let { caption, renderDetailTop, renderActionsBottom } = this.controller;
        return <Page header={caption} footer={renderActionsBottom(task)} >
            {renderDetailTop(task)}
        </Page >
    }
}