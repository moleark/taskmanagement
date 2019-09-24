import * as React from 'react';
import { VPage, Page, List, LMR, tv, FA, BoxId } from 'tonva';
import { CTeam } from './CTeam';

export class VTeam extends VPage<CTeam> {

    private team: any;
    async open(team: any) {
        this.team = team;
        this.openPage(this.page);
    }

    private userSpan(displayName: JSX.Element, assigned: string): JSX.Element {
        return assigned ?
            <><b>{assigned} &nbsp; <small className="muted">{displayName}</small></b></>
            : <b>{displayName}</b>
    }


    private renderItem = (teamItem: any, index: number) => {

        let { showPeerDetail } = this.controller;
        let onshowPeerDetail = async () => await showPeerDetail(teamItem);

        let { children } = teamItem;
        let displayName = tv(children, v => v.nick || v.name);
        return <LMR className="px-3 py-2 " onClick={onshowPeerDetail}
            left={<FA name='user' className=' my-2 mr-3 text-info' />}
            right={<div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div>}>
            <div className="font-weight-bold ">{this.userSpan(displayName, teamItem.assigned)}</div>
        </LMR>
    }

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted">还没有团队哦！马上发展团队吧！！</div>;
        return <Page header='我的团队' headerClassName='bg-primary py-1' >
            <List before={''} none={none} items={this.team} item={{ render: this.renderItem }} />
        </Page>
    }
}