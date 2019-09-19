import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';

export class VCustomerChek extends VPage<CCustomer> {

    private result: number;
    async open(param: any) {
        this.result = param;
        this.openPage(this.page, param);
    }

    comeBack = () => {
        this.closePage(1);
    }
    private page = observer((param: any) => {

        var show: any;
        if (this.result == 1) {
            show = <span className="text-danger py-4" > 客户手机号已被绑定！</span>;
        } else {
            show = <span >客户手机号未被绑定！</span>;
        }
        return <Page header='新建客户' headerClassName='bg-primary py-1 px-3'>
            <div className="w-100 text-center m-3 text-muted">
                {show}
            </div>
            <div className="w-100 text-center">
                <label className="text-success" onClick={this.comeBack}> 返回</label>
            </div>
        </Page>
    })
}