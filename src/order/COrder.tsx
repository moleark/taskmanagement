import * as React from "react";
import { CApp, CUqBase } from 'uq-app';
import { BoxId, QueryPager } from 'tonva-react';
import { makeObservable, observable } from "mobx";
import { VOrderStatus } from "./VOrderStatus";
import { groupByProduct } from '../tools/groupByProduct';
import { VOrderDetail } from './VOrderDetail';
import { CartPackRow, CartItem2 } from 'cart/Cart';
import { VCreateOrder } from './VCreateOrder';
import { Order, OrderItem } from './Order';
import { CInvoiceInfo } from './CInvoiceInfo';
import { OrderSuccess } from './OrderSuccess';
import { CSelectShippingContact, CSelectInvoiceContact } from './CSelectContact';
import { createOrderPriceStrategy, OrderPriceStrategy } from 'coupon/Coupon';

const FREIGHTFEEFIXED = 12;
const FREIGHTFEEREMITTEDSTARTPOINT = 100;

/* eslint-disable */
export class COrder extends CUqBase {
    pageShareCustomer: QueryPager<any>;
    orderData: Order = new Order();
    /**
     * 存储已经被应用的卡券，以便在使用后（下单后）将其删除
     */
    couponAppliedData: any = {};
    hasAnyCoupon: boolean;
    couponNo: any;
    /**
     * 当前webuser对应的buyeraccount，用来设置订单中的buyeraccount
     */
    buyerAccounts: any[] = [];
    constructor(cApp: CApp) {
        super(cApp);
        makeObservable(this, {
            pageShareCustomer: observable,
            orderData: observable,
            couponAppliedData: observable,
            couponNo: observable
        })
    }

    protected async internalStart() {

    }

    orderMangement = async () => {
        this.openVPage(VOrderStatus)
    }

    /**
     * 获取不同状态下的订单
     */
    showMyOrders = async (state: any) => {
        let { orderDraft } = this.uqs;
        let result: any;
        switch (state) {
            case 'BeingReviewed':
                result = await orderDraft.OrderDraft.mySheets('BeingReviewed', 1, -20);
                await this.getNewResult(result);
                return result;
            case 'Cancel':
                result = await orderDraft.OrderDraft.mySheets('Canceled', 1, -20);
                await this.getNewResult(result);
                return result
            case 'Pass':
                result = await orderDraft.OrderDraft.mySheets('#', 1, -20);
                await this.getNewResult(result);
                return result
            default:
                break;
        }
    }
    getNewResult = async (result: any) => {
        let promises: PromiseLike<any>[] = [];
        let promises1: PromiseLike<any>[] = [];
        result.forEach((v) => {
            promises.push(this.uqs.orderDraft.OrderDraft.getSheet(v.id));
            promises1.push(this.uqs.orderDraft.getSendOutHistory.table({ orderDraft: v.id }))
        })
        let order = await Promise.all(promises);
        let list = await Promise.all(promises1);
        result.forEach((v) => {
            order.forEach((e) => {
                if (e.brief.id === v.id) {
                    v.webUser = e.data.webUser
                }
            })
            list.forEach((ele) => {
                if (ele && ele.length > 0 && v.id === ele[0].id)
                    v.counts = ele.length
            })
        })
        return result
    }

    getValidCouponsForWebUser = async (currentUserId: number): Promise<any[]> => {
        let { uqs } = this.cApp;
        let { webuser } = uqs;
        let { WebUserCoupon } = webuser;
        let couponsForWebUser: any[] = await WebUserCoupon.table({ webUser: currentUserId });
        let validCouponsForWebUser: any[] = [];
        if (couponsForWebUser) {
            validCouponsForWebUser = couponsForWebUser.filter(v => v.expiredDate.getTime() > Date.now());
        }
        return validCouponsForWebUser;
    }

    openOrderDetail = async (orderId: number, type: string) => {
        let order: any
        if (type === 'customerSelf') {
            order = await this.uqs.order.Order.getSheet(orderId);
        } else {
            order = await this.uqs.orderDraft.OrderDraft.getSheet(orderId);
        }
        let { data } = order;
        let { orderItems } = data;
        let orderItemsGrouped = groupByProduct(orderItems);
        data.orderItems = orderItemsGrouped;
        let param = { order, type }
        this.openVPage(VOrderDetail, param);
    }

