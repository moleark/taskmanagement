import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs, TabProp } from 'tonva';
import { CSalesTaskApp } from 'CSalesTaskApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VHome extends VPage<CSalesTaskApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }

    render = (param?: any): JSX.Element => {
        let { cSalesTask, cCustomer, cProduct, cMe } = this.controller;
        let faceTabs: any[] = [
            { name: 'home', label: '任务', content: cSalesTask.tab, icon: 'home', notify: undefined/*store.homeCount*/ },
            { name: 'member', label: '客户', content: cCustomer.tab, icon: 'vcard' },
            { name: 'member', label: '产品', content: cProduct.tab, icon: 'flask' },
            { name: 'member', label: '我', content: cMe.tab, icon: 'user', load: cMe.load }
        ].map(v => {
            let { name, label, icon, content, notify, load } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
                load: load,
            }
        });
        return <Page header={false}>
            <Tabs tabs={faceTabs} />
        </Page>;
    }
}
