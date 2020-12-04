import * as React from 'react';
import { VPage, Page, BoxId, EasyDate } from 'tonva';
import { COrder } from './COrder';
import { tv } from 'tonva';
import { List } from 'tonva';
import { OrderItem } from '../order/Order';
// import { CartItem2 } from 'cart/Cart';
// import { webuser } from 'tvs/webuser';

export class VOrderDetail extends VPage<COrder> {
    private orderName: string;
    async open(param: any) {
        let { order, type } = param;
        this.orderName = type;
        this.openPage(this.page, order);
    }


    private packsRow = (item: any, index: number) => {
        let { pack, quantity, price, currency } = item;

        return <div key={index} className="px-2 py-2 border-top">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1"><b>{tv(pack.obj, v => v.radioy)}{tv(pack.obj, v => v.unit)}</b></div>
                <div className="w-12c mr-4 text-right">
                    <span className="text-danger h5"><small>¥</small>{parseFloat((price * quantity).toFixed(2))}</span>
                    <small className="text-muted">(¥{parseFloat(price.toFixed(2))} × {quantity})</small>
                </div>
            </div>
        </div>;
    }

    private renderOrderItem = (orderItem: OrderItem) => {
        let { product, packs } = orderItem;
        let { controller, packsRow } = this;
        return <div>
            <div className="row p-1 my-1">
                <div className="col-lg-6 pb-3">{controller.renderOrderItemProduct(product)}</div>
                <div className="col-lg-6">{
                    packs.map((p, index) => {
                        return packsRow(p, index);
                    })
                }</div>
            </div>
        </div>;
    }

    private page = (order: any) => {

        let { brief, data } = order;
        let { id, no, state, description, date, user } = brief;
        let { orderItems, currency, shippingContact, invoiceContact, invoiceType, invoiceInfo, amount, couponOffsetAmount, couponRemitted
            , freightFee, freightFeeRemitted, adress, webUser, addressString, name, mobile } = data;

        let couponUI;
        if (couponOffsetAmount || couponRemitted) {
            let offsetUI, remittedUI;
            if (couponOffsetAmount) {
                offsetUI = <div className="d-flex flex-row justify-content-between">
                    <div className="text-muted">折扣:</div>
                    <div className="text-right text-danger"><small>¥</small>{couponOffsetAmount}</div>
                </div>
            }
            if (couponRemitted) {
                remittedUI = <div className="d-flex flex-row justify-content-between">
                    <div className="text-muted">抵扣:</div>
                    <div className="text-right text-danger"><small>¥</small>{couponRemitted}</div>
                </div>
            }
            couponUI = <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">优惠券:</div>
                <div className="col-9">
                    {offsetUI}
                    {remittedUI}
                </div>
            </div>
        }

        let freightFeeUI, freightFeeRemittedUI;
        if (freightFee) {
            freightFeeUI = <>
                <div className="text-right text-danger"><small>¥</small>{freightFee}</div>
            </>
            if (freightFeeRemitted) {
                freightFeeRemittedUI = <>
                    <div className="text-right text-danger"><small>¥</small>{freightFeeRemitted}(减免)</div>
                </>
            }
        }
        let { currentUser } = this.controller.cApp;
        let draftName = (this.orderName === 'customerSelf') ? <>{tv(shippingContact, v => v.name)}</> : currentUser.firstName;

        let header = <>订单详情: {no}</>
        return <Page header={header} footer={<></>}>
            <List items={orderItems} item={{ render: this.renderOrderItem }} />
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">收货地址:</div>
                <div className="col-9">
                    {/* {tv(shippingContact, (v) => <>{v.name}{v.organizationName}{v.mobile}{v.addressString}</>)} */}
                    <div>{tv(shippingContact, (v) => <>{v.name}<span className='px-1'>{v.mobile}</span>{v.organizationName}</>)}</div>
                    <div className='small'>{tv(shippingContact.obj.address, undefined, undefined)}{tv(shippingContact, (v) => v.addressString)}</div>
                </div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">发票地址:</div>
                <div className="col-9">
                    {/* {tv(invoiceContact)} */}
                    <div>{tv(invoiceContact, (v) => <>{v.name}<span className='px-1'>{v.mobile}</span>{v.organizationName}</>)}</div>
                    <div className='small'>{tv(invoiceContact.obj.address, undefined, undefined)}{tv(invoiceContact, (v) => v.addressString)}</div>
                </div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">发票信息:</div>
                <div className="col-9">{invoiceTemplate(invoiceType, invoiceInfo)}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">运费:</div>
                <div className="col-9">{freightFeeUI}{freightFeeRemittedUI}</div>
            </div>
            {couponUI}
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">下单时间:</div>
                <div className="col-9 text-right"><EasyDate date={date} /></div>
            </div>
            <div className="bg-white p-3 my-1 d-flex justify-content-between">
                <span className='text-success'>制单人:{draftName}</span>
                <span className="text-danger font-weight-bold">总金额: {amount}{tv(currency)}</span>
            </div>
        </Page>
    }
}

function invoiceTemplate(invoiceType: BoxId, invoiceInfo: BoxId): JSX.Element {
    return <>
        {tv(invoiceType, invoiceTypeUI, undefined, () => <></>)}<br />
        {tv(invoiceInfo, invoiceInfoUI, undefined, () => <></>)}
    </>
}

function invoiceTypeUI(values: any) {
    let { id, description } = values;
    return <>{description}</>;
}

function invoiceInfoUI(values: any) {
    let { id, title, taxNo, address, telephone, bank, accountNo } = values;
    return <>{title}</>;
}