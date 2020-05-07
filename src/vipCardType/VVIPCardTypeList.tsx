import * as React from 'react';
import { View, List, LMR, FA } from 'tonva';
import { CVIPCardType } from './CVIPCardType';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class VVIPTypeList extends View<CVIPCardType>{
    @observable cardTypes: any[];

    render() {
        return <this.content />
    }

    private async getVIPCardTypeList() {
        if (!this.cardTypes) {
            this.cardTypes = await this.controller.getVIPCardTypeList();
        }
    }

    private renderCardType(cardtype: any) {
        let { name, description } = cardtype;
        let right = <FA name="chevron-right" className=""></FA>
        return <LMR left={name} right={right}>
            {description}
        </LMR>
    }

    private onCardTypeClick = async (cardType: any) => {
        console.log(cardType);
    }

    private content = observer((): JSX.Element => {
        this.getVIPCardTypeList();
        return <List items={this.cardTypes} item={{ render: this.renderCardType, onClick: this.onCardTypeClick }}></List>
    })
}