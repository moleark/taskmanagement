import * as React from 'react';
import { tv } from 'tonva-react-uq';
export var salestaskUI = {
    content: function (values) {
        var desciption = values.desciption, customer = values.customer, type = values.type, sourceid = values.sourceid;
        return React.createElement(React.Fragment, null,
            tv(desciption),
            tv(customer),
            tv(type),
            tv(sourceid));
    }
};
var uqUI = {
    tuid: {
        salestask: salestaskUI,
    },
};
export default uqUI;
//# sourceMappingURL=salestask.js.map