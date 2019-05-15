import * as React from 'react';
import { VPage, Page, PageItems, TabCaptionComponent, Tabs } from 'tonva-tools';
import { List, LMR, EasyDate, PropGrid, Prop, StringProp, ComponentProp } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';
import { CTaskType } from '../CTaskType';
import { Task } from '../../model';

export class VDetail extends VPage<CTaskType> {

    async open(task: Task) {
        this.openPage(this.page, task);
    }

    private page = observer((task: any) => {
        return this.render(task);
    });

    render(task: any) {
        let { caption, renderDetailTop, renderActionsBottom } = this.controller;
        return <Page header={caption} footer={renderActionsBottom(task)} >
            {renderDetailTop(task)}
        </Page >
    }
}