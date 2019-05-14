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
                    left={<div className="mr-2"> <FA name="user" className="text-info mr-2 pt-1 " /> </div>}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
                label: '',
            } as ComponentProp,
            /*{
                type: 'component',
                name: 'type',
                component: <LMR className="cursor-pointer w-100" left={<div></div>}>
                    {tv(type, v => <>{v.name}</>)}
                </LMR>,
                label: '',
            } as ComponentProp,*/
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-2" onClick={onShowSalesTaskHistory}
                    left={<span><FA className="text-warning" name="hand-o-right" /> &nbsp; 详情</span>}
                    right={<div className="w-2c text-right"><i className="fa fa-chevron-right" /></div>} />,
                //label: '执行过程',
            } as ComponentProp,

        ];
        return <PropGrid className="my-2" rows={rows} values={task} />;
    }
}