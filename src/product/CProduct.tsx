import * as React from 'react';
import * as _ from 'lodash';
import { Query, tv, Tuid, Action } from 'tonva';
import { PageItems, Controller, nav, Page, Image } from 'tonva';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VProductSelect } from './VProductSelect';
import { VProductList } from './VProductList';
import { VProductDetail } from './VProductDetail';

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
    private productTuid: Tuid;
    private querySearchProduct: Query;
    @observable customerlist: any;

    //构造函数
    constructor(cApp: CSalesTaskApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqProduct } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.querySearchProduct = cUqProduct.query("searchProduct");
    }

    //初始化
    protected async internalStart(param: any) {
        this.pageProduct = null;
        this.openVPage(VProductSelect, param);
    }

    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageProduct = new PageProduct(this.querySearchProduct);
        await this.pageProduct.first({ key: key, salesRegion: 1 });
    }

    //选择客户--给调用页面返回客户id
    returnProduct = async (product: any): Promise<any> => {
        this.returnCall(product);
    }

    //显示产品明细
    showProductDetail = async (param: any): Promise<any> => {
        let procust = await this.productTuid.load(param.id);
        this.openVPage(VProductDetail, procust)
    }

    render = observer(() => {
        this.pageProduct = null;
        return this.renderView(VProductList);
    })

    tab = () => {
        return <this.render />;
    }

}