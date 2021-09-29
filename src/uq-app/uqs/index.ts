//=== UqApp builder created on Wed Sep 29 2021 16:29:57 GMT+0800 (China Standard Time) ===//
import * as JkSalesTask from './JkSalesTask';
import { UQs as AppUQs } from 'uqs';

export interface UQs extends AppUQs {
    JkSalesTask: JkSalesTask.UqExt;
}

export function setUI(uqs: UQs) {
    JkSalesTask.setUI(uqs.JkSalesTask);
}
