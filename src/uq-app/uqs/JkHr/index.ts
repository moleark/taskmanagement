import { UqExt as Uq, assign } from './JkHr';
import * as Employee from './Employee.ui';
import * as Role from './Role.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Employee', Employee);
	assign(uq, 'Role', Role);
}
export * from './JkHr';
