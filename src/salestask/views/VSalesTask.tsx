import * as React from 'react';
import { VPage, Page, PageItems, TabCaptionComponent, Tabs } from 'tonva-tools';
import { CSalesTask } from '../CSalesTask';
import { List, LMR, EasyDate, PropGrid, Prop, StringProp, ComponentProp } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { tv } from 'tonva-react-uq';

export class VSalesTask extends VPage<CSalesTask> {

    async open(task: any) {
        this.openPage(this.page, task);
    }

    private page = observer((task: any) => {

        let { showTaskComplet: showSalesTaskComplet, showTaskExtension: showSalesTaskExtension, showTaskInvalid: showSalesTaskInvalid, showCustomerDetail, showTaskHistory: showSalesTaskHistory } = this.controller;
        let { type, customer, deadline } = task;

        let onProcess = async () => await showSalesTaskComplet(task);
        let onPostpond = async () => await showSalesTaskExtension(task);
        let onInvalid = async () => await showSalesTaskInvalid(task);
        let onClickCustoemr = async () => await showCustomerDetail(customer.id);
        let onShowSalesTaskHistory = async () => await showSalesTaskHistory(customer.id);

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100" onClick={onClickCustoemr}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
                label: '客户',
            } as ComponentProp,
            {
                type: 'component',
                name: 'type',
                component: <LMR className="cursor-pointer w-100">
                    {tv(type, v => <>{v.name}</>)}
                </LMR>,
                label: '类型',
            } as ComponentProp,
            {
                type: 'string',
                name: 'description',
                label: '内容'
            } as StringProp,
            {
                type: 'string',
                name: 'priorty',
                label: '重要性'
            } as StringProp,
            {
                type: 'component',
                name: 'deadline',
                component: <EasyDate date={deadline} />,
                label: '要求完成日期',
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100" onClick={onShowSalesTaskHistory}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>}>
                </LMR>,
                label: '执行过程',
            } as ComponentProp,
        ];

        let buttons = <span>
            <button type="button" className="btn btn-primary px-5" onClick={onProcess} >处理</button>
        </span>;
        let rightButton = <span>
            <button type="button" className="btn btn-outline-info ml-3" onClick={onPostpond} >推迟</button>
            <button type="button" className="btn btn-outline-info ml-3" onClick={onInvalid} >拒绝</button>
        </span>;

        let footer = <LMR className="px-1" left={buttons} right={rightButton}>
        </LMR>

        return <Page header="任务详情" footer={footer} >
            <PropGrid rows={rows} values={task} />
        </Page >
    })
}