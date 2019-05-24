import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem, UiCheckItem, FA } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../../model';
import { CCommonType } from './CCommonType';

export class VCreate extends VPage<CCommonType> {

    private task: Task;
    private form: Form;

    async open(task: Task) {
        this.task = task;
        this.openPage(this.page, task);
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.cSalesTask.createTask(context.form.data, this.task);
        this.closePage(5);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    render(param: any) {
        let { schema, uiSchema } = this.controller.taskCommonType;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onAddSalesTask}>保存</button>;
        //let header = <div>{this.task.type.description}&nbsp;<FA name="chevron-right" className="wx-3" />&nbsp;{this.task.biz.description}</div>;

        return <Page header={this.controller.caption} footer={footer} headerClassName='bg-primary' >
            <div className="App-container container text-left">
                {this.controller.renderCreateTop(param)}
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={uiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
            </div>
        </Page >
    }
}
