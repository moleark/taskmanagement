import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem, UiCheckItem } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../../model';
import { CCommonType } from './CCommonType';

export class VComplet extends VPage<CCommonType> {

    private salestask: Task
    private form: Form;

    async open(task: Task) {
        this.openPage(this.page, task);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    private onCompletionTask = async (model: any) => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        let { result, resulttype } = context.form.data;
        let { completSchema, completuiSchema } = this.controller.taskCommonType;

        let fieldValues = completSchema.map((v, index) => {
            let { name } = v;
            return {
                fieldName: name,
                value: context.form.data[name]
            };
        })

        await this.controller.cSalesTask.completionTask(this.salestask, fieldValues);
        this.closePage(2);
    }

    render(task: Task) {
        this.salestask = task;
        let { completSchema, completuiSchema } = this.controller.taskCommonType;
        return <div>
            <Form ref={v => this.form = v} className="my-3"
                schema={completSchema}
                uiSchema={completuiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
            />
            <button type="button" className="btn btn-primary w-100" onClick={this.onCompletionTask} >完结</button>
        </div>

    }
}
