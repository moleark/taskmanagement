import { BoxId } from 'tonva-react';

export interface PackRow {
    pack: BoxId;
    quantity: number;
    futureDeliveryTimeDescription?: string;
    inventoryAllocation?: any[];
}

export interface ProductPackRow extends PackRow {
    retail: number;
    vipPrice: number;
    promotionPrice: number;
    agentPrice: number;
    currency: BoxId;
}