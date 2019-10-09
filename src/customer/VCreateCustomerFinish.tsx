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
        if (this.result === 1) {
            show = <span className="px-4 py-4" > 根据新建客户所提供的信息，系统认为该客户可能已与其他销售绑定，请酌情开发。</span>;
        }
        return <Page header='新建客户' headerClassName='bg-primary py-1 px-3'>
            <div className="w-100  text-center text-muted my-4 px-4">
                添加成功，请在客户搜索页面查看详情！
                <br />
                <br />
            </div>
            <div className="w-100 text-muted my-4 px-4">
                {show}
            </div>
            <div className="w-100 text-center">
                <label className="text-success" onClick={this.comeBack}> 返回</label>
            </div>
        </Page>
    })
}