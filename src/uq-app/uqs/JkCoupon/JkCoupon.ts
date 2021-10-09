//=== UqApp builder created on Sat Oct 09 2021 15:26:34 GMT+0800 (China Standard Time) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqMap, UqHistory, UqID, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/coupon ========
//===============================

export enum EnumCouponType {
    Coupon = 1,
    Credits = 2,
    VipCard = 3
}

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

export interface TuidBrand {
    id?: number;
}

export interface ParamIsCanUseCoupon {
    code: string;
    customer: number;
    webUser: number;
}
export interface ReturnIsCanUseCouponRet {
    result: number;
    id: number;
    code: string;
    type: any;
    validityDate: any;
    isValid: number;
    creator: number;
}
export interface ResultIsCanUseCoupon {
    ret: ReturnIsCanUseCouponRet[];
}

export interface ParamCreateCoupon {
    type: any;
    validityDate: any;
}
export interface ReturnCreateCouponRet {
    coupon: number;
    code: string;
}
export interface ResultCreateCoupon {
    ret: ReturnCreateCouponRet[];
}

export interface ParamSearchCoupon {
    key: string;
    type: any;
}
export interface ReturnSearchCoupon$page {
    id: number;
    code: string;
    type: any;
    validityDate: any;
    isValid: number;
    creator: number;
    createDate: any;
}
export interface ResultSearchCoupon {
    $page: ReturnSearchCoupon$page[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
    poke: number;
}
export interface Result$poked {
    ret: Return$pokedRet[];
}

export interface ParamCustomerBoundHistory {
    customer: number;
    boundTo: number;
    operation: number;
}
export interface ReturnCustomerBoundHistory$page {
    date: any;
    customer: number;
    boundTo: number;
    operation: number;
}
export interface ResultCustomerBoundHistory {
    $page: ReturnCustomerBoundHistory$page[];
}

export interface ParamWebUserBoundHistory {
    webuser: number;
    boundTo: number;
    operation: number;
}
export interface ReturnWebUserBoundHistory$page {
    date: any;
    webuser: number;
    boundTo: number;
    operation: number;
}
export interface ResultWebUserBoundHistory {
    $page: ReturnWebUserBoundHistory$page[];
}

export interface Coupon {
    id?: number;
    code: string;
    type: any;
    validityDate: any;
    isValid: number;
    creator: number;
    createDate: any;
    $create?: any;
}

export interface CustomerBound {
    ix: number;
    xi: number;
    boundDate: any;
    boundDays: number;
}

export interface WebUserBound {
    ix: number;
    xi: number;
    boundDate: any;
    boundDays: number;
}

export interface IxCouponUsed {
    ix: number;
    xi: number;
    order: number;
}

export interface ParamActs {
    coupon?: Coupon[];
    customerBound?: CustomerBound[];
    webUserBound?: WebUserBound[];
    ixCouponUsed?: IxCouponUsed[];
}


export interface UqExt extends Uq {
    Acts(param: ParamActs): Promise<any>;

    $user: UqTuid<Tuid$user>;
    $sheet: UqTuid<Tuid$sheet>;
    Brand: UqTuid<TuidBrand>;
    IsCanUseCoupon: UqAction<ParamIsCanUseCoupon, ResultIsCanUseCoupon>;
    CreateCoupon: UqAction<ParamCreateCoupon, ResultCreateCoupon>;
    SearchCoupon: UqQuery<ParamSearchCoupon, ResultSearchCoupon>;
    $poked: UqQuery<Param$poked, Result$poked>;
    BottomDiscount: UqMap;
    VIPCardDiscount: UqMap;
    CustomerBoundHistory: UqHistory<ParamCustomerBoundHistory, ResultCustomerBoundHistory>;
    WebUserBoundHistory: UqHistory<ParamWebUserBoundHistory, ResultWebUserBoundHistory>;
    Coupon: UqID<any>;
    CustomerBound: UqIX<any>;
    WebUserBound: UqIX<any>;
    IxCouponUsed: UqIX<any>;
}

export function assign(uq: any, to: string, from: any): void {
    Object.assign((uq as any)[to], from);
}
