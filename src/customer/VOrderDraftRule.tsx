import * as React from 'react';
import { Page, VPage } from 'tonva-react';
import { CCustomer } from './CCustomer'
import { observer } from 'mobx-react';

export class VOrderDraftRule extends VPage<CCustomer> {
    async open() {
        this.openPage(this.page);
    }
    private page = observer(() => {
        return <Page header="代客下单说明">
            <div className='bg-white p-2'>
                <p className="pb-1">
                    您可以使用代客下单功能为您的客户下单，代客下单所制作的订单需发送给客户确认后方可生效。
                    <span className="small text-muted">可在“我的”——“订单管理”界面将订单发送给客户</span>
                </p>

                <p>使用代客下单功能的前提条件是：</p>
                <ul>
                    <li>客户需要在百灵威购物商城或官网注册有账号；</li>
                    <li>该账号需要关联到您的客户列表中的某个客户；</li>
                    <li>该客户未被其他销售或轻代理绑定；</li>
                </ul>
            </div>
        </Page>;
    })
}