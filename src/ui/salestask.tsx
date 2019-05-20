import * as React from 'react';
import { TuidUI, tv, UqUI } from 'tonva';

export const salestaskUI: TuidUI = {
    content: (values: any) => {
        let { desciption, customer, type, sourceid } = values;
        return <>
            {tv(desciption)}{tv(customer)}{tv(type)}{tv(sourceid)}
        </>
    }
}

const uqUI: UqUI = {
    tuid: {
        salestask: salestaskUI,
    },
}

export default uqUI;
