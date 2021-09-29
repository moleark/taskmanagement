import * as React from "react";
import classNames from "classnames";
import { VPage, Page, LMR, List, tv } from 'tonva-react';
import { observer } from "mobx-react";
import { CSalesTask } from "../CSalesTask";
import { setting } from "appConfig";
/* eslint-disable */
export class VEmployeeHistory extends VPage<CSalesTask> {
    async open() {
        this.openPage(this.page);
    }

    private renderSalesTask = (salesTask: any, index: number) => {
        let { bizName, customer, priorty, description } = salesTask;
        let cnFlag = classNames({
            "my-1 mr-2": true,
            "text-danger": priorty > 0,
            "text-info": !(priorty > 0)
        });

        let left = (
            <div className={cnFlag}>{this.controller.getTaskIcon(bizName)}</div>
        );
        let right = (
            <div className="text-right">
                {" "}
                {tv(customer, v => (<small>{tv(v.unit, u => u.name)}</small>))}
                {" "}
            </div>
        );
        return (
            <LMR className="pl-2 pr-3 py-1" left={left}>
                <LMR className="" right={right}>
                    <div className=" my-1 mr-3 font-weight-bold">
                        {tv(customer, v => v.name)}
                    </div>
                </LMR>
                <LMR className="">
                    <div className=" my-1 mr-3 small" style={subStyle}>
                        {description}
                    </div>
                </LMR>
            </LMR>
        );
    };

    //选择任务
    private onTaskClick = async (param: any) => {
        this.controller.showDetailFromId(param);
    };

    private page = observer(() => {
        let none = (
            <div className="m-3 text-muted small">【暂无历史任务！】</div>
        );
        return (
            <Page header="历史任务" headerClassName={setting.pageHeaderCss}>
                <List
                    before={""}
                    none={none}
                    items={this.controller.pageEmployeeTaskHistory}
                    item={{
                        render: this.renderSalesTask,
                        onClick: this.onTaskClick
                    }}
                />
            </Page>
        );
    });
}

export const subStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
};
