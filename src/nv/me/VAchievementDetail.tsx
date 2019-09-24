import * as React from 'react';
import { VPage, Page, LMR, List, EasyDate, tv, FA, TabCaption, TabProp, Tabs, Widget, SelectWidget } from 'tonva';
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

class AchievementTab extends SelectWidget {
    private list = [
        { value: 1, title: '累计收益', name: 'b', select: true, className: 'mr-1 px-2' },
        { value: 0, title: '待到款', name: 'b', select: true, className: '' }
    ];

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        this.setValue(val);
    }

    render = () => {
        return <div className="w-100 text-center mr-4">
            {this.list.map((v, index) => {
                let { value, title } = v;
                let className = v.className + ' ' + (value === this.value && 'bg-white text-info');
                return <div className={className} onChange={this.onChange}>
                    {title}
                </div>
            })}
        </div>
    };
}

export class VAchievementDetail extends VPage<CMe> {

    @observable private achievementsA: any[] = [];
    @observable private achievementsB: any[];
    @observable private achievementsC: any[];
    @observable private tab_Status: number = 1;
    private oneAchievement: any;
    private twoAchievement: any;
    private threeAchievement: any;
    private aa: any;

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
        let onClickA = () => this.onClickHeader(1);
        let onClickB = () => this.onClickHeader(0);
        if (this.tab_Status == 1) {
            return <div className="w-100 text-center mr-4 ">
                <span className="bg-white text-info mr-1 px-3 py-2" onClick={onClickA} >累计收益</span>
                <span className="px-3 py-2" onClick={onClickB} >&nbsp;待到款&nbsp;</span>
            </div>;
        } else {
            return <div className="w-100 text-center mr-4 ">
                <span className="mr-1 px-3 py-2" onClick={onClickA}>累计收益</span>
                <span className="bg-white text-info px-3 py-2" onClick={onClickB}>&nbsp;待到款&nbsp;</span>
            </div >;
        }
    }

    onClickHeader = (status: number) => {
        this.tab_Status = status;
    }

    private page = observer(() => {

        let tabs = [
            {
                name: 'a',
                caption: tabCaption('A类收益', this.oneAchievement),
                content: () => {
                    return <List items={this.achievementsA} item={{ render: this.renderItem }} none="无收益" />
                },
                onShown: async () => {
                    //this.achievementsA = [];
                    this.achievementsA = await this.controller.searchAchievementDetail(1, this.tab_Status);
                }
            }, {
                name: 'b',
                caption: tabCaption('B类收益', this.twoAchievement),
                content: () => {
                    return <List items={this.achievementsB} item={{ render: this.renderItem }} none="无收益" />
                },
                onShown: async () => {
                    this.achievementsB = [];
                    this.achievementsB.push(...await this.controller.searchAchievementDetail(2, this.tab_Status));
                }
            }, {
                name: 'c',
                caption: tabCaption('C类收益', this.threeAchievement),
                content: () => {
                    return <List items={this.achievementsC} item={{ render: this.renderItem }} none="无收益" />
                },
                onShown: async () => {
                    this.achievementsC = [];
                    this.achievementsC.push(...await this.controller.searchAchievementDetail(3, this.tab_Status));
                }
            }
        ];

        return <Page header={this.header()} headerClassName={consts.headerClass} >
            <Tabs tabs={tabs} tabPosition="top" />
        </Page >
    })
}
