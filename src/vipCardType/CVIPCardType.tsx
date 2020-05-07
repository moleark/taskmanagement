import { CUqBase } from "../CBase";
import { VVIPTypeList } from './VVIPCardTypeList';

export class CVIPCardType extends CUqBase {

    protected async internalStart(param: any) {

    }

    getVIPCardTypeList = async () => {

        let { vipCardType } = this.uqs;
        let cardTypes = await vipCardType.VIPCardType.all();
        return cardTypes;
    }

    renderVIPCardTypeList = () => {
        return this.renderView(VVIPTypeList);
    }
}