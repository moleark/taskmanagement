import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem, UiCheckItem, LMR, FA } from 'tonva';
import { observer } from 'mobx-react';
import { Task } from '../../model';
import { CCommonType } from './CCommonType';
import classNames from 'classnames';

export class VFinish extends VPage<CCommonType> {

    private task: Task
    private form: Form;

    async open(task: Task) {
        this.task = task;
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
        let { completSchema } = this.controller.taskCommonType;
        let fieldValues = completSchema.map((v, index) => {
            let { name } = v;
            return {
                fieldName: name,
                value: context.form.data[name]
            };
        })
        this.task.fields = fieldValues;
        await this.controller.cSalesTask.finishTask(this.task);
        this.closePage(2);
    }

    private onCreateProduct = async () => {
        await this.controller.cSalesTask.showPorductSelect(this.task);
    }

    private onCreateProject = async () => {
        await this.controller.cSalesTask.showCreateProject(this.task);
    }

    private onCreateProjectPack = async () => {
        await this.controller.cSalesTask.showPorductPackSelect(this.task);
    }

    render(task: Task) {
        this.task = task;
        let { completSchema, completuiSchema } = this.controller.taskCommonType;
        let { showTaskProductDetail, showTaskProjectDetail, showTaskProjectPackDetail } = this.controller.cSalesTask;
        let onShowProduct = async () => await showTaskProductDetail(this.task);
        let onShowProject = async () => await showTaskProjectDetail(this.task);
        let onshowTaskProjectPackDetail = async () => await showTaskProjectPackDetail(this.task);

        let cssLMR = "bg-white row my-1 py-2";
        return <div className="mx-3">
            <Form ref={v => this.form = v}
                schema={completSchema}
                uiSchema={completuiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
            />
            <button type="button" className="btn btn-primary w-100  my-3" onClick={this.onCompletionTask} >提交</button>
        </div >
    }
}
