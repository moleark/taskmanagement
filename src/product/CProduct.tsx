import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, Tuid, Action } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VProductList } from './VProductList';
import { VProductSelect } from './VProductSelect';

//页面类
class PageProduct extends PageItems<any> {

    private searchProductQuery: Query;

    constructor(searchProductQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchProductQuery = searchProductQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

/**
 *
 */
export class CProduct extends Controller {

    cApp: CSalesTaskApp;
    @observable pageProduct: PageProduct;
    private querySearchProduct: Query;
    @observable customerlist: any;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqProduct } = this.cApp;
        this.querySearchProduct = cUqProduct.query("searchProduct");
    }

    //初始化
    protected async internalStart(param: any) {
        this.openVPage(VProductSelect, param);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageProduct = new PageProduct(this.querySearchProduct);
        this.pageProduct.first({ key: key, salesRegion: 1 });
    }

    //选择客户--给调用页面返回客户id
    returnProduct = async (product: any): Promise<any> => {
        this.returnCall(product);
    }

    render = observer(() => {
        this.pageProduct = null;
        return this.renderView(VProductList);
    })

    tab = () => {
        return <this.render />;
    }

}