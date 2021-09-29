import * as React from "react";
import { CUqBase } from 'uq-app';
import { BoxId, RowContext } from 'tonva-react';
import { VCartLabel } from './VCartLabel';
import { CartPackRow, CartItem2 } from './Cart';
import { VCustomerCart } from './VCustomerCart';

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
        this.openVPage(VCustomerCart)
    }

    renderCartProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }

    onQuantityChanged = async (context: RowContext, value: any, prev: any) => {
        let { data, parentData } = context;
        let { product } = parentData;
        let { pack, price, retail, currency } = data as CartPackRow;
        let { cart } = this.cApp;
        if (value > 0)
            await cart.add(product, pack, value, price, retail, currency);
        else
            await cart.removeFromCart([{ productId: product.id, packId: pack.id }]);
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
        let { cart, cOrder } = this.cApp;
        this.selectedCartItems = cart.getSelectedItems();
        if (this.selectedCartItems === undefined) return;
        cOrder.createOrderFromCart(this.selectedCartItems);
    }


    /**
     * 导航到CheckOut界面
     */
    doCheckOut = async () => {


    }
}