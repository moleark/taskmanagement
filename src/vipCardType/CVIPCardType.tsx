import { CUqBase } from "../CBase";
import { VVIPCardTypeList } from './VVIPCardTypeList';

export class CVIPCardType extends CUqBase {

    protected async internalStart(param: any) {

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
        let vipCardDiscountSetting = await cCoupon.call<any>(vipCardLevel);

        let now = new Date();
        let vipCardParam: any = {
            validitydate: `${now.getFullYear() + 1}-${now.getMonth() + 1}-${now.getDate()}`,
            discount: 0,
        }
        let newVIPCard = await cCoupon.createCoupon(vipCardParam, { type: 'vipcard' });
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