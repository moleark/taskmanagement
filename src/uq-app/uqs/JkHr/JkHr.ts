//=== UqApp builder created on Tue Sep 28 2021 23:29:17 GMT+0800 (China Standard Time) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqMap } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/hr ========
//===============================

export interface Tuid$user {
	id?: number;
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface Tuid$sheet {
	id?: number;
	no: string;
	user: number;
	date: any;
	sheet: number;
	version: number;
	flow: number;
	app: number;
	state: number;
	discription: string;
	data: string;
	processing: number;
}

export interface TuidEmployee {
	id?: number;
	name: string;
	no: string;
	firstName: string;
	lastName: string;
	title: string;
	Status: string;
	CreateTime: any;
}

export interface TuidRole {
	id?: number;
	no: string;
	name: string;
	note: string;
	IsValid: number;
	CreateTime: any;
}

export interface ParamDeleteWebuseEmployee {
	webuser: number;
	employee: number;
}
export interface ResultDeleteWebuseEmployee {
}

export interface ParamAddWebuseEmployee {
	webuser: number;
	employee: number;
}
export interface ResultAddWebuseEmployee {
}

export interface ParamSearchEmployee {
	key: string;
}
export interface ReturnSearchEmployee$page {
	id: number;
	no: string;
	name: string;
	firstName: string;
	lastName: string;
	title: string;
	Status: string;
	CreateTime: any;
	webuser: number;
	employee: number;
}
export interface ResultSearchEmployee {
	$page: ReturnSearchEmployee$page[];
}

export interface ParamSearchTeam {
	key: string;
}
export interface ReturnSearchTeam$page {
	id: number;
	webuser: number;
	employee: number;
}
export interface ResultSearchTeam {
	$page: ReturnSearchTeam$page[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamGetWebUser {
	employee: number;
}
export interface ReturnGetWebUserRet {
	webuser: number;
	employee: number;
}
export interface ResultGetWebUser {
	ret: ReturnGetWebUserRet[];
}

export interface ParamActs {
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Employee: UqTuid<TuidEmployee>;
	Role: UqTuid<TuidRole>;
	DeleteWebuseEmployee: UqAction<ParamDeleteWebuseEmployee, ResultDeleteWebuseEmployee>;
	AddWebuseEmployee: UqAction<ParamAddWebuseEmployee, ResultAddWebuseEmployee>;
	SearchEmployee: UqQuery<ParamSearchEmployee, ResultSearchEmployee>;
	SearchTeam: UqQuery<ParamSearchTeam, ResultSearchTeam>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetWebUser: UqQuery<ParamGetWebUser, ResultGetWebUser>;
	EmployeeRole: UqMap;
	WebuserEmployee: UqMap;
	EmployeeRelation: UqMap;
}

export function assign(uq: any, to:string, from:any): void {
	Object.assign((uq as any)[to], from);
}
