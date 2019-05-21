import * as React from 'react';
import { VPage, Page, PageItems, Nav, nav } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate, SearchBox, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { tv } from 'tonva';
import { CMe } from './CMe';

function rowCom(iconName: string, iconColor: string, caption: string, onClick: any) {
    return <LMR className="cursor-pointer w-100 py-3 align-items-center" onClick={onClick}
        left={<FA name={iconName} className={'mr-3 ' + iconColor} fixWidth={true} size="lg" />}
        right={< div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div >}>{caption}</LMR>;
}

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
                component: rowCom('tag', 'text-info', '已完成任务', onshowEmployeeHistory),
            } as ComponentProp,
            {
                type: 'component',
                name: 'customer',
                component: rowCom('line-chart', 'text-danger', '销量', undefined),
            } as ComponentProp,
        ];

        let right = < div className='mr-3' ><FA name='bars' /></div>;
        let footer = <button type="button" className="btn btn-danger w-100" onClick={this.logout} >退出</button>;
        return <Page header='我的' footer={footer} headerClassName='bg-primary py-1 px-3'>
            <PropGrid className="my-2" rows={rows} values={customer} alignValue="right" />
        </Page>
    })
}