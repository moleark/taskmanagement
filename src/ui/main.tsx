import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva-tools';
import { CSalesTaskApp } from 'CSalesTaskApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VHome extends VPage<CSalesTaskApp> {
  async open(param?: any) {
    this.openPage(this.render);
  }

  render = (param?: any): JSX.Element => {
    let { cSalesTask } = this.controller;
    let faceTabs = [
      { name: 'home', label: '待处理', content: cSalesTask.tab, icon: 'home', notify: undefined/*store.homeCount*/ },
      { name: 'member', label: '已处理', content: cSalesTask.tab, icon: 'vcard' }
    ].map(v => {
      let { name, label, icon, content, notify } = v;
      return {
        name: name,
        caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
        content: content,
        notify: notify,
      }
    });
    return <Page header={false}>
      <Tabs tabs={faceTabs} />
    </Page>;
  }
}
