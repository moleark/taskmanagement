import * as React from 'react';
import { observable } from 'mobx';
// import { observer } from 'mobx-react';
import { tv, BoxId, QueryPager, PageItems, Tuid } from 'tonva';
import { CUqBase } from '../CBase';
import { VHome } from './VHome';
import { VSearchHeader } from './VSearchHeader';

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