    /**
     * 传参数 
     */
    createOrderFromCart = async (cartItems: CartItem2[]) => {
        let { cApp, uqs } = this;
        let { currentUser, currentSalesRegion } = cApp;

        let { currentMyCustomer } = cApp;
        let { webuser: currentWebUser } = currentMyCustomer;
        this.orderData.webUser = currentWebUser.id; //客户webUser ID储存在订单中；
        this.orderData.salesRegion = currentSalesRegion.id;//销售区域
        this.orderData.orderMaker = currentUser;
        this.removeCoupon();
        // this.hasAnyCoupon = await this.hasCoupons();

        let buyerAccountQResult = await uqs.webuser.WebUserBuyerAccount.query({ webUser: currentWebUser })
        if (buyerAccountQResult) {
            this.buyerAccounts = buyerAccountQResult.ret;
            if (this.buyerAccounts && this.buyerAccounts.length === 1) {
                this.orderData.buyerAccount = this.buyerAccounts[0].buyerAccount;
            }
        }

        //获取客户的contact
        let { webuser: webUserApis } = uqs;
        let { WebUser: WebUserTuid, WebUserContact, WebUserSetting } = webUserApis;
        let webUser = await WebUserTuid.load(currentWebUser);
        let webUserSettings = await WebUserSetting.obj({ webUser: currentWebUser });
        if (webUserSettings) {
            //地址
            this.orderData.shippingContact = webUserSettings.shippingContact;
            //发票地址
            this.orderData.invoiceContact = webUserSettings.shippingContact;
            //发票类型
            this.orderData.invoiceType = webUserSettings.invoiceType;
            //发票信息
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

    /**
    * 提交订单
    */
    submitOrder = async () => {
        let { uqs, cart } = this.cApp;
        let { orderDraft } = uqs;
        let { orderItems } = this.orderData;
        let result: any = await orderDraft.OrderDraft.save("order", this.orderData.getDataForSave());
        let { id: orderId, flow, state } = result;
        await orderDraft.OrderDraft.action(orderId, flow, state, "submit");
        let param: [{ productId: number, packId: number }] = [] as any;
        orderItems.forEach(e => {
            e.packs.forEach(v => {
                param.push({ productId: e.product.id, packId: v.pack.id })
            })
        });
        cart.removeFromCart(param);
        // // 打开下单成功显示界面
        let couponNo = this.couponNo
        this.closePage(5)
        this.openVPage(OrderSuccess, { result, couponNo });
    }

    renderOrderItemProduct = (product: BoxId) => {
        let { cProduct } = this.cApp;
        return cProduct.renderCartProduct(product);
    }

    /**
     * 获取客户地址列表
     */
    async getContacts(): Promise<any[]> {
        let { webuser } = this.cApp.currentMyCustomer;
        return await this.uqs.webuser.WebUserContacts.table({ webUser: webuser.id });
    }

    /**
     * 修改客户地址信息
     */
    onSelectShippingContact = async () => {
        let cSelect = this.newC(CSelectShippingContact);
        let contactBox = await cSelect.call<BoxId>(true);
        this.orderData.shippingContact = contactBox;
    }

    /**
     * 修改客户发票地址
     */
    onSelectInvoiceContact = async () => {
        let cSelect = this.newC(CSelectInvoiceContact);
        let contactBox = await cSelect.call<BoxId>(true);
        this.orderData.invoiceContact = contactBox;
    }

    /**
     * 打开发票信息编辑界面
     */
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

    /**
     * 打开优惠卡券界面
     */
    onCouponEdit = async () => {
        let { cCoupon } = this.cApp;
        let coupon = await cCoupon.call<any>(true);
        this.couponNo = coupon.code;
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

    getOrderDraftState = async (id: number) => {
        let { uqs } = this.cApp;
        let orderData = await uqs.orderDraft.OrderDraft.getSheet(id);
        return orderData.brief;
    }

    orderDraftAction = async (id: number) => {
        let { uqs } = this.cApp;
        let { orderDraft } = uqs;
        await orderDraft.sendOutOrderDraft.submit({ orderDraft: id });
    }
}
