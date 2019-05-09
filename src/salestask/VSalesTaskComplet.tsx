import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva-tools';
import { CSalesTask } from './CSalesTask';
import { observer } from 'mobx-react';

export class VSalesTaskComplet extends VPage<CSalesTask> {

    async open(salestask: any) {

        this.openPage(this.page, salestask);
    }

    private onCompletionTask = async (model: any) => {

        alert("确认完结吗？");
        await this.controller.completionTask();
        this.closePage(2);
    }

    private page = observer((product: any) => {

        return <Page header="任务明细" >
            <div className="px-2 py-2 bg-white mb-3">{product.description}</div>

            <div className="modal-content">
                <button type="button" className="btn btn-info center-block" onClick={this.onCompletionTask} >完结</button>
            </div>
        </Page >
    })
}