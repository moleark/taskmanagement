import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, tv, FA, TabCaption, TabProp, Tabs } from 'tonva';
import { observable } from 'mobx';
import { observer, Observer } from 'mobx-react';
import { CMe } from './CMe';
import { consts } from '../consts';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
const tabCaption = (caption: string, amount: number): TabCaption => {
    return (selected: boolean) => <div className="w-100 small pt-2 text-center">
        <div className={color(selected)}>{caption}</div>
        <div className={color(selected)}>{amount}</div>
    </div>;
}

export class VAchievementDetail extends VPage<CMe> {

    @observable private achievementsA: any[] = [];
    @observable private achievementsB: any[];
    @observable private achievementsC: any[];
    @observable private status: number = 1;
    private oneAchievement: any;
    private twoAchievement: any;
    private threeAchievement: any;

    async open(param: any) {
        this.openPage(this.page);
        let { oneAchievement, twoAchievement, threeAchievement } = this.controller.salesAmont;
        this.oneAchievement = oneAchievement;
        this.twoAchievement = twoAchievement;
        this.threeAchievement = threeAchievement;
    }

    private renderItem(model: any, index: number) {
        let { date, Amount, order, status } = model;
        var statusShow: any;
        if (status == 1) {
            statusShow = "待转入";
        } else {
            statusShow = "已转入";
        }
        let data = <EasyDate date={date} />;
        let amount = <div>{Amount}</div>;
        return <div className="d-block">
            <div>
                <LMR className="px-3 pt-2 small" left={<div className="text-muted">收益产生日期</div>} right={data}></LMR>
                <LMR className="px-3 small" left={<div className="text-muted">订单号</div>} right={order}></LMR>
                <LMR className="px-3 small" left={<div className="text-muted">状态</div>} right={statusShow}></LMR>
                <LMR className="px-3 pb-2 small" left={<div className="text-muted">预估金额</div>} right={amount}></LMR>
            </div>
        </div>
    }

    private header() {
        if (this.status == 1) {
            return <div className=" mx-4 " onClick={this.onClickHeader} >
                <span className="mx-4  ">总收益</span>
                <span className="">待到款</span>
            </div>;
        } else {
            return <div className=" mx-4 " onClick={this.onClickHeader} >
                < span className="mx-4" > 总收益</span >
                <span>待到款</span>
            </div >;
        }
    }

    private onClickHeader() {
        if (this.status == 1) {
            this.status = 0;
        } else {
            this.status = 1;
        }
    }

    private page = observer(() => {

        let tabs = [
            {
                name: 'a',
                caption: tabCaption('A类收益', this.oneAchievement),
                content: () => {
                    return <List items={this.achievementsA} item={{ render: this.renderItem }} none="无收益" />
                },
                load: async () => {
                    this.achievementsA = [];
                    this.achievementsA.push(...await this.controller.searchAchievementDetail(1, this.status));
                }
            }, {
                name: 'b',
                caption: tabCaption('B类收益', this.twoAchievement),
                content: () => {
                    return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无收益" />
                },
                load: async () => {
                    this.achievementsB = [];
                    this.achievementsB.push(...await this.controller.searchAchievementDetail(2, this.status));
                }
            }, {
                name: 'c',
                caption: tabCaption('C类收益', this.threeAchievement),
                content: () => {
                    return <List items={this.achievementsC} item={{ render: this.renderItem }} none="无收益" />
                },
                load: async () => {
                    this.achievementsC = [];
                    this.achievementsC.push(...await this.controller.searchAchievementDetail(3, this.status));
                }
            }
        ];
        var header = <div>

        </div>

        return <Page header={this.header()} headerClassName={consts.headerClass}>
            <Tabs tabs={tabs} tabPosition="top" />
        </Page>
    })
}
