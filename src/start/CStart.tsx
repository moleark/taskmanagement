import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Map, Tuid, Action, nav } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VStart } from './VStart';
import { VOK } from './VOK';
import { VError } from './VError';
import { isNumber } from 'util';
import { AgencyClause } from './VAgencyClause';
import { VAgencyClauseDetil } from './VAgencyClauseDetil';


/**
 *
 */
export class CStart extends Controller {

    cApp: CSalesTaskApp;

    private tuidUser: Tuid;
    private querySearchPosition: Query;
    private actionPosition: Action;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqSalesTask, } = this.cApp;
        this.tuidUser = cUqSalesTask.tuid("$user")
        this.querySearchPosition = cUqSalesTask.query("searchposition");
        this.actionPosition = cUqSalesTask.action("CreatePosition");
    }

    //初始化
    protected async internalStart(param: any) {
        this.user;
        var isPosition: Boolean;
        isPosition = await this.isPosition();
        if (!isPosition) {
            nav.clear();
            await this.openVPage(AgencyClause, param);
        }
        else {
            //await this.openVPage(AgencyClause, param);
            await this.cApp.cSalesTask.start();
        }
    }

    //同意条款
    onAgreeAgencyClause = async (param: any) => {
        //await this.cApp.cSalesTask.start();
        await this.openVPage(VStart, param);
    }

    showAgencyClauseDetil = () => {
        this.openVPage(VAgencyClauseDetil);
    }

    //判断是否有邀请码
    isPosition = async () => {
        let position = await this.searchPosition();
        if (position && position.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    //搜索识别码
    searchPosition = async () => {
        let position = await this.querySearchPosition.table({});
        return position;
    }

    startApp = async () => {
        await this.cApp.start();
    }

    //新建识别码
    createPosition = async (param: any) => {
        let { invitacode } = param;
        invitacode = invitacode.replace(/\s/g, "");;
        if (isNaN(invitacode) === true) {
            await this.openVPage(VError);
            return;
        }

        let position = await this.actionPosition.submit({ invitacode: invitacode });
        let { succeed } = position;
        this.ceasePage();
        if (succeed === 1) {
            await this.tuidUser.save(this.user.id, this.user);
            await this.openVPage(VOK, position);
        } else if (succeed === -1) {
            await this.openVPage(VError, position);
        }
        return position;
    }

}
