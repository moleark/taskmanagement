import * as React from 'react';
import { View } from 'tonva';
import { CType } from '../CType';
import { PropGrid, Prop, LMR, ComponentProp, FA } from 'tonva';
import { tv } from 'tonva';
import { Task } from '../../model';

export class VCreateTop extends View<CType> {

    private itemss = "cursor-pointer my-2 w-100";
    render(task: Task) {
        let { showCustomerDetail } = this.controller.cSalesTask;
        let { customer, type, biz } = task;

        let onClickCustoemr = async () => await showCustomerDetail(customer.id);
        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className={this.itemss} onClick={onClickCustoemr}
                    left={<div> <FA name="user" className="text-info mr-2 pt-1 " /> </div>}
                    right={<div className="text-right"><i className="fa fa-chevron-right" /></div>}>
                    {tv(customer, v => <>{v.name}</>)}
                </LMR>,
            } as ComponentProp,
            {
                type: 'component',
                name: 'type',
                component: <LMR className={this.itemss}
                    left={<div className="mr-2"> <FA name='circle text-info' ></FA></div>}>
                    {tv(type, v => <>{v.description}</>)}
                </LMR>,
            } as ComponentProp,
            {
                type: 'component',
                name: 'biz',
                component: <LMR className={this.itemss}
                    left={<div className="mr-2"><FA name='circle text-info' ></FA></div>}>
                    {tv(biz, v => <>{v.description}</>)}
                </LMR>,
            } as ComponentProp,
        ];
        return <PropGrid className="my-2" rows={rows} values={task} />;
    }
}