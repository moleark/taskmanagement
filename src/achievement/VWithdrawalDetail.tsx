import * as React from 'react';
import { VPage, Page, EasyTime } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from '../consts';
import { CBalance } from './CBalance';

export class VWithdrawalDetail extends VPage<CBalance> {

    async open(order: number) {

        this.openPage(this.page, order);
    }

    private page = observer((order: any) => {

        let { brief, data, state, comments } = order;
        let { no, discription, date } = brief;
        let { amount } = data;
        discription = discription === "withdrawal" ? "支出" : "汇入";

        let stateShow: string = "";
        if (state.id === 1) {
            stateShow = "处理中";
        } else if (state.id === 2) {
            stateShow = "已转出";
        } else if (state.id === 3) {
            stateShow = "已驳回";
        }

        return <Page header="余额明细" headerClassName={consts.headerClass}>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">类型</div>
                <div className="col-9">{discription}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">时间</div>
                <div className="col-9">{<EasyTime date={date}></EasyTime>}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">单号</div>
                <div className="col-9">{no}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">金额</div>
                <div className="col-9">￥{amount}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">状态</div>
                <div className="col-9">{stateShow}</div>
            </div>
            <div className="bg-white row no-gutters p-3 my-1">
                <div className="col-3 text-muted">备注</div>
                <div className="col-9">{comments}</div>
            </div>
        </Page >
    });
}