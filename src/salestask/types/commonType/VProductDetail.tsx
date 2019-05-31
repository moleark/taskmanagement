import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Schema, Form, Context, tv, List } from 'tonva';
import { observer } from 'mobx-react';
import { CreateProduct } from '../../model';
import { CSalesTask } from 'salestask/CSalesTask';
import { render } from 'react-dom';

const schema: Schema = [
    { name: 'note', type: 'string', required: false },
    //{ name: 'submit', type: 'submit' },
];

export class VProductDetail extends VPage<CSalesTask> {

    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        return this.render(param);
    });

    private renderItem = (param: any, index: number) => {
        let { product } = param;
        return <div>{tv(product, v => <> {v.description}</>)}</div>
    }

    render(param: any) {
        let none = <div className="my-3 mx-2 text-muted">无产品</div>;
        return <Page header="产品详情" headerClassName='bg-primary'>
            <div className="mx-3">
                你好
                <List before={''} none={none} items={param} item={{ render: this.renderItem }} />
            </div>
        </Page >
    }
}