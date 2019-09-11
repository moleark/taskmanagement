import * as React from 'react';
import { VPage, Page, ItemSchema, ImageSchema, StringSchema, UiSchema, UiTextItem, UiImageItem, Edit, nav, userApi, LMR, FA } from 'tonva';
import { CMe } from './CMe';
import { observable } from 'mobx';
import { consts } from '../consts';

export class VSet extends VPage<CMe> {

    async open(position: any) {
        this.openPage(this.page);
    }

    private logout = () => {
        nav.showLogout();
    }

    private page = () => {
        let footer = <button type="button" className="btn btn-danger flex-grow-1 mx-3 my-1 w-100" onClick={this.logout} ><FA name="sign-out" size="lg" /> 退出</button>;
        return <Page header='设置' headerClassName={consts.headerClass} footer={footer}>
        </Page >
    }
}
