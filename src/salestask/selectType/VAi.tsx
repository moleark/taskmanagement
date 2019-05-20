import * as React from 'react';
import { VPage, Page, PageItems } from 'tonva';
import { observer } from 'mobx-react';
import { CSelectType } from './CSelectType';
import { LMR, List, FA } from 'tonva';
import { observable } from 'mobx';

export class VAi extends VPage<CSelectType> {
    @observable private finished: boolean;
    async open() {
        this.finished = false;
        this.openPage(this.page);
        setTimeout(() => {
            this.finished = true;
        }, 3000);
    }

    private page = observer(() => {
        return <Page header="AI">
            <div className="p-3">
                {
                    this.finished === false ?
                        <>
                            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                            <span className="sr-only">Loading...</span>
                            好阿，我来算算，稍等......
                    </>
                        :
                        <>
                            <i className="fa fa-frown-o fa-2x fa-fw text-warning"></i> 没有找到适合你的机会！
                </>
                }
            </div>
        </Page>;
    })
}