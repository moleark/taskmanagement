import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomer } from './CCustomer';

export class VCreateCustomerFinish extends VPage<CCustomer> {

    private result: number;
    async open(param: number) {
        this.result = param;
        this.openPage(this.page);
    }

    comeBack = () => {
        this.controller.searchByKey('');
        this.closePage(3);
    }
    private page = observer(() => {

        var show: any;
        if (this.result == 0) {
            show = <span className="text-danger" > 客户已被其他轻代理占用，跟踪此客户无法获取绩效！</span>;
        }
        return <Page header='新建客户' headerClassName='bg-primary py-1 px-3'>
            <div className="w-100 text-center m-3 text-muted">
                客户添加成功，请在客户搜索页面查看详情！<br />
                {show}
            </div>
            <div className="w-100 text-center">
                <label className="text-success" onClick={this.comeBack}> 返回</label>
            </div>
        </Page>
    })
}