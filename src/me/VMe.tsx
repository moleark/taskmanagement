import * as React from 'react';
import { VPage, Page, PageItems, Nav, nav } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate, SearchBox, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { tv } from 'tonva';
import { CMe } from './CMe';

export class VMe extends VPage<CMe> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    render(member: any): JSX.Element {
        return <this.page />;
    }

    private logout = () => {
        nav.showLogout();
    }

    private page = observer((customer: any) => {
        let { cSalesTask } = this.controller.cApp
        let { showEmployeeHistory } = cSalesTask;
        let onshowEmployeeHistory = async () => await showEmployeeHistory();

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3" onClick={onshowEmployeeHistory}
                    left={< div  > <small><FA name='tag' className='text-info' /></small> &nbsp;已完成任务</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3"
                    left={< div > <small><FA name='line-chart' className='text-danger' /></small> &nbsp;销量</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3"
                    left={< div > <small><FA name='usd ' className='text-warning' /></small> &nbsp;工资</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3"
                    left={< div > <small><FA name='car' className='text-info' /></small> &nbsp;拜访</div>}
                    right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>
                </LMR >,
            } as ComponentProp,
        ];

        let right = < div className='mr-3' ><FA name='bars' /></div>;
        let footer = <button type="button" className="btn btn-danger w-100" onClick={this.logout} >退出</button>;
        return <Page header='我的' right={right} footer={footer} headerClassName='bg-primary py-1 px-3'>
            <PropGrid className="my-2" rows={rows} values={customer} alignValue="right" />
        </Page>
    })
}