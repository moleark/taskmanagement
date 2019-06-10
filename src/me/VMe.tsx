import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, VPage, nav, Image, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { CMe } from './CMe';
import classNames from 'classnames';

function rowCom(iconName: string, iconColor: string, caption: string, value: any, onClick: any) {
    return <LMR className="cursor-pointer w-100 py-2 my-2 align-items-center  " onClick={onClick}
        left={<FA name={iconName} className={'mr-3 ' + iconColor} fixWidth={true} size="lg" />}
        right={<div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div>}>
        {caption}<span className=" ml-3">{value}</span>
    </LMR>;
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
        let { showMeDetail, showMessage } = this.controller;
        let { cMessage } = this.controller.cApp
        let count: any = cMessage.count.get();
        let onshowMeDetail = async () => await showMeDetail();
        let onshowMessage = async () => await showMessage();
        let { id, name, nick, icon } = this.user;
        let pointer, badge;
        if (count > 0) {
            pointer = 'cursor-pointer';
            if (count < 100) badge = <u>{count}</u>;
            else badge = <u>99+</u>;
        }

        return <LMR className="py-2 cursor-pointer w-100"
            left={<div onClick={onshowMeDetail}> <Image className="w-3c h-3c mr-3" src={icon} /> </div>}
            right={<div className={classNames('jk-cart ml-1 mr-2', pointer)} onClick={onshowMessage} >
                <div>
                    <FA className="text-warning fa-1g" name="envelope-o" />
                    {badge}
                </div>
            </div>}>
            <div onClick={onshowMeDetail}>
                <div>{this.userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">邀请码:</span> {this.inviteCode}</div>
            </div>
        </LMR>;
    });

    private page = observer(() => {
        let { cSalesTask, cMessage } = this.controller.cApp
        let { showEmployeeHistory } = cSalesTask;
        let { showTeam, showOrderHistory, achievemen } = this.controller;

        let onshowEmployeeHistory = async () => await showEmployeeHistory();
        let onshowTeam = async () => await showTeam();
        let onshowOrderHistory = async () => await showOrderHistory(this.user.id);

        let rows: Prop[] = [
            {
                type: 'component',
                component: <this.meInfo />
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('tag', 'text-info', '已完成任务', undefined, onshowEmployeeHistory),
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('line-chart', 'text-danger', '个人业绩', achievemen + " ￥", onshowOrderHistory),
            } as ComponentProp,
            {
                type: 'component',
                component: rowCom('sitemap', 'text-info', '我的团队', undefined, onshowTeam),
            } as ComponentProp,
        ];

        let footer = <button type="button" className="btn btn-danger flex-grow-1 mx-3 my-1" onClick={this.logout} ><FA name="sign-out" size="lg" /> 退出</button>;
        return <div>
            <PropGrid className="my-2" rows={rows} values={null} alignValue="right" />
            <div className="mt-3 d-flex">{footer}</div>
        </div>
    })
}