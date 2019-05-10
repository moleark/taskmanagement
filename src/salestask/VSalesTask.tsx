import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { List, LMR, EasyDate } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';

export class VSalesTask extends VPage<CSalesTask> {

    async open(task: any) {

        let model = await this.controller.lodeSalesTaskDetail(task.id);
        this.openPage(this.page, model);

    }


    private page = observer((task: any) => {

        let { showSalesTaskComplet, showSalesTaskExtension, onInvalidTask } = this.controller;

        let onProcess = async () => await showSalesTaskComplet(task);
        let onPostpond = async () => await showSalesTaskExtension(task);
        let onInvalidTaskClick = async () => await onInvalidTask(task);

        let { description, type, customer, deadline, priorty } = task;

        let buttons = <span>
            <button type="button" className="btn btn-primary px-5" onClick={onProcess} >处理</button>
        </span>;
        let rightButton = <span>
            <button type="button" className="btn btn-outline-info ml-3" onClick={onPostpond} >延期</button>
            <button type="button" className="btn btn-outline-info ml-3" onClick={onInvalidTaskClick} >无效</button>
        </span>;

        let footer = <LMR className="px-1" left={buttons} right={rightButton}>
        </LMR>
        return <Page header="任务明细" footer={footer} >
            <div className="px-2 py-2 bg-white mb-3">客户：{tv(customer, v => <>{v.name}</>)} </div>
            <div className="px-2 py-2 bg-white mb-3">类型：{tv(type, v => <>{v.name}</>)} </div>
            <div className="px-2 py-2 bg-white mb-3">内容：{description}</div>
            <div className="px-2 py-2 bg-white mb-3">重要性：{priorty} </div>
            <div className="px-2 py-2 bg-white mb-3">要求完成日期：<EasyDate date={deadline} /></div>
        </Page >
    })
}