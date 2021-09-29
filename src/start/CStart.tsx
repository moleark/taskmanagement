import { nav } from 'tonva-react';
import { CUqBase } from 'uq-app';
import { VStart } from './VStart';
import { VOK } from './VOK';
import { VError } from './VError';
import { VAgencyClauseDetil } from './VAgencyClauseDetil';
import { VConfirm } from './VConfirm';
import * as qs from 'querystringify';
import { GLOABLE } from 'ui';
import { appSettings } from 'appConfig';

export class CStart extends CUqBase {

    //初始化
    protected async internalStart(param: any) {

        let { uqs } = this.cApp;
        let { salesTask } = uqs;
        if (appSettings.isInner) {
            let result = await salesTask.WebUserEmployeeMap.obj({ webuser: this.user.id });
            if (result === undefined) {
                await this.openVPage(VConfirm, null);
            }
        } else {
            var isPosition: Boolean = await this.isPosition();
            if (!isPosition) {
                nav.clear();
                let query = this.getQueryParam();
                if (query.code) {
                    let position = await salesTask.SearchPosition.obj({ position: query.code });
                    if (position !== undefined) {
                        await this.openVPage(VConfirm, position);
                    } else {
                        await this.openVPage(VStart, param);
                    }
                } else {
                    await this.openVPage(VStart, param);
                }
            }
        }
    }

    //显示合同条款
    getQueryParam = () => {
        let { location } = document;
        let { search } = location;
        let result: any = "";
        if (search) {
            result = qs.parse(search.toLowerCase());
        }
        return result;
    }

    //显示合同条款
    showAgencyClauseDetil = () => {
        this.openVPage(VAgencyClauseDetil);
    }

    //同意条款
    onAgreeAgencyClause = async (param: any) => {
        await this.openVPage(VStart, param);
    }

    /**
     * 判断是否有邀请码
     */
    isPosition = async () => {
        let position = await this.uqs.salesTask.SearchPosition.table({ position: undefined });
        if (position && position.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    //新建识别码
    createPosition = async (param: any) => {
        let { invitacode } = param;
        invitacode = invitacode.replace(/\s/g, "");
        if (isNaN(invitacode) === true) {
            await this.openVPage(VError);
            return;
        }

        let position = await this.uqs.salesTask.CreatePosition.submit({ invitacode: invitacode });
        let { succeed } = position;
        this.ceasePage();
        if (succeed === 1) {
            //let { id, name, nick, icon } = this.user;
            //await this.uqs.salesTask.$user.save(id, { name: name, nick: nick, icon: icon });
            await this.openVPage(VOK, position);
        } else if (succeed === -1) {
            await this.openVPage(VError, position);
        }
        return position;
    }

    // 开启APP
    startApp = async () => {
        // await this.cApp.start();
        await this.cApp.showMain();
    }

}