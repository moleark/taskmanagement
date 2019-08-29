import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, tv, FA } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { CMe } from './CMe';

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
        let { date, mycustomer, price } = model;
        let left = <small className="text-muted"><EasyDate date={date} /></small>;
        let right = <small className="text-muted"><div className="px-3"> {price} <FA name="cny" className="text-warning" /></div></small>;
        return <div className="d-block">
            <div>
                <LMR className="px-3 py-2 " left={left} right={right}></LMR>
            </div>
        </div>
    }

    private page = observer(() => {
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
                    this.currentState = 'all';
                    this.achievementsB = await this.controller.searchAchievementDetail(2);
                }
            }, {
                title: 'C类业绩',
                isSelected: this.currentState === 'C',
                content: () => {
                    return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无业绩" />
                },
                load: async () => {
                    this.currentState = 'all';
                    this.achievementsB = await this.controller.searchAchievementDetail(3);
                }
            }
        ];
        return <Page header="我的业绩" tabs={tabs} tabPosition="top"></Page>
    })
}
