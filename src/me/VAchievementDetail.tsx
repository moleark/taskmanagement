import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, tv, FA, Tabs, TabProp, TabCaption } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { CMe } from './CMe';
import { consts } from '../consts';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
const tabCaption = (caption:string):TabCaption => {
    return (selected: boolean) => <span className={color(selected)}>{caption}</span>;
}

export class VAchievementDetail extends VPage<CMe> {

    @observable private achievementsA: any[];
    @observable private achievementsB: any[];
    @observable private achievementsC: any[];
    private currentState: string;
    async open(param: any) {
        this.currentState = param;
        this.openPage(this.page);
    }

    private renderItem(model: any, index: number) {
        let { date, mycustomer, Amount } = model;
        let left = <small className="text-muted"><EasyDate date={date} /></small>;
        let right = <small className="text-muted"><div className="px-3"> {Amount} <FA name="cny" className="text-warning" /></div></small>;
        return <div className="d-block">
            <div>
                <LMR className="px-3 py-2 " left={left} right={right}></LMR>
            </div>
        </div>
    }

    private tabs:TabProp[] = [
        {
            name: 'a',
            caption: tabCaption('A类业绩'),
            content: () => {
                return <List items={this.achievementsA} item={{ render: this.renderItem }} none="无业绩" />
            },
            load: async () => {
                this.achievementsA = await this.controller.searchAchievementDetail(1);
            }
        }, {
            name: 'b',
            caption: tabCaption('B类业绩'),
            content: () => {
                return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无业绩" />
            },
            load: async () => {
                this.achievementsB = await this.controller.searchAchievementDetail(2);
            }
        }, {
            name: 'c',
            caption: tabCaption('C类业绩'),
            content: () => {
                return <List items={this.achievementsC} item={{ render: this.renderItem }} none="无业绩" />
            },
            load: async () => {
                this.achievementsC = await this.controller.searchAchievementDetail(3);
            }
        }
    ];

    private page = observer(() => {
        /*
        let tabs = [
            {
                title: 'A类业绩',
                content: () => {
                    return <List items={this.achievementsA} item={{ render: this.renderItem }} none="无业绩" />
                },
                isSelected: this.currentState === 'A',
                load: async () => {
                    this.achievementsA = await this.controller.searchAchievementDetail(1);
                }
            }, {
                title: 'B类业绩',
                isSelected: this.currentState === 'B',
                content: () => {
                    return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无业绩" />
                },
                load: async () => {
                    this.achievementsB = await this.controller.searchAchievementDetail(2);
                }
            }, {
                title: 'C类业绩',
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
        return <Page header="我的业绩" headerClassName={consts.headerClass} tabPosition="top">
            <Tabs tabs={this.tabs} />
        </Page>
    })
}
