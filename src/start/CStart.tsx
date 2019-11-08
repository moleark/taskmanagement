import { nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VStart } from './VStart';
import { VOK } from './VOK';
import { VError } from './VError';
import { VAgencyClauseDetil } from './VAgencyClauseDetil';
import { VConfirm } from './VConfirm';
import * as qs from 'querystringify';
import { setting, InnerSales, AgentSales } from 'appConfig';
/**
 *
 */
export class CStart extends CUqBase {

    //初始化
    protected async internalStart(param: any) {
        this.getIsInnerSales();
        //this.user;
        var isPosition: Boolean;
        isPosition = await this.isPosition();
        if (!isPosition) {
            nav.clear();
            let query = this.getQueryParam();
            if (query.code) {
                let position = await this.uqs.salesTask.SearchPosition.table({ position: query.code });
                if (position.length > 0) {
                    await this.openVPage(VConfirm, position[0]);
                    //await this.openVPage(VStart, param);
                } else {
                    await this.openVPage(VStart, param);
                }
            } else {
                await this.openVPage(VStart, param);
            }
        }
        else {
            await this.cApp.cSalesTask.start();
        }
    }

    //判断是否为内部销售
    getIsInnerSales = async () => {
        let reult = await this.cApp.uqs.salesTask.WebUserEmployeeMap.query({ webuser: this.user.id });
        if (reult.ret.length > 0) {
            let sales = new InnerSales();
            setting.sales = new InnerSales();
        } else {
            let sales = new AgentSales();
            setting.sales = new AgentSales();
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

    //判断是否有邀请码
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
            await this.uqs.salesTask.$user.save(this.user.id, this.user);
            await this.openVPage(VOK, position);
        } else if (succeed === -1) {
            await this.openVPage(VError, position);
        }
        return position;
    }

    //开启APP
    startApp = async () => {
        await this.cApp.start();
    }

}
