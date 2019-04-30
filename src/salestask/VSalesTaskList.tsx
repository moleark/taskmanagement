import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { List } from 'tonva-react-form';
import { observer } from 'mobx-react';
//import { cCartApp } from 'ui/CCartApp';

export class VSalesTaskList extends VPage<CSalesTask> {

  async open(param: any) {

    this.openPage(this.page, param);
  }

  private onScrollBottom = async () => {

    await this.controller.pageSalesTask.more();
  }


  private renderSalesTask(salesTask: any, index: number) {
    return <div>测试</div>
  }

  private page = observer((param: any) => {

    let { pageSalesTask, cApp } = this.controller;
    let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关产品，请重新搜索！</div>
    return <Page onScrollBottom={this.onScrollBottom}>
      <List before={''} none={none} items={param} item={{ render: this.renderSalesTask }} />
    </Page>
  });
}