import * as React from 'react';
import { View } from 'tonva-tools';
import { CTaskType, Task } from '../CTaskType';
import { PropGrid, Prop, LMR, ComponentProp, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';

export class VDetailTop extends View<CTaskType> {

    render(task: Task) {

        let { showCustomerDetail, showSalesTaskHistory } = this.controller.cSalesTask;
        let { type, customer } = task;

        let onShowSalesTaskHistory = async () => await showSalesTaskHistory(customer.id);
        let onClickCustoemr = async () => await showCustomerDetail(customer.id);

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100" onClick={onClickCustoemr}
                    left={<div> <FA name="user" className="text-info  m-3" ></FA> </div>}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
                label: '',
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
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100" onClick={onShowSalesTaskHistory}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>}>
                </LMR>,
                label: '执行过程',
            } as ComponentProp,

        ];
        return <PropGrid className="my-2" rows={rows} values={task} />;
    }
}