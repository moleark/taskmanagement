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
            <div>
                <p>解释说明</p>
            </div>
        </Page >
    });

}
