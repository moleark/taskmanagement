import * as React from "react";
import { CUqBase } from "../CBase";
import { BoxId, QueryPager, RowContext } from "tonva";
import { observable } from "mobx";
import { VOrderStatus } from "./VOrderStatus";
import { groupByProduct } from '../tools/groupByProduct';
import { VOrderDetail } from './VOrderDetail';
import { VExplanationRegiste } from "./VExplanationRegiste";
import { VExplanationRegiste1 } from "./VExplanationRegiste";
import { LoaderProductChemicalWithPrices } from "../product/item";
import { CartPackRow, CartItem2 } from 'cart/Cart';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { CInvoiceInfo } from './CInvoiceInfo';
import { CSelectShippingContact, CSelectInvoiceContact } from './CSelectContact';
import { createOrderPriceStrategy, OrderPriceStrategy } from 'coupon/Coupon';

const FREIGHTFEEFIXED = 12;
const FREIGHTFEEREMITTEDSTARTPOINT = 100;
/* eslint-disable */
export class COrder extends CUqBase {

    @observable orderData: Order = new Order();
    /**
     * 存储已经被应用的卡券，以便在使用后（下单后）将其删除
     */
    @observable couponAppliedData: any = {};
    hasAnyCoupon: boolean;
    /**
     * 当前webuser对应的buyeraccount，用来设置订单中的buyeraccount
     */
    @observable buyerAccounts: any[] = [];
    protected async internalStart() {

    }

    orderMangement = async () => {
        this.openVPage(VOrderStatus)
    }
    /**
   * 获取不同状态下的订单
 */
    showMyOrders = async (state: any) => {
        let { order } = this.uqs;
        // let { currentUser } = this.cApp;
        let result;
        switch (state) {
            case 'tobeconfirmed':
                return await order.Order.mySheets(undefined, 1, -20);
            case 'cancelled':
                return await order.Order.mySheets(undefined, undefined, undefined);
            case 'confirmed':
                return await order.Order.mySheets(undefined, 1, -20);
            default:
                break;
        }
    }

    openOrderDetail = async (orderId: number) => {

        let order = await this.uqs.order.Order.getSheet(orderId);
        let { data } = order;
        let { orderItems } = data;
        let orderItemsGrouped = groupByProduct(orderItems);
        data.orderItems = orderItemsGrouped;
        this.openVPage(VOrderDetail, order);
    }

    /**
    * 根据状态读取我的订单  不同客户
    */
    getMyOrders = async (state: string, customer: any) => {
        let { id } = customer;
        let { order } = this.uqs;
        switch (state) {
            case 'tobeconfirmed':
                return await order.Order.mySheets(undefined, 1, -20);
            case 'cancelled':
                return await order.Order.mySheets(undefined, 1, -20);
            case 'completed':
                return await order.Order.mySheets("#", 1, -20)
            default:
                break;
        }
    }

    /**传参数 */
    createOrderFromCart = async (cartItems: CartItem2[]) => {
        let { cApp, uqs } = this;
        let { currentUser, currentSalesRegion, cCoupon, cProduct } = cApp;

        let { webuser } = cApp.draftCustomer;
        //获取客户的contact
        let { webuser: webUserTuid } = this.uqs;
        let { WebUser, WebUserContact, WebUserSetting } = webUserTuid;
        let webUser = await WebUser.load(webuser.id);
        let contact = await WebUserContact.obj({ "webUser": webuser.id });
        let webUserSettings = await WebUserSetting.obj({ webUser: webuser.id }) || { webUser: webuser.id };
        console.log(contact, webUserSettings)

        this.orderData.webUser = webuser.id; //客户webUser ID储存在订单中；
        this.orderData.salesRegion = currentSalesRegion.id;//销售区域
        this.removeCoupon();
        // this.hasAnyCoupon = await this.hasCoupons();

        let buyerAccountQResult = await uqs.webuser.WebUserBuyerAccount.query({ webUser: webuser.id })
        if (buyerAccountQResult) {
            this.buyerAccounts = buyerAccountQResult.ret;
            if (this.buyerAccounts && this.buyerAccounts.length === 1) {
                this.orderData.customer = this.buyerAccounts[0].buyerAccount;
            }
        }
        //地址
        if (this.orderData.shippingContact === undefined) {
            this.orderData.shippingContact = webUserSettings.shippingContact;
        }
        //发票地址
        if (this.orderData.invoiceContact === undefined) {
            this.orderData.invoiceContact = webUserSettings.shippingContact;
        }
        //发票类型
        if (this.orderData.invoiceType === undefined) {
            this.orderData.invoiceType = webUserSettings.invoiceType;
        }
        //发票信息
        if (this.orderData.invoiceInfo === undefined) {
            this.orderData.invoiceInfo = webUserSettings.invoiceInfo;
        }

        if (cartItems !== undefined && cartItems.length > 0) {
            this.orderData.currency = cartItems[0].packs[0].currency;
            this.orderData.orderItems = cartItems.map((e: any) => {
                var item = new OrderItem();
                item.product = e.product;
                item.packs = e.packs.map((v: any) => { return { ...v } }).filter((v: any) => v.quantity > 0 && v.price);
                item.packs.forEach((pk) => {
                    pk.priceInit = pk.price;
                })
                return item;
            });

            // 运费和运费减免
            this.orderData.freightFee = FREIGHTFEEFIXED;
            if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
                this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
            else
                this.orderData.freightFeeRemitted = 0;
        }

        // 如果当前webuser有VIP卡，默认下单时使用其VIP卡
        let webUserVIPCard = await webUserTuid.WebUserVIPCard.obj({ webUser: webUser });
        // if (webUserVIPCard !== undefined) {
        //     let coupon = await cCoupon.getCouponValidationResult(
        //         webUserVIPCard.vipCardCode.toString()
        //     );
        //     let { result, types, id } = coupon;
        //     if (result === 1) {
        //         if (types === "vipcard" || types === "coupon") {
        //             coupon.discountSetting = await cCoupon.getValidDiscounts(types, id);
        //         }
        //         this.applyCoupon(coupon);
        //     }
        // }
        this.openVPage(VCreateOrder);

    }


