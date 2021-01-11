import React from 'react';
import { View } from 'tonva';
import { CInnerTeam } from './CInnerTeam';

export class VShowDataTotal extends View<CInnerTeam> {
    render(param: any) {
        let { sumEndTaskCount, sumSendCreditsCount, sumSendPostCount, sumOrderCount, sumSaleVolume } = param
        return (
            (sumEndTaskCount > 0 || sumSendCreditsCount > 0 || sumSendPostCount > 0 || sumOrderCount > 0 || sumSaleVolume > 0) ?
                <tr className="col dec px-3 py-2 bg-white cursor-pointer text-primary">
                    <td className="w-3">合计</td>
                    <td className="w-3">{sumEndTaskCount}</td>
                    <td className="w-3">{sumSendCreditsCount}</td>
                    <td className="w-3">{sumSendPostCount}</td>
                    <td className="w-3">{sumOrderCount}</td>
                    <td className="w-3">{sumSaleVolume}</td>
                </tr > : null
        )
    }
}