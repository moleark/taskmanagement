import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Map, Tuid, Action, nav, loadAppUqs } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observer } from 'mobx-react';
import { VMe } from './VMe';
import { VTeam } from './VTeam';
import { async } from 'q';
import { VMeDetail } from './VMeDetail';

/**
 *
 */
export class CMe extends Controller {

    cApp: CSalesTaskApp;
    inviteCode: string;
    position: any;

    private tuidUser: Tuid;

    private qeurySearchTeam: Query;
    private querySearchPosition: Query;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.tuidUser = cUqSalesTask.tuid("$user");
        this.querySearchPosition = cUqSalesTask.query("searchposition");
        this.qeurySearchTeam = cUqSalesTask.query("searchteam");
    }

    //初始化
    protected async internalStart(param: any) {
        await this.load();
        nav.clear();
        this.openVPage(VMe, param);
    }

    load = async () => {
        this.position = await this.querySearchPosition.table({});
        let code = String(this.position[0].code + 100000000);
        let p1 = code.substr(1, 4);
        let p2 = code.substr(5);
        this.inviteCode = p1 + ' ' + p2;
    }

    //显示我的邀请码
    showMeDetail = async () => {
        this.openVPage(VMeDetail)
    }

    //搜索我的邀请码
    searchPosition = async () => {
        let position = await this.querySearchPosition.table({});
        return position;
    }

    //显示我的团队
    showTeam = async () => {
        let team = await this.searchTeam();
        let teams = team[0];
        let a = teams.Assigned;
        this.openVPage(VTeam, team);
    }

    //搜索我的团队
    searchTeam = async () => {
        let team = await this.qeurySearchTeam.table({});
        return team;
    }

    render = observer(() => {
        return this.renderView(VMe);
    })

    tab = () => {
        return <this.render />;
    }
}
