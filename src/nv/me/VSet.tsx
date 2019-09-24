import * as React from 'react';
import { VPage, Page, ItemSchema, ImageSchema, StringSchema, UiSchema, UiTextItem, UiImageItem, Edit, nav, userApi, LMR, FA, Prop, IconText, PropGrid } from 'tonva';
import { CMe } from './CMe';
import { observable } from 'mobx';
import { consts } from '../consts';
import { appConfig } from 'nv';

export class VSet extends VPage<CMe> {

    async open(position: any) {
        this.openPage(this.page);
    }

    private logout = () => {
        nav.showLogout();
    }

    private page = () => {
        let rows: Prop[] = [
            {
                type: 'component',
                component: <div className="w-100 d-flex justify-content-between">
                    <IconText iconClass="text-info mr-2" icon="smile-o" text="关于本APP" />
                    <div className="py-2 small">V{appConfig.version}</div>
                </div>,
            },
            ''
        ];

        let footer = <button type="button" className="btn btn-outline-danger flex-grow-1 mx-3 my-1 w-100" onClick={this.logout} ><FA name="sign-out" size="lg" /> 退出</button>;
        return <Page header='设置' headerClassName={consts.headerClass} footer={footer}>
            <PropGrid rows={rows} values={{}} />
        </Page >
    }
}
