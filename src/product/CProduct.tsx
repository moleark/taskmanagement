import * as React from 'react';
import { observable } from 'mobx';
// import { observer } from 'mobx-react';
import { tv, BoxId, QueryPager } from 'tonva';
import { CUqBase } from '../CBase';
import { ProductImage } from '../tools/productImage';
import { VProductSelect } from './VProductSelect';
import { VProductDetail } from './VProductDetail';
import { LoaderProductChemicalWithPrices } from './item';
import classNames from 'classnames';
import { VProductDelivery } from './VProductDelivery';
import { VProductBox } from './VProductBox';

import { VProductPackSelect } from './VProductPackSelect';
import { VChemicalInfoInCart } from './VChemicalInfoInCart';
import { VCartProuductView } from './VCartProuductView';
import { VProductPromotion } from './VProductPromotion';
import { VProductList } from './VProductList';
import { observer } from 'mobx-react';
import { VCustomerProductList } from './VCustomerProductList';
import { VProduct } from './VProduct';

/**
 *Query SearchPromotion( keyWord char(20), salesRegion ID SalesRegion, language ID Language )
  Query SearchPromotion( salesRegion ID SalesRegion, language ID Language )

 */

export class CProduct extends CUqBase {
    //cApp: CApp;
    @observable pageProduct: QueryPager<any>;
    @observable pageProduct1: QueryPager<any>;
    @observable customerlist: any;
    // @observable bannercaption: any;
    // @observable bannerdescription: any;
    @observable promotionPager: QueryPager<any>;
    @observable searcdpPromotionPager: QueryPager<any>;

    @observable inventoryAllocationContainer: { [packId: number]: any[] } = {};
    @observable futureDeliveryTimeDescriptionContainer: { [productId: number]: string } = {};
    @observable chemicalInfoContainer: { [productId: number]: any } = {};

    //初始化
    protected async internalStart(param: any) {
        // this.pageProduct = null;
        // this.openVPage(VProductSelect, param);
    }

    banners: any[] = [];

    render = observer(() => {
        this.pageProduct = null;
        return this.renderView(VProductList);
    })

    tab = () => {
        return <this.render />;
    }


    onScrollBottom = async () => {
        await this.pageProduct.more();
    }

    //查询客户--通过名称
    searchByKey = async (par: any) => {
        let { key, customer } = par;
        this.pageProduct = new QueryPager(this.uqs.product.SearchProduct, 15, 30);
        await this.pageProduct.first({ keyWord: key, salesRegion: 1 });
        if (!customer)
            return await this.openVPage(VProductList, key);
        else {
            this.closePage();
            await this.onSelectProduct(customer)
        }
    }

    //选择客户--给调用页面返回客户id
    returnProduct = async (product: any): Promise<any> => {
        this.returnCall(product);
    }

    //显示产品明细
    showProductDetail = async (param: any): Promise<any> => {
        let loader = new LoaderProductChemicalWithPrices(this.cApp);
        let product = await loader.load(param.id);
        this.openVPage(VProductDetail, product);
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
        await this.openVPage(VProductPromotion, promotionId)
    }

    showPromotion = async (promotion: any) => {
        await this.searchPromotion("", promotion);
        await this.openVPage(VProductPromotion, promotion)
    }

    renderCartProduct = (product: BoxId) => {
        return this.renderView(VCartProuductView, product);
    }
    renderChemicalInfoInCart = (product: BoxId) => {
        return this.renderView(VChemicalInfoInCart, product);
    }
    getChemicalInfo = async (productId: number) => {
        if (this.chemicalInfoContainer[productId] === undefined) {
            this.chemicalInfoContainer[productId] = await this.uqs.product.ProductChemical.obj({ product: productId });
        }
    }

    /**帮客户选择产品 */
    onSelectProduct = async (myCustomer: any) => {
        this.openVPage(VCustomerProductList, myCustomer)
    }

    /**产品详情 */
    onProductDetail = async (productId: BoxId | any) => {
        if (productId) {
            let discount = 0, product = productId;
            let loader = new LoaderProductChemicalWithPrices(this.cApp);
            let productData = await loader.load(productId);
            this.openVPage(VProduct, { productData, product, discount });
        }
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
