import _ from 'lodash';
import { Tuid, TuidDiv, Map, Query } from 'tonva';
import { ProductPackRow } from './Product';
import { Loader } from 'mainSubs/loader';
import { MainSubs, MainProductChemical, MainBrand } from 'mainSubs';

export class LoaderBrand extends Loader<MainBrand> {
    private brandTuid: Tuid;

    protected initEntities() {
        let { cUqProduct } = this.cApp;
        this.brandTuid = cUqProduct.tuid('brand');
    }

    protected async loadToData(brandId: number, data: MainBrand): Promise<void> {
        let brand = await this.brandTuid.load(brandId);
        data.id = brand.id;
        data.name = brand.name;
    }

    protected initData(): MainBrand {
        return {} as MainBrand;
    }
}

export class LoaderProductChemical extends Loader<MainProductChemical> {
    private productTuid: Tuid;
    private packTuid: TuidDiv;
    private productChemicalMap: Map;

    protected initEntities() {

        let { cUqProduct } = this.cApp;
        this.productTuid = cUqProduct.tuid('productx');
        this.packTuid = this.productTuid.div['packx'];
        this.productChemicalMap = cUqProduct.map('productChemical');
    }

    protected async loadToData(productId: number, data: MainProductChemical): Promise<void> {

        let product = await this.productTuid.load(productId);
        _.merge(data, product);

        let brandLoader = new LoaderBrand(this.cApp);
        data.brand = await brandLoader.load(data.brand.id);

        let productChemical = await this.productChemicalMap.obj({ product: productId });
        if (productChemical) {
            let { chemical, purity, CAS, molecularFomula, molecularWeight } = productChemical;
            data.chemical = chemical;
            data.purity = purity;
            data.CAS = CAS;
            data.molecularFomula = molecularFomula;
            data.molecularWeight = molecularWeight;
        }

        data.packs = [];
        product.packx.forEach(e => {
            // let { id, radiox, radioy, unit } = e;
            data.packs.push(e);
        });
    }

    protected initData(): MainProductChemical {
        return {} as MainProductChemical;
    }
}

export class LoaderProductChemicalWithPrices extends Loader<MainSubs<MainProductChemical, ProductPackRow>> {

    private priceMap: Map;
    private agentPriceMap: Map;
    private getInventoryAllocationQuery: Query;
    private getFutureDeliveryTime: Query;
    private getPromotionPackQuery: Query;

    protected initEntities() {

        let { cUqProduct, cUqWarehouse, cUqPromotion } = this.cApp;
        this.priceMap = cUqProduct.map('pricex');
        this.agentPriceMap = cUqProduct.map('AgentPrice');
        this.getInventoryAllocationQuery = cUqWarehouse.query("getInventoryAllocation");
        this.getFutureDeliveryTime = cUqProduct.query("getFutureDeliveryTime");
        this.getPromotionPackQuery = cUqPromotion.query("getPromotionPack");
    }

    protected initData(): MainSubs<MainProductChemical, ProductPackRow> {
        return { main: {} as MainProductChemical, subs: [] as ProductPackRow[] };
    }

    protected async loadToData(productId: any, data: MainSubs<MainProductChemical, ProductPackRow>): Promise<void> {

        let productLoader = new LoaderProductChemical(this.cApp);
        data.main = await productLoader.load(productId);

        let { currentSalesRegion, currentLanguage } = this.cApp;
        let { id: currentSalesRegionId } = currentSalesRegion;
        let prices = await this.priceMap.table({ product: productId, salesRegion: currentSalesRegionId });
        let agentprices = await this.agentPriceMap.table({ product: productId, salesRegion: currentSalesRegionId });
        data.subs = prices;
        let promises: PromiseLike<any>[] = [];
        data.subs.forEach(v => {
            promises.push(this.getInventoryAllocationQuery.table({ product: productId, pack: v.pack, salesRegion: currentSalesRegion }));
            promises.push(this.getPromotionPackQuery.obj({ product: productId, pack: v.pack, salesRegion: currentSalesRegion, language: currentLanguage }));
        })
        let results = await Promise.all(promises);

        let fd = await this.getFutureDeliveryTimeDescription(productId, currentSalesRegionId);
        for (let i = 0; i < data.subs.length; i++) {
            data.subs[i].futureDeliveryTimeDescription = fd;
            data.subs[i].inventoryAllocation = results[i * 2];
            let aa = this.getagentPrices(agentprices, data.subs[i].pack.id);
            // data.subs[i].agentPrices = aa;
            let promotion = results[i * 2 + 1];
            let discount = promotion && promotion.discount;
            if (discount) {
                data.subs[i].promotionPrice = Math.round((1 - discount) * data.subs[i].retail);
            }

            for (let j = 0; j < agentprices.length; j++) {
                let pid = agentprices[j].pack.id;
                let pidx = data.subs[i].pack.id;
                if (pidx == pid) {
                    data.subs[i].agentPrice = agentprices[j].agentPrice;
                }
            }
        }
    }

    getagentPrices = async (agents: any[], pack: any) => {
        for (let i = 0; i < agents.length; i++) {
            let { pack: packid, agentprice } = agents[i];
            if (packid = pack) {
                return agentprice;
            }
        }
    }

    private getFutureDeliveryTimeDescription = async (productId: number, salesRegionId: number) => {
        let futureDeliveryTime = await this.getFutureDeliveryTime.table({ product: productId, salesRegion: salesRegionId });
        if (futureDeliveryTime.length > 0) {
            let { minValue, maxValue, unit, deliveryTimeDescription } = futureDeliveryTime[0];
            return minValue + (maxValue > minValue ? '~' + maxValue : '') + ' ' + unit;
        }
    }
}