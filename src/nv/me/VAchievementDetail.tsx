import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, tv, FA, TabCaption, TabProp, Tabs } from 'tonva';
import { observable } from 'mobx';
import { observer, Observer } from 'mobx-react';
import { CMe } from './CMe';
import { consts } from '../consts';

const color = (selected: boolean) => selected === true ? 'small text-primary' : 'small text-muted';
const tabCaption = (caption: string, amount: number): TabCaption => {
    return (selected: boolean) => <div className="w-100 text-center pb-2">
        <div className={color(selected)}>{caption}</div>
        <div className={color(selected)}>{amount}</div>
    </div>;
}

export class VAchievementDetail extends VPage<CMe> {

    @observable private achievementsA: any[] = [];
    @observable private achievementsB: any[];
    @observable private achievementsC: any[];
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
        let { date, mycustomer, Amount, order, status } = model;
        var statusShow: any;
        if (status == 1) {
            statusShow = "待转入";
        } else {
            statusShow = "已转入";
        }
        let data = <small><EasyDate date={date} /></small>;
        let amount = <small ><div>{Amount}</div></small>;
        return <div className="d-block">
            <div>
                <LMR className="px-3 py-2 small" left={<div className="text-muted">收益产生日期</div>} right={data}></LMR>
                <LMR className="px-3 py-2 small" left={<div className="text-muted">订单号</div>} right={order}></LMR>
                <LMR className="px-3 py-2 small" left={<div className="text-muted">状态</div>} right={statusShow}></LMR>
                <LMR className="px-3 py-2 small" left={<div className="text-muted">预估金额</div>} right={amount}></LMR>
            </div>
        </div>
    }

    private tabs: TabProp[] = [
        {
            name: 'a',
            caption: tabCaption('A类业绩', this.oneAchievement),
            content: () => {
                return <List items={this.achievementsA} item={{ render: this.renderItem }} none="无业绩" />
            },
            load: async () => {
                this.achievementsA = [];
                this.achievementsA.push(...await this.controller.searchAchievementDetail(1));
                //this.achievementsA = await this.controller.searchAchievementDetail(1);
            }
        }, {
            name: 'b',
            caption: tabCaption('B类业绩', this.twoAchievement),
            content: () => {
                return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无业绩" />
            },
            load: async () => {
                this.achievementsB = [];
                this.achievementsB.push(...await this.controller.searchAchievementDetail(2));
            }
        }, {
            name: 'c',
            caption: tabCaption('C类业绩', this.threeAchievement),
            content: () => {
                return <List items={this.achievementsC} item={{ render: this.renderItem }} none="无业绩" />
            },
            load: async () => {
                this.achievementsC = [];
                this.achievementsC.push(...await this.controller.searchAchievementDetail(3));
            }
        }
    ];

    private page = observer(() => {
        /*
        let tabs = [
            {
                title: 'A类收益',
                content: () => {
                    return <List items={this.achievementsA} item={{ render: this.renderItem }} none="无业绩" />
                },
                isSelected: this.currentState === 'A',
                load: async () => {
                    this.achievementsA = await this.controller.searchAchievementDetail(1);
                }
            }, {
                title: 'B类收益',
                isSelected: this.currentState === 'B',
                content: () => {
                    return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无业绩" />
                },
                load: async () => {
                    this.achievementsB = await this.controller.searchAchievementDetail(2);
                }
            }, {
                title: 'C类收益',
                isSelected: this.currentState === 'C',
                content: () => {
                    return <List items={this.achievementsC} item={{ render: this.renderItem }} none="无业绩" />
                },
                load: async () => {
                    this.achievementsC = await this.controller.searchAchievementDetail(3);
                }
            }
        ];
        */

        let tabs: TabProp[] = [
            {
                name: 'a',
                caption: tabCaption('A类业绩', this.oneAchievement),
                content: () => {
                    return <List items={this.achievementsA} item={{ render: this.renderItem }} none="无业绩" />
                },
                load: async () => {
                    this.achievementsA = [];
                    this.achievementsA.push(...await this.controller.searchAchievementDetail(1));
                    //this.achievementsA = await this.controller.searchAchievementDetail(1);
                }
            }, {
                name: 'b',
                caption: tabCaption('B类业绩', this.twoAchievement),
                content: () => {
                    return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无业绩" />
                },
                load: async () => {
                    this.achievementsB = [];
                    this.achievementsB.push(...await this.controller.searchAchievementDetail(2));
                }
            }, {
                name: 'c',
                caption: tabCaption('C类业绩', this.threeAchievement),
                content: () => {
                    return <List items={this.achievementsC} item={{ render: this.renderItem }} none="无业绩" />
                },
                load: async () => {
                    this.achievementsC = [];
                    this.achievementsC.push(...await this.controller.searchAchievementDetail(3));
                }
            }
        ];
        return <Page header="我的业绩" headerClassName={consts.headerClass}>
            <Tabs tabs={tabs} tabPosition="top" />
        </Page>
    })
}
