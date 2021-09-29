//=== UqApp builder created on Tue Sep 28 2021 23:29:17 GMT+0800 (China Standard Time) ===//
import * as JkHr from './JkHr';
import { UQs as AppUQs } from 'uqs';

export interface UQs extends AppUQs {
    JkHr: JkHr.UqExt;
}


export function setUI(uqs: UQs) {
    JkHr.setUI(uqs.JkHr);
}
