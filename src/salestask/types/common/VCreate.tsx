import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem, UiCheckItem } from 'tonva-tools';
import { observer } from 'mobx-react';
import { UiSchema, UiInputItem } from 'tonva-tools/ui/form/uiSchema';
import { tv } from 'tonva-react-uq';
import { CTaskType } from '../CTaskType';
import { Task } from '../../model';
import { CTaskCommonType } from '.';

export class VCreate extends VPage<CTaskCommonType> {

    private salestask: Task
    private form: Form;

    async open(task: Task) {
        this.salestask = task;
        this.openPage(this.page, task);
    }

    private onAddSalesTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.cSalesTask.addTask(context.form.data, this.salestask);
        this.closePage(1);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    render(param: any) {
        let { schema, uiSchema } = this.controller.taskCommonType;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onAddSalesTask}>保存</button>;
        return <Page header={this.controller.caption} footer={footer} >
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
