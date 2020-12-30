import * as React from 'react';
import { View } from 'tonva';
import { CHome } from './CHome';
import { SearchBox } from 'tonva';

export class VSearchHeader extends View<CHome> {
    private onSearch = async (param: any) => {
        let { key, fromSearch } = param;
        if (key) {
            let { cProduct } = this.controller.cApp;
            cProduct.searchByKey({ key, fromSearch })
        }
    }
    render(fromSearch: any) {

        return <SearchBox className="w-100 px-2 small ml-2" size='sm'
            onSearch={(key: string) => this.onSearch({ key, fromSearch })}
            placeholder="搜索品名、编号、CAS、MDL等" />
    }
}