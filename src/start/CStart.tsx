import { nav } from 'tonva';
import { CUqBase } from '../CBase';
import { VStart } from './VStart';
import { VOK } from './VOK';
import { VError } from './VError';
import { VAgencyClauseDetil } from './VAgencyClauseDetil';


/**
 *
 */
export class CStart extends CUqBase {

    //初始化
    protected async internalStart(param: any) {
        //this.user;
        var isPosition: Boolean;
        isPosition = await this.isPosition();
        if (!isPosition) {
            nav.clear();
            //await this.openVPage(AgencyClause, param);
            await this.openVPage(VStart, param);
        }
        else {
            //await this.openVPage(AgencyClause, param);
            await this.cApp.cSalesTask.start();
            //await this.openVPage(VStart, param);
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
        let position = await this.uqs.salesTask.SearchPosition.table({});
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

}
