import * as React from 'react';
import { VPage, Page, PageItems, TabCaptionComponent, Tabs } from 'tonva-tools';
import { List, LMR, EasyDate, PropGrid, Prop, StringProp, ComponentProp, FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';
import { CTaskType } from '../CTaskType';
import { Task } from '../../model';
import { CTaskCommonType } from '.';

export class VDetail extends VPage<CTaskCommonType> {

    async open(task: Task) {
        this.openPage(this.page, task);
    }

    private page = observer((task: any) => {
        return this.render(task);
    });

    render(task: Task) {
        return <>Common: 大包装试剂可填字段ds s asdfas fasfd asf</>;
    }
}