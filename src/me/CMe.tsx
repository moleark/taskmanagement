import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Map, Tuid, Action, nav, loadAppUqs } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observer } from 'mobx-react';
import { VMe } from './VMe';
import { VTeam } from './VTeam';
import { async } from 'q';
import { VPosition } from './VPosition';

/**
 *
 */
export class CMe extends Controller {

    cApp: CSalesTaskApp;
    inviteCode: string;
    position: any;

    private tuidCustomer: Tuid;

    private qeurySearchTeam: Query;
    private querySearchPosition: Query;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask } = this.cApp;
        this.querySearchPosition = cUqSalesTask.query("searchposition");
        this.tuidCustomer = cUqSalesTask.tuid("customer");
        this.qeurySearchTeam = cUqSalesTask.query("SearchTeam");
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

    //显示我的团队
    showTeam = async () => {
        let team = await this.searchTeam();
        this.openVPage(VTeam, team);
    }

    //搜索团队
    searchTeam = async () => {
        let team = await this.qeurySearchTeam.table({});
        return team;
    }

    //显示我的邀请码
    showPosition = async () => {
        let position = await this.searchPosition();
        this.openVPage(VPosition, position)
    }

    //搜索识别码
    searchPosition = async () => {
        let position = await this.querySearchPosition.table({});
        return position;
    }

    render = observer(() => {
        return this.renderView(VMe);
    })

    tab = () => {
        return <this.render />;
    }
}
