import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, VPage, nav, Image, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { CMe } from './CMe';

function rowCom(iconName: string, iconColor: string, caption: string, onClick: any) {
    return <LMR className="cursor-pointer w-100 py-2 my-2 align-items-center  " onClick={onClick}
        left={<FA name={iconName} className={'mr-3 ' + iconColor} fixWidth={true} size="lg" />}
        right={<div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div>}>{caption}</LMR>;
}

export class VMe extends VPage<CMe> {
    private user: any;
    private inviteCode: any;
    async open() {
        this.openPage(this.page);
    }

    render(member: any): JSX.Element {
        let { user, inviteCode } = this.controller;
        this.user = user;
        this.inviteCode = inviteCode;
        return <this.page />;
    }

    private logout = () => {
        nav.showLogout();
    }


    private userSpan(name: string, nick: string): JSX.Element {
        return nick ?
            <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
            : <b>{name}</b>
    }

    private meInfo = observer(() => {
        let { showMeDetail } = this.controller;
        let onshowMeDetail = async () => await showMeDetail();

        let { id, name, nick, icon } = this.user;
        return <LMR className="py-2 cursor-pointer w-100" onClick={onshowMeDetail}
            left={<Image className="w-3c h-3c mr-3" src={icon} />}
            right={<FA className="align-self-end" name="chevron-right" />}>
            <div>
                <div>{this.userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">邀请码:</span> {this.inviteCode}</div>
            </div>
        </LMR>;
    });


    private page = observer(() => {
        let { cSalesTask } = this.controller.cApp
        let { showEmployeeHistory } = cSalesTask;
        let { showTeam } = this.controller;

        let onshowEmployeeHistory = async () => await showEmployeeHistory();
        let onshowTeam = async () => await showTeam();
        let rows: Prop[] = [
            {
                type: 'component',
                component: <this.meInfo />
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('tag', 'text-info', '已完成任务', onshowEmployeeHistory),
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('line-chart', 'text-danger', '个人业绩', undefined),
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('sitemap', 'text-info', '我的团队', onshowTeam),
            } as ComponentProp,
        ];

        let footer = <button type="button" className="btn btn-danger flex-grow-1 mx-3 my-1" onClick={this.logout} ><FA name="sign-out" size="lg" /> 退出</button>;
        return <div>
            <PropGrid className="my-2" rows={rows} values={null} alignValue="right" />
            <div className="mt-3 d-flex">{footer}</div>
        </div>
    })
}