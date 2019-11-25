import * as React from 'react';
import { VPage, Page, ItemSchema, ImageSchema, StringSchema, UiSchema, UiTextItem, UiImageItem, Edit } from 'tonva';
import { CMe } from './CMe';
import { setting } from '../appConfig';
import { observable } from 'mobx';


export class VAccount extends VPage<CMe> {

    private schema: ItemSchema[] = [
        { name: 'telephone', type: 'string' } as StringSchema,
        { name: 'identityname', type: 'string' } as StringSchema,
        { name: 'identitycard', type: 'string' } as StringSchema,
        { name: 'subbranchbank', type: 'string' } as StringSchema,
        { name: 'bankaccountnumber', type: 'string' } as StringSchema,
        { name: 'identityicon', type: 'image' } as ImageSchema,
    ];
    private uiSchema: UiSchema = {
        items: {
            identityname: { widget: 'text', label: '姓名', placeholder: '' } as UiTextItem,
            identityicon: { widget: 'image', label: '证件照' } as UiImageItem,
            subbranchbank: { widget: 'text', label: '开户行', placeholder: '' } as UiTextItem,
            bankaccountnumber: { widget: 'text', label: '银行账号', placeholder: '' } as UiTextItem,
            telephone: { widget: 'text', label: '手机', placeholder: '' } as UiTextItem,
            identitycard: { widget: 'text', label: '身份证号', placeholder: '' } as UiTextItem,
        }
    }



    @observable private data: any;
    async open(param: any) {
        this.data = param;
        this.openPage(this.page);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.data[name] = newValue;
        await this.controller.saveAccount(this.data);
    }

    private page = () => {

        return <Page header='账户' headerClassName={setting.pageHeaderCss} >
            <Edit schema={this.schema} uiSchema={this.uiSchema}
                data={this.data}
                onItemChanged={this.onItemChanged}
            />
        </Page >
    }
}