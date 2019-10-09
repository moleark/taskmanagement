import * as React from 'react';
import { CStart } from './CStart';
import { VPage, Page, FA } from 'tonva';

export class VOK extends VPage<CStart> {
    async open(position: any) {

        this.openPage(this.page, position);
    }

    private page = (position: any) => {
        return <Page header="注册成功" headerClassName='bg-primary py-1 px-3'>
            <div className="p-5 text-center">
                <p className="text-primary mb-5">欢迎加入销售助手体系。 &nbsp; <FA name="hand-peace-o" size="2x" className="text-danger" /></p>
                <button className="btn btn-outline-primary w-6c" onClick={this.controller.startApp}>开始体验</button>
            </div>
        </Page>
    }
}
