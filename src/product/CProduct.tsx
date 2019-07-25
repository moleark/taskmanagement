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
import { LoaderProductChemicalWithPrices } from './item';
import { ProductImage } from 'tools/productImage';
import { VProductPackSelect } from './VProductPackSelect';

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
        this.pageStart = item === undefined ? 0 : item.seq;
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
    private getPromotionPackQuery: Query;

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

        let { currentSalesRegion, currentLanguage } = this.cApp;
        this.pageProduct = null;
        this.openVPage(VProductSelect, param);
        //this.getPromotionPackQuery.obj({ product: productId, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage })
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
        let loader = new LoaderProductChemicalWithPrices(this.cApp);
        let product = await loader.load(param.id);
        //let product = await this.productTuid.load(param.productid)
        this.openVPage(VProductDetail, product)
    }

    //显示选择产品
    showProductSelect = async (product: any): Promise<any> => {
        this.openVPage(VProductSelect, product)
    }

    //显示选择包装
    showProductPackSelect = async (product: any): Promise<any> => {
        this.openVPage(VProductPackSelect, product)
    }


    render = observer(() => {
        this.pageProduct = null;
        return this.renderView(VProductList);
    })

    tab = () => {
        return <this.render />;
    }
}


export function renderBrand(brand: any) {
    return productPropItem('品牌', brand.name);
}

export function productPropItem(caption: string, value: any) {
    if (value === null || value === undefined) return null;
    return <>
        <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">{caption}</div>
        <div className="col-8 col-sm-4 col-lg-8">{value}</div>
    </>;
}

export function renderProduct(product: any, index: number) {
    let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
    return <div className="d-block mb-4 px-2">
        <div className="py-2">
            <div><strong>{description}</strong></div>
            <div>{descriptionC}</div>
        </div>
        <div className="row">
            <div className="col-3">
                <ProductImage chemicalId={imageUrl} className="w-100" />
            </div>
            <div className="col-9">
                <div className="row">
                    {productPropItem('CAS', CAS)}
                    {productPropItem('纯度', purity)}
                    {productPropItem('分子式', molecularFomula)}
                    {productPropItem('分子量', molecularWeight)}
                    {productPropItem('产品编号', origin)}
                    {tv(brand, renderBrand)}
                </div>
            </div>
        </div>
    </div>

}
