import * as React from 'react';
import { VPage, Page, ItemSchema, ImageSchema, StringSchema, UiSchema, UiTextItem, UiImageItem, Edit, nav, userApi } from 'tonva';
import { CMe } from './CMe';
import { observable } from 'mobx';

export class VPeerDetail extends VPage<CMe> {

    private schema: ItemSchema[] = [
        { name: 'nick', type: 'string' } as StringSchema,
    ];

    private uiSchema: UiSchema = {
        items: {
            nick: { widget: 'text', label: '昵称', placeholder: '好的别名更方便记忆' } as UiTextItem,
        }
    }

    @observable private data: any;
    async open(position: any) {
        let { nick, icon } = nav.user;
        this.data = {
            nick: nick,
            icon: icon,
        };
        this.openPage(this.page);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        await userApi.userSetProp(name, newValue);
        this.data[name] = newValue;
        nav.user[name] = newValue;
        nav.saveLocalUser();
    }

    private page = () => {
        return <Page header='邀请码' headerClassName='bg-primary py-1' >
            <Edit schema={this.schema} uiSchema={this.uiSchema}
                data={this.data}
                onItemChanged={this.onItemChanged}
            />
        </Page>
    }
}
