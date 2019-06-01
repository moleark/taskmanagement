import * as React from 'react';
import { VPage, Page, List, LMR } from 'tonva';
import { CMe } from './CMe';

export class VPosition extends VPage<CMe> {

    private position: any;
    async open(position: any) {
        this.position = position;
        this.openPage(this.page);
    }

    private page = () => {
        let { inviteCode } = this.controller;
        return <Page header='邀请码' headerClassName='bg-primary py-1' >
            <div className="w-100 mt-5 px-5 ">{inviteCode}</div>
        </Page>
    }
}
