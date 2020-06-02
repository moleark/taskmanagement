import { CUqBase } from "../CBase";
import { VVIPCardTypeList } from './VVIPCardTypeList';

export class CVIPCardType extends CUqBase {

    private targetWebUser: any;
    targetWebUserVIPLevel: any;
    protected async internalStart(targetWebUser: any) {
        this.targetWebUser = targetWebUser;

        let { uqs } = this;
        let { webuser, customer, vipCardType } = uqs;
        this.targetWebUserVIPLevel = await vipCardType.VIPCardType.load(1);
        let wcMap: any = await webuser.WebUserCustomer.obj({ webUser: targetWebUser });
        if (wcMap) {
            let { customer: customerTuid } = wcMap;
            let coMap: any = await customer.getCustomerOrganization.obj({ customerId: customerTuid });
            let organization = coMap && coMap.organization;
            if (organization) {
                let olMap: any = await vipCardType.OrganizationVIPLevel.obj({ organization: organization });
                if (olMap) {
                    let { vipCardLevel } = olMap;
                    this.targetWebUserVIPLevel = vipCardLevel;
                }
            }
        }

        let vipCardTypes = await this.getVIPCardTypeList();
        this.openVPage(VVIPCardTypeList, vipCardTypes);
        if (this.targetWebUserVIPLevel.id === 1) {
            this.showCreateVIPCardDiscount(this.targetWebUserVIPLevel);
        }
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
        closePage();
        cCoupon.showShareCoupon(newVIPCard);
    }
}