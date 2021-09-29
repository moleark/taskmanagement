import * as React from 'react';
import { CProduct } from './CProduct';
import { VPage, Page, SearchBox, Scroller, tv, List, Form } from 'tonva-react';
import { ProductImage } from 'tools/productImage';
import { observer } from 'mobx-react';

export class VCustomerProductList extends VPage<CProduct> {

    private customer: any;
    async open(param: any) {
        this.customer = param
        this.openPage(this.page);
    }

    private onProductClick = async (product: any) => {
        await this.controller.onProductDetail(product.id);
    }

    private renderBrand = (brand: any) => {
        return this.productPropItem('品牌', brand.name);
    }
    private productPropItem = (caption: string, value: any) => {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4 col-lg-8">{value}</div>
        </>;
    }

    private renderProduct = (product: any, index: number) => {
        let { id, brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
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
                        {this.productPropItem('CAS', CAS)}
                        {this.productPropItem('纯度', purity)}
                        {this.productPropItem('分子式', molecularFomula)}
                        {this.productPropItem('分子量', molecularWeight)}
                        {this.productPropItem('产品编号', origin)}
                        {tv(brand, this.renderBrand)}
                    </div>
                </div>
            </div>
        </div>
    }
    private onScrollBottom = async (scroller: Scroller) => {
        scroller.scrollToBottom();
        let { pageProduct } = this.controller;
        pageProduct.more();
    }

    private page = observer(() => {
        let { pageProduct, cApp } = this.controller;
        let search = cApp.cHome.renderSearchHeader('fromOrderDraftSearch');
        let { cCart, currentMyCustomer } = cApp;
        let right = cCart.renderCartLabel();
        let none = <div className="my-3 mx-2 text-warning">无</div>;
        return <Page header={search} onScrollBottom={this.onScrollBottom} right={right}>
            <div className="bg-white py-2 px-3 mb-1">
                <small className=" small text-muted">选择客户
                    <span className="px-1 text-success">
                        {currentMyCustomer.name}
                    </span>需要的产品
                </small>
            </div>
            <div className="px-2 py-2 bg-white mb-3">
                {(pageProduct && pageProduct.items && (pageProduct.items.length > 0)) ? <List before={''} none={none}
                    items={pageProduct} item={{ render: this.renderProduct, onClick: this.onProductClick }} /> : null}
            </div>
        </Page>
    })
}
