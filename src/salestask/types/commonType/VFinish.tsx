import * as React from "react";
import { VPage, Form, Context, List, LMR } from "tonva";
import { observer } from "mobx-react";
import { Task } from "../../model";
import { CCommonType } from "./CCommonType";

export class VFinish extends VPage<CCommonType> {
    private task: Task;
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
    };

    private onFormButtonClick = async (name: string, context: Context) => {
        let { completSchema } = this.controller.taskCommonType;
        let fieldValues = completSchema.map((v: any, index: number) => {
            let { name } = v;
            return {
                fieldName: name,
                value: context.form.data[name],
                note: context.form.data[name]
            };
        });
        this.task.fields = fieldValues;
        await this.controller.cSalesTask.finishTask(this.task);
    };

    private onCreateProduct = async () => {
        await this.controller.cSalesTask.showPorductSelect(this.task);
    };

    private onCreateProject = async () => {
        await this.controller.cSalesTask.showCreateProject(this.task);
    };

    private onCreateProjectPack = async () => {
        await this.controller.cSalesTask.showPorductPackSelect(this.task);
    };

    private renderOrder = (param: any, index: number) => {
        let { ordertype, orderid } = param;
        return <LMR className="py-2 px-2" left="订单号" right={orderid}></LMR>
    }

    render(task: Task) {
        this.task = task;
        let { completSchema, completuiSchema } = this.controller.taskCommonType;
        return (
            <div className="mx-3">
                <List className="my-2" before={''} none="" items={this.controller.cSalesTask.orderids} item={{ render: this.renderOrder, onClick: null }} />
                <Form
                    ref={v => (this.form = v)}
                    schema={completSchema}
                    uiSchema={completuiSchema}
                    onButtonClick={this.onFormButtonClick}
                    requiredFlag={false}
                />
                <button
                    type="button"
                    className="btn btn-primary w-100  my-3"
                    onClick={this.onCompletionTask}
                >
                    提交
                </button>
            </div>
        );
    }
}
