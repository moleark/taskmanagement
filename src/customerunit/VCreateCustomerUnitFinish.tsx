import * as React from 'react';
import { VPage, Page } from 'tonva';
import { observer } from 'mobx-react';
import { CCustomerUnit } from './CCustomerUnit';
import { setting } from 'appConfig';

export class VCreateCustomerUnitFinish extends VPage<CCustomerUnit> {

    async open(param: any) {
        this.openPage(this.page, param);
    }

    comeBack = () => {
        this.closePage(2);
    }


    private showresult = (param: any) => {
        if (param.code === 0) {
            return <>
                单位已存在，创建失败！
            </>;
        } else {
            return <>
                单位添加成功，请在单位搜索页面查看详情！
            </>;
        }

    }

    private page = observer((param: any) => {
        return <Page header='新建单位' headerClassName={setting.pageHeaderCss}>
            <div className="w-100 text-center m-3 text-muted">
                {this.showresult(param)}
            </div>
            <div className="w-100 text-center">
                <label className="text-success" onClick={this.comeBack}> 返回</label>
            </div>
        </Page>
    })
}