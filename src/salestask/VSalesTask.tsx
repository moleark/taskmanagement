import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { List, LMR } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';

export class VSalesTask extends VPage<CSalesTask> {

    async open(salestask: any) {

        this.openPage(this.page, salestask);
    }

    private onCompletionTask = async (model: any) => {

        await this.controller.showSalesTaskComplet(model);
    }

    private onExtensionTask = async (model: any) => {

        await this.controller.showSalesTaskExtension(model);
    }

    private page = observer((task: any) => {
        let { showSalesTaskComplet, showSalesTaskExtension, onInvalidTask } = this.controller;
        let onProcess = async () => await showSalesTaskComplet(task);
        let onPostpond = async () => await showSalesTaskExtension(task);
        let onInvalidTaskClick = async () => await onInvalidTask(task);
        let buttons = <span>
            <button type="button" className="btn btn-info px-5" onClick={onProcess} >处理</button>
        </span>;
        let rightButton = <span>
            <button type="button" className="btn btn-outline-info ml-3" onClick={onPostpond} >延期</button>
            <button type="button" className="btn btn-outline-info ml-3" onClick={onInvalidTaskClick} >无效</button>
        </span>;
        return <Page header="任务明细" >
            <div className="px-2 py-2 bg-white mb-3">{task.description}</div>
            <div className="px-2 py-2 bg-white mb-3">{task.customer.name}</div>

            <LMR className="px-3" right={rightButton}>
                {buttons}
            </LMR>
        </Page >
    })
}