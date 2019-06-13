import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Map, Tuid, Action, nav, loadAppUqs } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observer } from 'mobx-react';
import { VMe } from '../me/VMe';
import { VTeam } from './VTeam';
import { async } from 'q';
import { VMeDetail } from '../me/VMeDetail';
import { VTeamDetail } from './VTeamDetail';

/**
 *
 */
export class CTeam extends Controller {

    cApp: CSalesTaskApp;

    private qeurySearchTeam: Query;
    private actionSavePeerAssigned: Action;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.qeurySearchTeam = cUqSalesTask.query("searchteam");
        this.actionSavePeerAssigned = cUqSalesTask.action("savePeerassigned");
    }

    //初始化
    protected async internalStart() {
        let team = await this.searchTeam();
        this.openVPage(VTeam, team);
    }

    //搜索我的团队
    searchTeam = async () => {
        let team = await this.qeurySearchTeam.table({});
        return team;
    }

    //显示粉丝信息
    showPeerDetail = async (team: any) => {
        this.openVPage(VTeamDetail, team);
    }

    //保存粉丝自定义信息
    savePeerAssigned = async (peer: any, newValue: any) => {
        let param = { peer: peer.id, Assigned: newValue };
        this.actionSavePeerAssigned.submit(param);
    }

    render = observer(() => {
        return this.renderView(VMe);
    })

    tab = () => {
        return <this.render />;
    }
}
