import * as React from 'react';
import { VPage, Page, PageItems, Form, UiSchema, UiInputItem, Schema, Context, StringSchema } from 'tonva';
import { observer } from 'mobx-react';
import { LMR, List, EasyDate, SearchBox, StringProp, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { CStart } from './CStart';


const schema: Schema = [
    { name: 'invitacode', type: 'string', required: true, maxLength: 8 } as StringSchema,
    { name: 'submit', type: 'submit' },
];

export class VStart extends VPage<CStart> {

    private form: Form;
    private uiSchema: UiSchema = {
        items: {
            invitacode: { widget: 'text', label: '邀请码', placeholder: '请输入邀请码' } as UiInputItem,
            submit: { widget: 'button', label: '提交', className: 'btn btn-primary w-8c' },
        }
    }

    async open(position: any) {

        this.openPage(this.page, position);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private onCreatePosition = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.createPosition(context.form.data);
        this.closePage(1);
    }

    private onEnter = async (name: string, context: Context): Promise<any> => {
        if (name === 'invitacode') {
            await this.onCreatePosition();
        }
    }

    private page = observer((position: any) => {
        //let footer = <button type="button" className="btn btn-primary w-100" onClick={this.onCreatePosition}>保存</button>;
        return <Page header='轻代理' headerClassName='bg-primary py-1'>
            <Form ref={v => this.form = v} className="m-3"
                schema={schema}
                uiSchema={this.uiSchema}
                onButtonClick={this.onFormButtonClick}
                requiredFlag={false}
                onEnter={this.onEnter}
            />
        </Page>
    })
}
