import { Tuid, Map, Query, Action, Sheet, Book } from "tonva";
import { Many } from "lodash";

export interface UqOrder {
    SetCart: Action;
    RemoveFromCart: Action;
    MergeCart: Action;
    Order: Sheet;
    GetCart: Query;
    getPendingPayment: Query;
}

export interface UqHr {
    Employee: Tuid;
}

export interface UqProduct {
    ProductX: Tuid;
    Brand: Tuid;
    PriceX: Map;
    ProductChemical: Map;
    AgentPrice: Map;
    GetRootCategory: Query;
    GetRootCategories: Query;
    GetChildrenCategory: Query;
    SearchProduct: Query;
    SearchProductByCategory: Query;
    GetFutureDeliveryTime: Query;
    ProductCategory: Tuid;
}

export interface UqCommon {
    SalesRegion: Tuid;
    Language: Tuid;
    Address: Tuid;
    InvoiceInfo: Tuid;
    InvoiceType: Tuid;
    GetCountryProvinces: Query;
    GetProvinceCities: Query;
    GetCityCounties: Query;
}

export interface UqWebUser {
    WebUser: Tuid;
    WebUserContact: Map;
    webUserSetting: Map;
    WebUserCustomer: Map;
    WebUserContacts: Map;
    WebUserVipCard: Map;
    WebUserSetting: Map;
    WebUserBuyerAccount: Map;
    WebUserVIPCard: Map;
    WebUserCoupon: Map;
    SearchCouponReceive: Query;
    WebUserCouponUsed: Map;
}

export interface UqCustomer {
    Contact: Tuid;
    CustomerContacts: Map;
    CustomerSetting: Map;
    SearchWebUser: Query;
    getCustomerByKey: Query;
    getCustomerOrganization: Query;
    SearchDomain: Query;
    InvoiceInfo: Tuid;
}

export interface UqCustomerDiscount {
    GetDiscount: Query;
}

export interface UqPromotion {
    GetPromotionPack: Query;
    SearchPromotion: Query;
}

export interface UqWarehouse {
    GetInventoryAllocation: Query;
}

export interface UqSalesTask {
    $user: Tuid;
    Coupon: Tuid;
    MyCustomer: Tuid;
    MyCustomerUnit: Tuid;
    Task: Tuid;
    TaskType: Tuid;
    Organization: Tuid;
    CreateCoupon: Action;
    IsCanUseCoupon: Action;
    CreateMyCustomer: Action;
    UpateCustomerMyCustomerMap: Action;
    CreateMyCustomerUnit: Action;
    UpdateNowMessage: Action;
    SavePeerAssigned: Action;
    AddTask: Action;
    ImportTask: Action;
    ExtensionTask: Action;
    CompletionTask: Action;
    CompletionCustomerInfoTask: Action;
    CreateTaskProduct: Action;
    CreateTaskProductPack: Action;
    CreateTaskProject: Action;
    CreatePosition: Action;
    CustomerMyCustomerMap: Map;
    Position: Map;
    TaskBiz: Map;
    SearchCoupon: Query;
    SearchTask: Query;
    SearchJKTask: Query;
    SearchTaskCompletion: Query;
    SearchHistoryTask: Query;
    SearchHistoryTaskByEmployee: Query;
    SearchHistoryTaskByCustomer: Query;
    searchMyCustomer: Query;
    searchMyCustomerActive: Query;
    searchMyCustomerUnit: Query;
    SearchTeam: Query;
    searchNowMessage: Query;
    searchMessage: Query;
    SearchPosition: Query;

    SearchAchievement: Query;
    SearchAchievementHistory: Query;

    getCustomerOrganization: Query;
    SearchTaskProduct: Query;
    SearchTaskProductPack: Query;
    SearchTaskProject: Query;
    MyCustomerIsOccupy: Query;
    Relation: Map;
    searchNewMyCustomer: Query;
    WebUserEmployeeMap: Map;
    Withdrawal: Sheet;
    WithdrawalStateBook: Book;
    SearchWithdrawalStateQuery: Query;
    SearchBalanceHistory: Query;
    WebUserAccountMap: Map;
    AddWebUserAccountMap: Action;

    // 计算销量/提成
    ComputeAchievement: Action;
    // 根据回款情况计算“已到账”金额
    ComputeBalance: Action;

    SearchMyCustomerByPost: Query;
    SearchMyCustomerByDomain: Query;
    SearchMyCustomerByCategory: Query;
    AddMyCustomerPost: Action;
    SearchCustomerOrder: Query;
    SearchMyCustomerDepartment: Query;
    SearchMyCustomerResearch: Query;
    SearchMyCustomerOfficePost: Query;
    TaskOrder: Map;
    SearchMyCustomerByUnit: Query;
    SearchTaskHistoryCount: Query;
    AddCouponSendHistory: Action;
    SearchBottomDiscount: Query;

    getTeamDailyAchieve: Query;
    getTeamMonthlyAchieve: Query;
    getTeamYearlyAchieve: Query;
    getPersonDailyAchieve: Query;
    getPersonMonthlyAchieve: Query;
    getPersonYearlyAchieve: Query;
    getTeamMemberYearlyAchieve: Query;

    VIPCardForWebUser: Map;
    VIPCardDiscount: Map;
    BottomDiscount: Map;

    SearchCouponUsed: Query;
}

export interface UqMember {
    MemberAction: Action;
    MemberRecommender: Map;
}

export interface UqWebBuilder {
    Content: Tuid;
    Template: Tuid;
    Image: Tuid;
    Post: Tuid;
    SearchPost: Query;
    SearchPostPublish: Query;
    SearchTemplate: Query;
    SearchImage: Query;
    AgentPost: Map;
    WebPost: Map;
    AssistPost: Map;
    CustomerPost: Map;
    TransmitPost: Action;
    SearchClassRoomPost: Query;
    SearchProductCategoryPost: Query;
    SearchSubject: Query;
    SearchSubjectPost: Query;
    SearchDomainPost: Query;
    PostDomain: Map;
    PostProductCatalog: Map;
    GetSlideShow: Query;

    SearchAchievementOfTeamNew: Query;
    SearchAchievementOfTeamDetail: Query;
    SearchDomainPostCount: Query;
    SearchProductCategoryPostCount: Query;
}

export interface UqVIPCardType {
    VIPCardType: Tuid;
    VIPCardTypeDiscount: Map;
    OrganizationVIPLevel: Map;
}
export interface UqOrderDraft {
    OrderDraft: Sheet;
    getOrderDraftByMaker: Query;
    getSendOutHistory: Query;
    sendOutOrderDraft: Action
}

export interface UQs {
    order: UqOrder;
    product: UqProduct;
    common: UqCommon;
    webuser: UqWebUser;
    customer: UqCustomer;
    customerDiscount: UqCustomerDiscount;
    promotion: UqPromotion;
    warehouse: UqWarehouse;
    salesTask: UqSalesTask;
    member: UqMember;
    webBuilder: UqWebBuilder;
    vipCardType: UqVIPCardType;
    hr: UqHr;
    orderDraft: UqOrderDraft
}
