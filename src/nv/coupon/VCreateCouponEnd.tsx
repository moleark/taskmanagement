import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page } from 'tonva';
import { CCoupon } from './CCoupon';

export class VCreateCouponEnd extends VPage<CCoupon> {

    private code: string
    async open(code: string) {
        this.code = code;
        this.openPage(this.page);
    }

    comeBack = () => {
        this.closePage(2);
    }
    private page = observer(() => {
        var inviteCode = "";
        if (this.code) {
            this.code = String(this.code);
            let p1 = this.code.substr(0, 4);
            let p2 = this.code.substr(4);
            inviteCode = p1 + ' ' + p2;
        }
        return <Page header='优惠码' back="none" headerClassName='bg-primary py-1 px-3'>
            <div className="w-100 text-center m-3 text-muted">
                优惠码已生成，赶快发给客户吧！
            </div>
            <div className="w-100 text-center m-3 fa-2x text-info">
                {inviteCode}
            </div>
            <div className="w-100 text-center">
                <label className="text-success" onClick={this.comeBack}> 返回</label>
            </div>
        </Page>
    })
}