import * as React from 'react';
import { View } from 'tonva-tools';
import { CTaskType, Task } from '../CTaskType';
import { PropGrid, Prop, LMR, ComponentProp, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';

export class VCreateTop extends View<CTaskType> {


    render(task: Task) {
        let { showCustomerDetail } = this.controller.cSalesTask;
        let { type, customer } = task;
        let { cCustomer } = this.controller.cSalesTask.cApp;


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
        ];
        return <PropGrid className="my-2" rows={rows} values={task} />;
    }
}