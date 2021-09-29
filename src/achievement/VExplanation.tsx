import * as React from 'react';
import { VPage, Page } from 'tonva-react';
import { CBalance } from './CBalance';
import { observer } from 'mobx-react';

export class VExplanation extends VPage<CBalance> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {

        return <Page header="帮助">
            <div className="bg-white p-3">
                <dl>
                    <dt>累计收益</dt>
                    <dd>指您在百灵威通过开展“轻代理”业务所获取的累计收益。</dd>
                    <dt>待到账</dt>
                    <dd>在您获得的累计收益中，可能存在部分订单尚未付款的情况，“待到账”即为该部分订单所对应的收益，这部分收益不支持提现。</dd>
                    <dt>已到账</dt>
                    <dd>在您获得的累计收益中，若订单已经付款，则该部分订单所对应的收益为“已到账"收益。已到账收益可以申请提现。</dd>
                    <dt>余额</dt>
                    <dd>指在您的“已到账”收益减去您提现部分（包括已申请提现但尚未发放的金额）之后剩余的金额。</dd>
                    <dt>已申请未发放</dt>
                    <dd>指您已经申请提现但尚未发放到您的银行账号中的金额。百灵威会将此部分金额按月发放到您的银行账号中，款项发放后，此部分金额将归零。</dd>
                    <dt>累计提现</dt>
                    <dd>指您累计提现且已经发放到您的银行账号中的金额。</dd>
                </dl>
            </div>
        </Page >
    });
}