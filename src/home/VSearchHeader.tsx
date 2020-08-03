import * as React from 'react';
import { View } from 'tonva';
import { CHome } from './CHome';
import { SearchBox } from 'tonva';

export class VSearchHeader extends View<CHome> {
    private onSearch = async (key: string) => {
        this.controller.searchByKey(key)
    }

    render(key: any) {

        return <SearchBox className="w-100 pr-2 small" size='md'
            onSearch={(key: string) => this.onSearch(key)}
            placeholder="搜索品名、编号、CAS、MDL等" />
    }
}