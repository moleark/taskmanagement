import * as React from 'react';
import { View } from 'tonva';
import { CHome } from './CHome';
import { SearchBox } from 'tonva';

export class VSearchHeader extends View<CHome> {
    private onSearch = async (key: string) => {
        if (key) {
            let { cProduct } = this.controller.cApp;
            cProduct.searchByKey(key)
        }
    }
    render(key: any) {

        return <SearchBox className="w-100 px-2 small ml-2" size='sm'
            onSearch={(key: string) => this.onSearch(key)}
            placeholder="搜索品名、编号、CAS、MDL等" />
    }
}