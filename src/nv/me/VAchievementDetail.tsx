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
    @observable private parStatus: number = 1;
    private oneAchievement: any;
    private twoAchievement: any;
    private threeAchievement: any;
    private currentState: string;

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

    private page = observer(() => {

        let tabs: TabProp[] = [
            {
                name: 'a',
                caption: tabCaption('A类业绩', this.oneAchievement),
                content: () => {
                    return <List items={this.achievementsA} item={{ render: this.renderItem }} none="无业绩" />
                }
            }, {
                name: 'b',
                caption: tabCaption('B类业绩', this.twoAchievement),
                content: () => {
                    return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无业绩" />
                }
            }, {
                name: 'c',
                caption: tabCaption('C类业绩', this.threeAchievement),
                content: () => {
                    return <List items={this.achievementsC} item={{ render: this.renderItem }} none="无业绩" />
                }
            }
        ];

        let tabspar: TabProp[] = [
            {
                name: '1',
                caption: tabCaption('累计收益', this.oneAchievement),
                content: () => {
                    return <Tabs tabs={tabs} tabPosition="top" />
                },
                load: async () => {
                    this.achievementsA = [];
                    this.achievementsA.push(...await this.controller.searchAchievementDetail(2, 1));
                    this.achievementsB = [];
                    this.achievementsB.push(...await this.controller.searchAchievementDetail(2, 1));
                    this.achievementsC = [];
                    this.achievementsC.push(...await this.controller.searchAchievementDetail(2, 1));
                }
            }, {
                name: '0',
                caption: tabCaption('待到款', this.twoAchievement),
                content: () => {
                    return <Tabs tabs={tabs} tabPosition="top" />
                },
                load: async () => {
                    this.achievementsA = [];
                    this.achievementsA.push(...await this.controller.searchAchievementDetail(2, 0));
                    this.achievementsB = [];
                    this.achievementsB.push(...await this.controller.searchAchievementDetail(2, 0));
                    this.achievementsC = [];
                    this.achievementsC.push(...await this.controller.searchAchievementDetail(2, 0));
                }
            }
        ];

        return <Page headerClassName={consts.headerClass}>
            <Tabs tabs={tabspar} tabPosition="top" />
        </Page>
    })
}
