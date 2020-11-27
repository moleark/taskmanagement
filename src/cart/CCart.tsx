import * as React from "react";
import { CUqBase } from "../CBase";
import { BoxId, QueryPager, nav } from "tonva";
import { observable } from "mobx";
import { groupByProduct } from '../tools/groupByProduct';
import { VCartLabel } from './VCartLabel';
import { CartPackRow, CartItem2 } from './Cart';

/* eslint-disable */
export class CCart extends CUqBase {
    private selectedCartItems: CartItem2[];
    protected async internalStart() {

    }

    /** 显示购物车图标*/
    renderCartLabel = () => {
        return this.renderView(VCartLabel);
    }

    onShowCart = async () => {
        this.cApp.cOrder.showCusCart()
    }

    /**
  * 商品从购物车永久性删除
  */
    strikeOut = async () => {
        let { cart } = this.cApp;
        this.selectedCartItems = cart.getSelectedItems();
        await cart.removeStrike(this.selectedCartItems)


        // let combinedData = this.selectedCartItems.map((el: CartItem2) => {
        //     return el.packs.map((v: any) => {
        //         return {
        //             productId: el.product, packId: v.pack
        //         }
        //     })
        // }).flat();
        // combinedData.forEach(async (el: any) => {
        //     await cart.removeFromCart(el);
        // })
    }

    checkOut = async () => {
        let { cart } = this.cApp;
        this.selectedCartItems = cart.getSelectedItems();
        if (this.selectedCartItems === undefined) return;
        await this.doCheckOut();
    }

    // private doFirstOrderChecking = async () => {
    //     let { cMe, currentUser } = this.cApp;
    //     if (!currentUser.allowOrdering) {
    //     cMe.toPersonalAccountInfo(this.doCheckOut);
    //     cMe.openMeInfoFirstOrder({
    //         onlyRequired: false,
    //         caption: "请补充账户信息",
    //         note: <>
    //             化学品是受国家安全法规限制的特殊商品，百灵威提供技术咨询、资料以及化学产品的对象必须是具有化学管理和应用能力的专业单位（非个人）。
    //         为此，需要您重新提供非虚拟的、可核查的信息。这些信息包括下面所有带有 <span className="text-danger">*</span> 的信息。
    //         </>,
    //         actionButton: {
    //             value: "下一步",
    //             action: this.doCheckOut
    //         }
    //     });
    //     } else {
    //     await this.doCheckOut();
    //     }
    // }

    /**
     * 导航到CheckOut界面
     */
    doCheckOut = async () => {

        let { cOrder } = this.cApp;
        let { selectedCartItems } = this;
        if (selectedCartItems === undefined) return;
        cOrder.createOrderFromCart(selectedCartItems);
    }
}