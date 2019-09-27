import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VPage, Page, StringProp, Prop, PropGrid, FA, Edit, Schema, UiSchema, UiInputItem, ItemSchema, nav } from 'tonva';
import { consts } from '../consts';
import { CCustomerUnit } from './CCustomerUnit';

const schema: Schema = [
    { name: 'name', type: 'string' },
];

export class VCustomerUnitDetail extends VPage<CCustomerUnit> {

    @observable private unit: any;
    private uiSchema: UiSchema = {
        items: {
            name: { widget: 'text', label: '单位名称', placeholder: '请输入单位名称' } as UiInputItem,
        }
    }

    async open(unit: any) {
        this.unit = unit;
        this.openPage(this.page);
    }

    private onItemChanged = async (itemSchema: ItemSchema, newValue: any, preValue: any) => {
        let { name } = itemSchema;
        this.unit[name] = newValue;
        await this.controller.updateMyCustomerUnit(this.unit);

    }

    private page = observer(() => {

        let right = <div className="cursor-pointer py-2 px-3 "><FA name="pencil" /></div>;
        return <Page header="客户单位详情" headerClassName={consts.headerClass}  >
            <Edit
                schema={schema}
                uiSchema={this.uiSchema}
                data={this.unit}
                onItemChanged={this.onItemChanged} />
        </Page>
    })
}