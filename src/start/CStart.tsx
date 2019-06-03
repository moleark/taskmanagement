import * as React from 'react';
import * as _ from 'lodash';
import { Query, Controller, Map, Tuid, Action, nav } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VStart } from './VStart';
import { VOK } from './VOK';
import { VErrorss } from './VErrorss';


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
        // await this.openVPage(VPositionOK);
        // return;
        var isPosition: Boolean;
        isPosition = await this.isPosition();
        if (!isPosition) {
            nav.clear();
            await this.openVPage(VStart, param);
        }
        else {
            await this.cApp.cSalesTask.start();
        }
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
        let position = await this.actionPosition.submit({ invitacode: param.invitacode });
        let { succeed } = position;
        if (succeed === 1) {
            this.ceasePage();
            await this.tuidUser.save(this.user.id, this.user);
            await this.openVPage(VOK, position);

        } else if (succeed === -1) {
            this.ceasePage();
            await this.openVPage(VErrorss, position);
        }
        return position;
    }
}
