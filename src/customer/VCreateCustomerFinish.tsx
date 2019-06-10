import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';

export class VCreateCustomerFinish extends VPage<CCustomer> {

    async open(customer: any) {
        this.openPage(this.page);
    }

    comeBack = () => {
        this.closePage(2);
    }
    private page = observer((customer: any) => {
        return <Page header='新建客户' headerClassName='bg-primary py-1 px-3'>
            <div className="w-100 text-center m-3 text-muted">
                客户添加成功，请在客户搜索页面查看详情！
            </div>
            <div className="w-100 text-center">
                <label className="text-success" onClick={this.comeBack}> 返回</label>
            </div>

        </Page>
    })
}