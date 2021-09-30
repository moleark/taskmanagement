import * as React from 'react';
import { VPage, Page, List, LMR, FA, User, UserView } from 'tonva-react';
import { CTeam } from './CTeam';


export class VTeam extends VPage<CTeam> {

    private team: any;
    async open(team: any) {
        this.team = team;
        this.openPage(this.page);
    }

    renderTop = (user: User): JSX.Element => {
        let { name, nick } = user;
        return <div>{nick || name}</div>
    }

    private renderItem = (teamItem: any, index: number) => {

        let { showPeerDetail } = this.controller;
        let onshowPeerDetail = async () => await showPeerDetail(teamItem);
        let { children, volume, assigned } = teamItem;

        return <LMR className="px-3 py-2 " onClick={onshowPeerDetail}
            left={<div> <FA className="text-info px-2" name="user" /></div >}
            right={volume && <div className="w-2c mr-3 text-right" >￥{volume}</div>}>
            <div className="font-weight-bold ">
                {assigned}
                {assigned ? <></> : <UserView user={children} render={this.renderTop} />}
            </div>
        </LMR >
    }

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted">还没有团队哦！马上发展团队吧！！</div>;
        return <Page header='我的团队' >
            <List before={''} none={none} items={this.team} item={{ render: this.renderItem }} />
        </Page>
    }
}