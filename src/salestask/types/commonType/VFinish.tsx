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
        let { showTaskProductDetail, showTaskProjectDetail, showPorductPackSelect } = this.controller.cSalesTask;
        let onShowProduct = async () => await showTaskProductDetail(this.task);
        let onShowProject = async () => await showTaskProjectDetail(this.task);

        let cssLMR = "bg-white row my-1 py-2";
        return <div className="mx-3">
            <LMR className={cssLMR} right={<div onClick={this.onCreateProduct} className="mr-3"><FA name="plus" /></div>} >
                <div className="w-100 ml-3" onClick={onShowProduct} >产品列表 <span className="fa-stack">4</span></div>
            </LMR>
            <LMR className={cssLMR} right={<div onClick={this.onCreateProjectPack} className="mr-3"><FA name="plus" /></div>} >
                <div className="w-100 ml-3" onClick={onShowProject} >包装列表 <span className="fa-stack">4</span></div>
            </LMR>
            <LMR className={cssLMR} right={<div onClick={this.onCreateProject} className="mr-3"><FA name="plus" /></div>} >
                <div className="w-100 ml-3" onClick={onShowProject} >项目列表 <span className="fa-stack">4</span></div>
            </LMR>
            <Form ref={v => this.form = v}
                schema={completSchema}
                uiSchema={completuiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
            />
            <button type="button" className="btn btn-primary w-100" onClick={this.onCompletionTask} >提交</button>
        </div >
    }
}
