import { CUqBase } from "../CBase";
import { VVIPCardTypeList } from './VVIPCardTypeList';

export class CVIPCardType extends CUqBase {

    private targetWebUser: any;
    protected async internalStart(targetWebUser: any) {
        this.targetWebUser = targetWebUser;
        let vipCardTypes = await this.getVIPCardTypeList();
        this.openVPage(VVIPCardTypeList, vipCardTypes);
    }

    getVIPCardTypeList = async () => {

        let { vipCardType } = this.uqs;
        let cardTypes = await vipCardType.VIPCardType.all();
        return cardTypes;
    }

    /*
    renderVIPCardTypeList = () => {
        return this.renderView(VVIPTypeList);
    }
    */

    showCreateVIPCardDiscount = async (vipCardLevel: any) => {

        let { uqs, cApp, closePage } = this;
        let { cCoupon } = cApp;
        let vipCardLevelDiscountSetting = await uqs.vipCardType.VIPCardTypeDiscount.table({ vipCard: vipCardLevel.id });
        let { newVIPCard, vipCardDiscountSetting } = await cCoupon.call<any>({ webUser: this.targetWebUser, vipCardLevelDiscountSetting });

        newVIPCard.cardLevel = vipCardLevel;
        await uqs.salesTask.VIPCardDiscount.add({
            coupon: newVIPCard.id,
            arr1: vipCardDiscountSetting
        });
        this.returnCall(newVIPCard);
        // 跳转到分享界面
        closePage(2);
        cCoupon.showShareCoupon(newVIPCard);
    }
}