import { observable } from 'mobx';
import { QueryPager, PageItems, Tuid } from 'tonva-react';
import { CUqBase } from 'uq-app';
import { VHome } from './VHome';
import { VSearchHeader } from './VSearchHeader';


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

    //初始化
    homeSections: HomeSections;
    sectionTuid: Tuid;

    banners: any[] = [];

    async internalStart(param: any) {
        await this.openVPage(VHome);
    }

    renderSearchHeader = (fromSearch?: string) => {
        return this.renderView(VSearchHeader, fromSearch);
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

    //选择客户--给调用页面返回客户id
    returnProduct = async (product: any): Promise<any> => {
        this.returnCall(product);
    }

    showPromotion = (key: any, promotion: any) => {
        let { cProduct } = this.cApp;
        cProduct.searchPromotion(key, promotion)
    }
}
