import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CBalance } from './CBalance';
import { observer } from 'mobx-react';

export class VExplanation extends VPage<CBalance> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {

        return <Page>
            <div className="pl-2 pt-3 bg-white small">
                <div className="small text-muted">
                    <p>累计收益</p>
                    <p>1</p>
                </div>
                <div>
                    <p>待到款</p>
                    <p>1</p>
                </div>
                <div>
                    <p>余额</p>
                    <p>1</p>
                </div>
            </div>
        </Page >
    });

}
