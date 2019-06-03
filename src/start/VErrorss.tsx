import * as React from 'react';
import { CStart } from './CStart';
import { VPage, Page, FA } from 'tonva';

export class VErrorss extends VPage<CStart> {
    async open(position: any) {
        await this.openPage(this.page, position);
    }

    private page = (position: any) => {
        return <Page header="错误">
            <div>asdf</div>
        </Page>
    }
}
