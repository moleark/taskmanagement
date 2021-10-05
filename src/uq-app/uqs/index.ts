///+++import AppUQs+++///
import { UQs as AppUQs } from 'uqs';
///###import AppUQs###///
//=== UqApp builder created on Sat Oct 02 2021 22:23:04 GMT+0800 (China Standard Time) ===//
import * as JkSalesTask from './JkSalesTask';

export interface UQs extends AppUQs {
	JkSalesTask: JkSalesTask.UqExt;
}

export * as JkSalesTask from './JkSalesTask';

export function setUI(uqs:UQs) {
	JkSalesTask.setUI(uqs.JkSalesTask);
}
