import * as React from 'react';
import { observable } from 'mobx';
// import { observer } from 'mobx-react';
import { tv, BoxId, QueryPager, PageItems, Tuid } from 'tonva';
import { CUqBase } from '../CBase';
import { ProductImage } from '../tools/productImage';
import { VProductSelect } from '../product/VProductSelect';
import { VProductDetail } from '../product/VProductDetail';
import { LoaderProductChemicalWithPrices } from '../product/item';
import classNames from 'classnames';
import { VProductDelivery } from '../product/VProductDelivery';
import { VProductBox } from '../product/VProductBox';
import { VHome } from './VHome';
import { VSearchHeader } from './VSearchHeader';
import { VProductPackSelect } from '../product/VProductPackSelect';

import { VProductPromotion } from '../product/VProductPromotion';
import { VProductSearchPromotion } from '../product/VProductSearchPromotion';
import { VProductList } from '../product/VProductList';

/**
 *Query SearchPromotion( keyWord char(20), salesRegion ID SalesRegion, language ID Language )
  Query SearchPromotion( salesRegion ID SalesRegion, language ID Language )

 */
class HomeSections extends PageItems<any> {

    private sectionTuid: Tuid;

    constructor(sectionTuid: Tuid) {
        super();
        this.firstSize = this.pageSize = 13;
        this.sectionTuid = sectionTuid;
    }

    protected async loadResults(param: any, pageStart: any, pageSize: number): Promise<{ [name: string]: any[] }> {
        let ret = await this.sectionTuid.search("", pageStart, pageSize);
        return { $page: ret };
    }
    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.sectionTuid.search("", pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}
export class CHome extends CUqBase {
    //cApp: CApp;
    @observable pageProduct: QueryPager<any>;
    @observable customerlist: any;
    // @observable bannercaption: any;
    // @observable bannerdescription: any;
    @observable promotionPager: QueryPager<any>;
    @observable searcdpPromotionPager: QueryPager<any>;

    @observable inventoryAllocationContainer: { [packId: number]: any[] } = {};
    @observable futureDeliveryTimeDescriptionContainer: { [productId: number]: string } = {};
    @observable chemicalInfoContainer: { [productId: number]: any } = {};


    //初始化

    homeSections: HomeSections;
    sectionTuid: Tuid;

    banners: any[] = [];

    async internalStart(param: any) {
        await this.openVPage(VHome);
    }

    renderSearchHeader = (size?: string) => {
        return this.renderView(VSearchHeader, size);
    }


    getSlideShow = async () => {
        let list = await this.uqs.webBuilder.GetSlideShow.table({});
        // this.bannercaption = list[0].caption;
        // this.bannerdescription = list[0].description
        list.forEach(v => {
            this.banners.push({ path: v.path, src: v.src, caption: v.caption, description: v.description });
        })
    }

    tab = () => this.renderView(VHome);

    onScrollBottom = async () => {
        await this.pageProduct.more();
    }


    //查询客户--通过名称
    searchByKey = async (key: string) => {
        this.pageProduct = new QueryPager(this.uqs.product.SearchProduct, 15, 30);
        await this.pageProduct.first({ keyWord: key, salesRegion: 1 });
        return await this.openVPage(VProductList, key);
    }

    //选择客户--给调用页面返回客户id
    returnProduct = async (product: any): Promise<any> => {
        this.returnCall(product);
    }

    //显示产品明细
    showProductDetail = async (param: any): Promise<any> => {
        let loader = new LoaderProductChemicalWithPrices(this.cApp);
        let product = await loader.load(param.id);

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

    //显示货期
    renderDeliveryTime = (pack: BoxId) => {
        return this.renderView(VProductDelivery, pack);
    }
    //货期库存信息
    getInventoryAllocation = async (productId: number, packId: number, salesRegionId: number) => {
        if (this.inventoryAllocationContainer[packId] === undefined)
            this.inventoryAllocationContainer[packId] = await this.uqs.warehouse.GetInventoryAllocation.table({ product: productId, pack: packId, salesRegion: this.cApp.currentSalesRegion });
    }
    //交货期说明
    getFutureDeliveryTimeDescription = async (productId: number, salesRegionId: number) => {
        if (this.futureDeliveryTimeDescriptionContainer[productId] === undefined) {
            let futureDeliveryTime = await this.uqs.product.GetFutureDeliveryTime.table({ product: productId, salesRegion: salesRegionId });
            if (futureDeliveryTime.length > 0) {
                let { minValue, maxValue, unit } = futureDeliveryTime[0];
                this.futureDeliveryTimeDescriptionContainer[productId] = minValue + (maxValue > minValue ? '~' + maxValue : '') + ' ' + unit;
            } else {
                this.futureDeliveryTimeDescriptionContainer[productId] = null;
            }
        }
    }

    //显示产品框

    showProductBox = () => {
        this.openVPage(VProductBox);
    }

    // 查询特惠产品
    searchPromotion = async (key: any, promotionId: any) => {
        let { currentSalesRegion } = this.cApp;
        this.promotionPager = new QueryPager(this.uqs.promotion.SearchPromotion, 15, 30);
        await this.promotionPager.first({ keyWord: key, promotion: promotionId, salesRegion: currentSalesRegion })
    }

    searchpromotionPager = async (key: string, promotionId: any) => {
        this.searcdpPromotionPager = new QueryPager(this.uqs.promotion.SearchPromotion, 15, 30);
        await this.searcdpPromotionPager.first({ keyWord: key, promotion: promotionId, salesRegion: 1 })
        return await this.vCall(VProductSearchPromotion, key);
    }

    showPromotion = async (promotion: any) => {
        await this.searchPromotion("", promotion);
        await this.openVPage(VProductPromotion, promotion)
    }
}


export function renderBrand(brand: any) {
    return productPropItem('品牌', brand.name);
}

export function productPropItem(caption: string, value: any, captionClass?: string) {
    if (value === null || value === undefined || value === '0') return null;
    let capClass = captionClass ? classNames(captionClass) : classNames("text-muted");
    let valClass = captionClass ? classNames(captionClass) : "";
    return <>
        <div className={classNames("col-6 col-sm-2 pr-0 small", capClass)}> {caption}</div>
        <div className={classNames("col-6 col-sm-4", valClass)}>{value}</div>
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
