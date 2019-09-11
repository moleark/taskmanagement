import * as React from 'react';
import { tv } from 'tonva';

const tvSalestask = (values: any) => {
    let { desciption, customer, type, sourceid } = values;
    return <>
        {tv(desciption)}{tv(customer)}{tv(type)}{tv(sourceid)}
    </>
};

export const salesTask = {
    salesTask: tvSalestask    
}