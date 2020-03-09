import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, tv } from "tonva";
import { CCustomer } from "./CCustomer";
import { setting } from "appConfig";
import { ProductImage } from "tools/productImage";

export class VCustomerOrderDetail extends VPage<CCustomer> {
    async open(order: any) {
        this.openPage(this.page, order);
    }

    private renderOrderItem = (orderItem: any) => {
        let { product, pack } = orderItem;

        return tv(product, v => (
            <div className="row d-flex mb-3 px-2">
                <div className="col-12">
                    <div className="py-2">
                        <strong>{v.description}</strong>
                    </div>
                    <div className="pb-2">
                        <strong>{v.descriptionC}</strong>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-3">
                            <ProductImage
                                chemicalId={v.imageUrl}
                                className="w-100"
                            />
                        </div>
                        <div className="pb-2">
                            <div>{v.origin}</div>
                            <div>
                                {tv(pack, s => (
                                    <div>
                                        {s.radiox}*{s.radioy}
                                        {""}
                                        {s.unit}
                                    </div>
                                ))}
                            </div>
                            <div>{tv(v.brand, s => s.name)}</div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    private page = observer((order: any) => {
        let { data } = order;
        let { orderitems } = data;
        return (
            <Page headerClassName={setting.pageHeaderCss}>
                <List
                    items={orderitems}
                    item={{ render: this.renderOrderItem }}
                />
            </Page>
        );
    });
}
