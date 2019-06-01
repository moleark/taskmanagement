import * as React from 'react';
import { CStart } from './CStart';
import { VPage, Page } from 'tonva';

export class VPositionOK extends VPage<CStart> {
    async open(position: any) {

        this.openPage(this.page, position);
    }

    private page = (position: any) => {
        return <Page header='ok'>
            <p>欢迎加入！</p>
            <button className="btn btn-primary" onClick={this.controller.startApp}>start</button>
        </Page>
    }
}
