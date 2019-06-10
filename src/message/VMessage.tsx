import * as React from 'react';
import { VPage, Page, List, LMR, tv, FA } from 'tonva';
import { CMessage } from './CMessage';

export class VMessage extends VPage<CMessage> {

    private message: any;
    async open(message: any) {
        this.message = message;
        this.openPage(this.page);
    }

    private renderItem = (team: any, index: number) => {

        return <LMR className="px-3 py-2 ">

        </LMR>
    }

    private page = () => {
        let none = <div className="my-3 mx-2 text-muted">无消息</div>;
        return <Page header='消息盒子' headerClassName='bg-primary py-1' >
            <List before={''} none={none} items={this.message} item={{ render: this.renderItem }} />
        </Page>
    }
}
