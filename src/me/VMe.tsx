import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate, SearchBox, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { CMe } from './CMe';

export class VMe extends VPage<CMe> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    render(member: any): JSX.Element {
        return <this.page />;
    }

    private page = observer((customer: any) => {

        let rows: Prop[] = [
            {
                type: 'component',
                name: 'customer',
                component: <LMR className="cursor-pointer w-100 py-3"
                    left={< div > <small><FA name='tag' className='text-info' /></small> &nbsp;已完成任务</div>}
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
        let header = <LMR className="pl-3 pt-2 pb-3 bg-primary text-white" right={right}  >
            我的
        </LMR>
        return <Page header={header}>
            <PropGrid className="my-2" rows={rows} values={customer} alignValue="right" />
        </Page>
    })
}