    /**
      * 删除优惠券
      */
    removeCoupon = () => {
        this.orderData.coupon = undefined;
        this.couponAppliedData = {};
        this.orderData.couponOffsetAmount = 0;
        this.orderData.couponRemitted = 0;
        this.orderData.point = 0;
        this.orderData.orderItems.forEach((e: OrderItem) => e.packs.forEach((v: CartPackRow) => v.price = v.priceInit));
    }

    renderOrderItemProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }

    /**获取客户地址列表 */
    async getContacts(): Promise<any[]> {
        let { webuser } = this.cApp.draftCustomer;
        return await this.uqs.webuser.WebUserContacts.table({ webUser: webuser.id });
    }
    /**修改客户地址信息 */
    onSelectShippingContact = async () => {
        let cSelect = this.newC(CSelectShippingContact);
        let contactBox = await cSelect.call<BoxId>(true);
        this.orderData.shippingContact = contactBox;
    }
    /**修改客户发票地址 */
    onSelectInvoiceContact = async () => {
        let cSelect = this.newC(CSelectInvoiceContact);
        let contactBox = await cSelect.call<BoxId>(true);
        this.orderData.invoiceContact = contactBox;
    }
    /*** 打开发票信息编辑界面 */
    onInvoiceInfoEdit = async () => {
        let cInvoiceInfo = this.newC(CInvoiceInfo);
        let { invoiceType, invoiceInfo } = this.orderData;
        let origInvoice = {
            invoiceType: invoiceType,
            invoiceInfo: invoiceInfo,
        }
        let newInvoice = await cInvoiceInfo.call<any>(origInvoice, true);
        this.orderData.invoiceType = newInvoice.invoiceType;
        this.orderData.invoiceInfo = newInvoice.invoiceInfo;
    }

    /**打开优惠卡券界面 */
    onCouponEdit = async () => {
        let { cCoupon } = this.cApp;
        let coupon = await cCoupon.call<any>(true);
        if (coupon) {
            await this.applyCoupon(coupon);
        }
    }

    /**
      * 使用优惠券后计算折扣金额和抵扣额
      */
    applyCoupon = async (coupon: any) => {

        this.removeCoupon();
        let { validitydate, isValid } = coupon;
        if (isValid === 1 && new Date(validitydate).getTime() > Date.now()) {
            this.couponAppliedData = coupon;
            let orderPriceStrategy: OrderPriceStrategy = createOrderPriceStrategy(coupon);
            if (orderPriceStrategy)
                orderPriceStrategy.applyTo(this.orderData, this.uqs);

            // 运费和运费减免
            this.orderData.freightFee = FREIGHTFEEFIXED;
            if (this.orderData.productAmount > FREIGHTFEEREMITTEDSTARTPOINT)
                this.orderData.freightFeeRemitted = FREIGHTFEEFIXED * -1;
            else
                this.orderData.freightFeeRemitted = 0;
        }
    }

}