import * as React from 'react';
import { VPage, Page, List, LMR, tv } from 'tonva';
import { CMe } from './CMe';

export class VTeam extends VPage<CMe> {

    private team: any;
    async open(team: any) {
        this.team = team;
        this.openPage(this.page);
    }

    private renderItem = (team: any, index: number) => {
        let { parent, children } = team;
        let p = <div >{tv(parent, v => v.name)}</div>
        let c = <div >{tv(children, v => v.name)}</div>
        return <LMR className=" mx-3 " left={p} right={c}></LMR>;
    }

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted">无团队</div>;
        return <Page header='我的团队' headerClassName='bg-primary py-1' >
            <List before={''} none={none} items={this.team} item={{ render: this.renderItem }} />
        </Page>
    }
}
