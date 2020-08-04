import * as React from 'react';
import classNames from 'classnames';
import { VPage, Page } from 'tonva';
import { CSalesTask } from '../CSalesTask';
import { List, LMR, EasyDate } from 'tonva';
import { observer } from 'mobx-react';
import { tv } from 'tonva';
import { setting } from 'appConfig';
export class VMain extends VPage<CSalesTask> {

    async open(param: any) {
        this.openPage(this.page);
    }

    render(member: any): JSX.Element {
        return <this.page />;
    }

    private onScrollBottom = async () => {
    }

    //选择任务
    private onSalesTaskClick = async (param: any) => {
        let task = {
            id: param.id,
            type: param.type,
            biz: param.biz,
            description: param.description,
            remindDate: null as any,
            deadline: param.deadline,
            customer: param.customer
        }
        this.controller.showTaskDetailEdit(task);
    }

    private renderSalesTask = (salesTask: any, index: number) => {
        let { bizName, customer, priorty, description } = salesTask;
        let cnFlag = classNames({
            'my-1 mr-2': true,
            'text-danger': priorty > 0,
            'text-info': !(priorty > 0)
        })

        let left = <div className={cnFlag}>{this.controller.getTaskIcon(bizName)}</div>;
        let right = <div className="text-right"> {tv(customer, (v) => <small>{tv(v.unit)}</small>)} </div>
        return <LMR className="pl-2 pr-3 py-1" left={left}>
            <LMR className="" right={right}>
                <div className=" my-1 mr-3 font-weight-bold">{tv(customer)}</div>
            </LMR>
            <LMR className="" >
                <div className=" my-1 mr-3 small" style={subStyle}>{description}</div>
            </LMR>
        </LMR >
    }

    private page = observer(() => {
        let { tasks, showPost } = this.controller;
        if (tasks === undefined) return null;
        let none = <div className="py-2 text-warning text-center" style={{ background: 'white' }}> 您还未创建任务呢</div>;
        let right = <div className="cursor-pointer py-1" onClick={async () => this.controller.showSelectTaskType(undefined)} >
            <span className="iconfont mx-3 icon-tianjia" style={{ fontSize: "20px", color: "#ffffff" }}></span>
        </div>;

        let item = { render: this.renderSalesTask, onClick: this.onSalesTaskClick };
        let { tasksNow, dateTasksList } = tasks;

        return <Page header="任务" onScrollBottom={this.onScrollBottom} right={right} headerClassName={setting.pageHeaderCss} >
            {(setting.sales.isInner) ?
                <LMR
                    className="bg-white px-2 py-1"
                    left={<i className="iconfont icon-neirong " style={{ fontSize: "30px", color: "#efb336" }}></i>}
                    right={<i className="pt-2  px-2 iconfont icon-fangxiang1"></i>}
                    onClick={showPost}
                >
                    <div className="mx-3 pt-2 font-weight-bold">帖文</div>
                </LMR>
                : null
            }
            {tasksNow.length === 0 && dateTasksList.length === 0 && none}
            {tasksNow.length > 0 && <List before={''} none={none} items={tasksNow} item={item} />}
            {
                dateTasksList.map((v, index: number) => {
                    let { date, list } = v;
                    if (list.length === 0) return null;
                    return <React.Fragment key={index}>
                        <div className="small text-muted pt-3 px-3 pb-2 text-center"><EasyDate date={date} /></div>
                        <List before={''} none={none} items={list} item={item} />
                    </React.Fragment>;
                })
            }
        </Page >
    });
    private refIframe = (ifrm: HTMLIFrameElement) => {
        if (!ifrm) return;
        let article = ifrm.parentElement.parentElement;
        let header = (article.querySelector('section.tv-page-header') as HTMLElement);
        ifrm.style.height = (window.innerHeight - header.clientHeight) + 'px';
        article.parentElement.style.overflowY = 'hidden';
    }
}

export const subStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}
