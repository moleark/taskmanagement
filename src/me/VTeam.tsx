import * as React from 'react';
import { VPage, Page, List, LMR, tv, FA } from 'tonva';
import { CMe } from './CMe';
import { CTeam } from './CTeam';

export class VTeam extends VPage<CTeam> {

    private team: any;
    async open(team: any) {
        this.team = team;
        this.openPage(this.page);
    }

    private userSpan(name: any, nick: string): JSX.Element {
        return nick ?
            <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
            : <b>{name}</b>
    }


    private renderItem = (team: any, index: number) => {

        let { showPeerDetail } = this.controller;
        let onshowPeerDetail = async () => await showPeerDetail(team);

        let { children } = team;
        let codes = tv(children, v => v.name);
        return <LMR className="px-3 py-2 " onClick={onshowPeerDetail}
            left={<FA name='user' className=' my-2 mr-3 text-info' />}
            right={<div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div>}>
            <div className="font-weight-bold ">{this.userSpan(codes, team.assigned)}</div>
        </LMR>
    }

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted">还没有团队哦！马上发展团队吧！！</div>;
        return <Page header='我的团队' headerClassName='bg-primary py-1' >
            <List before={''} none={none} items={this.team} item={{ render: this.renderItem }} />
        </Page>
    }
}
