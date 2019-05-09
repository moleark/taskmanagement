import * as React from 'react';
import { VPage, Page, PageItems, Schema, Form, Context, UiIdItem } from 'tonva-tools';
import { observer } from 'mobx-react';
import { CSalesTask } from './CSalesTask';
import { UiSchema, UiInputItem } from 'tonva-tools/ui/form/uiSchema';
import { tv } from 'tonva-react-uq';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'customer', type: 'id', required: true },
    { name: 'description', type: 'string', required: true },
    { name: 'priorty', type: 'date', required: false },
    { name: 'deadline', type: 'string', required: true },
];

export class VSalesTaskAdd extends VPage<CSalesTask> {
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            description: { widget: 'text', label: '任务内容', placeholder: '任务内容' } as UiInputItem,
            customer: {
                widget: 'id', label: '客户', placeholder: '客户',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickAddress(context, name, value),
                Templet: (item: any) => {
                    let { obj } = item;
                    if (!obj) return <small className="text-muted">请选择地区</small>;
                    let { country, province, city, county } = obj;
                    //, (v) => <>{v.chineseName}</>
                    return <>
                        {tv(country, v => <>{v.chineseName}</>)}
                        {tv(province, (v) => <>{v.chineseName}</>)}
                        {tv(city, (v) => <>{v.chineseName}</>)}
                        {tv(county, (v) => <>{v.chineseName}</>)}
                    </>;
                }
            } as UiIdItem,
            priorty: { widget: 'text', label: '重要性', placeholder: '重要性' } as UiInputItem,
            deadline: { widget: 'text', label: '要求完成时间', placeholder: '要求完成时间' } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }


    async open(salestask: any) {

        this.openPage(this.page, salestask);
    }

    private onAddSalesTask = async (model: any) => {

        await this.controller.addSalesTask(model);
        this.closePage(2);
    }

    private page = observer((product: any) => {

        return <Page header="添加任务" >

            <div className="App-container container text-left">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    fieldLabelSize={3} />
            </div>
        </Page >
    })
}