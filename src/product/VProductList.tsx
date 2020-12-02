import * as React from 'react';
import { observer } from 'mobx-react';
import { tv } from 'tonva';
import { VPage, Page, List } from 'tonva';
import { CProduct } from './CProduct';
import { ProductImage } from '../tools/productImage';
import { setting } from 'appConfig';
import classNames from 'classnames';

export class VProductList extends VPage<CProduct> {

    async open(param: any) {
        this.openPage(this.page);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
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
        let { showProductDetail } = this.controller;
        let { brand, description, descriptionC, CAS, purity, molecularFomula, molecularWeight, origin, imageUrl } = product;
        let onshowProductDetail = async () => await showProductDetail(product);
        return <div className="d-block mb-4 px-2" onClick={onshowProductDetail}>
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

    private page = observer((product: any) => {

        let { pageProduct, onScrollBottom, cApp } = this.controller;
        let { productCart, cHome } = cApp;

        let none = <div className="my-3 mx-2 text-warning">未搜索到产品</div>;

        let pointer, badge, count;
        count = productCart.count;
        if (count > 0) {
            pointer = 'cursor-pointer';
            if (count < 100) badge = <u>{count}</u>;
            else badge = <u>99+</u>;
        }
        let onshowProductBox = async () => await this.controller.showProductBox()

        let right = <div className="cursor-pointer py-1" >
            <div className={classNames('jk-cart ml-1 mr-3', pointer)}>
                <div onClick={onshowProductBox} >
                    {badge}
                    <i className="iconfont icon-dabao" style={{ fontSize: "20px" }}></i>
                </div>
            </div>
        </div>;

        let header = cHome.renderSearchHeader();
        return <Page header={header} right={right} onScrollBottom={onScrollBottom} headerClassName={setting.pageHeaderCss} >
            {/* <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索: </small>{this.seachkey}</div> */}
            <List before={''} none={none} items={pageProduct} item={{ render: this.renderProduct, onClick: null }} />
        </Page>
    })
}

/*
export class VCustomerProductList extends VProductList {
    private customer: any;
    async open(param: any) {
        this.customer = param
        this.openPage(this.page);
    }
    private onProductClick = async (product: any) => {
        let customer = this.customer;
        let param = { product, customer }
        await this.controller.showProductDetail(param);
    }

    page = observer(() => {
        let { pageProduct, cApp, onScrollBottom } = this.controller;
        let search = <div className="w-100 d-flex">
            <span className="pt-1 text-white " style={{ width: '4rem' }}>{this.customer.name}</span>
            <SearchBox className="w-100 mr-2"
                size={"sm"}
                onSearch={(key: string) => this.controller.searchByKey({ key, customer: this.customer })}
                placeholder="搜索品名、编号、CAS、MDL等" />
        </div>
        let right = cApp.cCart.renderCartLabel();
        let none = <div className="my-3 mx-2 text-warning">无</div>;
        return <Page header={search} onScrollBottom={onScrollBottom} right={right}>
            <div className="bg-white py-2 px-3 mb-1"><small className=" small text-muted">搜索客户需要的产品 </small></div>
            <div className="px-2 py-2 bg-white mb-3">
                {(pageProduct && pageProduct.items && (pageProduct.items.length > 0)) ? <List before={''} none={none}
                    items={pageProduct} item={{ render: this.renderProduct, onClick: this.onProductClick }} /> : null}
            </div>
        </Page>
    })
}
*/