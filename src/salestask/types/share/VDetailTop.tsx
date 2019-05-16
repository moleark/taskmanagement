import * as React from 'react';
import { View } from 'tonva-tools';
import { CTaskType } from '../CTaskType';
import { PropGrid, Prop, LMR, ComponentProp, FA, StringProp, EasyDate } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { propTypes } from 'mobx-react';
import { Task } from '../../model';

export class VDetailTop extends View<CTaskType> {

    render(task: Task) {

        let { showCustomerDetail, showTaskHistory } = this.controller.cSalesTask;
        let { type, customer, description, deadline, id } = task;

        let onShowSalesTaskHistory = async () => await showTaskHistory(id);
        let onClickCustomer = async () => await showCustomerDetail(customer.id);

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="w-100 py-3" onClick={onClickCustomer}
                    left={<div className="mr-2"> <FA name="user" className="text-info mr-2 pt-1" /> </div>}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
            } as ComponentProp,
            {
                type: 'component',
                name: 'deadline',
                component: <LMR className="w-100 py-2"
                    left={<div className="mr-2"> <FA name="clock-o" className="text-info mr-2 pt-1 " /> </div>}>
                    {<EasyDate date={deadline} />}
                </LMR>,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onShowSalesTaskHistory}
                    left={<span><FA className="text-warning" name="hand-o-right" /> &nbsp; 详情</span>}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>} />,
                //label: '执行过程',
            } as ComponentProp,
        ];

        if (description) {
            rows.push({
                type: 'component',
                name: 'description',
                component: <div className="w-100 py-3">{description}</div>,
            } as ComponentProp);
        }
        return <PropGrid className="my-2" rows={rows} values={task} />;
    }
}