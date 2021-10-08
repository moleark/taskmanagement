import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, tv } from 'tonva-react';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';

export enum TabStatus { sum = 0, pending = 1 };
export enum TabType { A = 1, B = 2, C = 3 };

export class VAssistAchievementDetail extends VPage<CBalance> {

    private achievements: any[] = [];
    tab_Status: TabStatus = TabStatus.sum;
    private type: TabType = TabType.A;
    constructor(cBalance: CBalance) {
        super(cBalance);
        makeObservable(this, {
            tab_Status: observable,
        })
    }

    async open(param: TabStatus) {
        this.tab_Status = param;
        this.achievements = await this.controller.searchAchievementDetail(this.type, this.tab_Status);
        this.openPage(this.page);
    }

    private renderItem(model: any, index: number) {
        let { date, amount, orderno, state, mycustomer } = model;
        var statusShow: any;
        if (state === 1) {
            statusShow = "已转入";
        } else {
            statusShow = "待转入";
        }

        if (mycustomer) {
            mycustomer = tv(mycustomer, v => v.name);
        } else {
            mycustomer = "";
        }

        let data = <EasyDate date={date} />;
        return <div className="d-block">
            <div>
                <LMR className="px-3 pt-2 small" left={<div className="text-muted">收益产生日期</div>} right={data}></LMR>
                <LMR className="px-3 small" left={<div className="text-muted">订单号</div>} right={orderno}></LMR>
                <LMR className="px-3 small" left={<div className="text-muted">客户</div>} right={mycustomer} ></LMR>
                <LMR className="px-3 small" left={<div className="text-muted"> 预估金额</div>} right={<div><span className="iconfont icon-huobiqiandaizijin" style={{ fontSize: "15px", color: "#f6ad15" }}></span>{amount}</div>}></LMR>
                <LMR className="px-3 pb-2 small" left={<div className="text-muted">状态</div>} right={statusShow}></LMR>
            </div>
        </div >
    }

    private headers = () => {

        let onClickA = () => this.onClickHeader(TabStatus.sum);
        let onClickB = () => this.onClickHeader(TabStatus.pending);
        if (this.tab_Status === TabStatus.sum) {
            return <div className="w-100 text-center mr-4 cursor-pointer ">
                <span className="bg-white text-info mr-1 px-3 py-2" onClick={onClickA} >累计收益</span>
                <span className="px-3 py-2" onClick={onClickB} >&nbsp;待到款&nbsp;</span>
            </div>;
        } else {
            return <div className="w-100 text-center mr-4 cursor-pointer  ">
                <span className="mr-1 px-3 py-2" onClick={onClickA}>累计收益</span>
                <span className="bg-white text-info px-3 py-2" onClick={onClickB}>&nbsp;待到款&nbsp;</span>
            </div >;
        }
    }

    private onClickHeader = async (status: TabStatus) => {
        if (this.tab_Status === status) return;
        this.tab_Status = status;
    }

    private page = observer(() => {

        return <Page header={this.headers()}>
            <List items={this.achievements} item={{ render: this.renderItem }} none="无收益" />
        </Page >
    })
}
