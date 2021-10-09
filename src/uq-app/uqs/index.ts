///+++import AppUQs+++///
import { UQs as AppUQs } from 'uqs';
///###import AppUQs###///
//=== UqApp builder created on Sat Oct 09 2021 15:26:34 GMT+0800 (China Standard Time) ===//
import * as JkSalesTask from './JkSalesTask';
import * as JkCoupon from './JkCoupon';

export interface UQs extends AppUQs {
	JkSalesTask: JkSalesTask.UqExt;
	JkCoupon: JkCoupon.UqExt;
}

export * as JkSalesTask from './JkSalesTask';
export * as JkCoupon from './JkCoupon';

export function setUI(uqs:UQs) {
	JkSalesTask.setUI(uqs.JkSalesTask);
	JkCoupon.setUI(uqs.JkCoupon);
}
