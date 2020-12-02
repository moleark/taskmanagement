import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, tv, List, LMR, FA, EasyDate, Tabs, TabProp, TabCaptionComponent } from 'tonva';
import { CCoupon } from './CCoupon';
import { VCreditsPage, VCouponPage } from './VCouponCreditsPage';

export const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VCoupleAvailable extends VPage<CCoupon> {
    private tabs: TabProp[];
    private currentState: string;
    private list: any;

    async open(param: any) {
        this.openPage(this.page);
    }
    couponli: any = [
        { caption: '优惠券', state: 'coupon', toolTip: '无' },
        { caption: '积分券', state: 'credits', toolTip: '无' },
    ];
    private getTabs = async () => {
        this.tabs = this.couponli.map((v: any) => {
            let { caption, state, icon, toolTip } = v;
            return {
                name: caption,
                caption: (selected: boolean) => TabCaptionComponent(caption, icon, color(selected)),
                content: () => {
                    return this.list
                },
                isSelected: this.currentState === state,
                load: async () => {
                    if (state === 'coupon')
                        this.list = await this.renderVm(VCouponPage)
                    else
                        this.list = await this.renderVm(VCreditsPage)
                }
            };
        });
    }

    private page = observer(() => {
        this.getTabs();
        return <Page header="选用卡券">
            <div className='w-100'>
                <Tabs tabs={this.tabs} tabPosition="top" />
            </div>


        </Page>
    })
}
