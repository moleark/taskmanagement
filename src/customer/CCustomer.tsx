import * as React from "react";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { Context, QueryPager } from 'tonva-react';
import { CApp, CUqBase } from 'uq-app';
import { Task } from "../salestask/model";
import { CAddress } from "../address/CAddress";
import { VCustomerSelect } from "./VCustomerSelect";
import { VCustomerDetail } from "./VCustomerDetail";
import { VCustomerList } from "./VCustomerList";
import { VCreateCustomer } from "./VCreateCustomer";
import { VCreateCustomerFinish } from "./VCreateCustomerFinish";
import { VCustomerSearch } from "./VCustomerSearch";
import { VCustomerEdit } from "./VCustomerEdit";
import { VMyCustomer } from "./VMyCustomer";
import { VCustomerRelation } from "./VCustomerRelation";
import { VCreateNewCustomer } from "./VCreateNewCustomer";
import { VNewCustomerList } from "./VNewCustomerList";
import { VCustomerSearchByUnit } from "./VCustomerSearchByUnit";
import { appSettings } from "appConfig";
import { VRelationCustomerWebuserId } from "./VRelationCustomerWebuserId";
import { VOrderDraftRule } from './VOrderDraftRule'
import { EnumCouponType } from "uq-app/uqs/JkCoupon";

/* eslint-disable */

export class CCustomer extends CUqBase {
    pageCustomer: QueryPager<any>;
    pageCustomerSearch: QueryPager<any>;
    pageCustomerSearchByUnit: QueryPager<any>;
    pageCustomerActive: QueryPager<any>;

    newMyCustomerList: any[];
    activetasks: any;
    customerorders: any;
    pagePost: QueryPager<any>;
    vipCardForWebUser: any;
    language: number = 0;
    private task: Task;

    isBinded: any;

    constructor(cApp: CApp) {
        super(cApp);
        makeObservable(this, {
            pageCustomer: observable,
            pageCustomerSearch: observable,
            pageCustomerSearchByUnit: observable,
            pageCustomerActive: observable,
            newMyCustomerList: observable,
            activetasks: observable,
            customerorders: observable,
            pagePost: observable,
            vipCardForWebUser: observable,
            language: observable,
            isBinded: observable
        })
    }

    //初始化
    protected async internalStart(task: Task) {
        // this.pageCustomer = null;
        this.task = task;
        this.searchByKey("");
        this.openVPage(VCustomerSelect);
    }

    /**
     * 查询客户——用在客户首页
     */
    searchByKey = async (key: string) => {
        this.pageCustomer = new QueryPager(this.uqs.salesTask.searchMyCustomer, 15, 30);
        this.pageCustomer.first({ key: key });
    };

    /*** 查询客户——用在客户首页*/
    searchCustomerSearchByUnit = async (unit: any, key: string) => {
        this.pageCustomerSearchByUnit = new QueryPager(this.uqs.salesTask.SearchMyCustomerByUnit, 15, 30);
        this.pageCustomerSearchByUnit.first({ _unit: unit, _key: key });
    };

    /**
     * 查询客户——用在专门的客户搜索界面——没有必要
     */
    searchCustomerByKey = async (key: string) => {
        this.pageCustomerSearch = new QueryPager(this.uqs.salesTask.searchMyCustomer, 15, 30);
        this.pageCustomerSearch.first({ key: key });
    };

    /**
     * 查询客户——查活跃客户
     */
    searchCustomerActiveByKey = async (key: string, type: number) => {
        this.pageCustomerActive = new QueryPager(this.uqs.salesTask.searchMyCustomerActive, 15, 30);
        this.pageCustomerActive.first({ key: key, type: type });
    };

    /**
     * 查询我的新客户
     */
    searchNewMyCustomer = async () => {
        let list = await this.uqs.salesTask.searchNewMyCustomer.query({});
        if (list.ret.length > 0) {
            this.newMyCustomerList = list.ret;
        }
    };

    /**
     * 显示新客户信息
     */
    showNewMyCustomerDetail = (model: any) => {
        this.openVPage(VCustomerRelation, model);
    };

    /**
     * 关联客户
     */
    onRelationCustomer = async (model: any) => {
        let mycustomer = await this.cApp.cCustomer.call();
        let { customer, webuser } = model;
        await this.uqs.salesTask.UpateCustomerMyCustomerMap.submit({
            _mycustomer: mycustomer,
            _customer: customer,
            _webuser: webuser
        });
        await this.searchByKey("");
        await this.searchNewMyCustomer();
    };

    // 查询客户--通过ID
    showCustomerDetail = async (myCustomer: any) => {
        let { uqs, user, cApp } = this;
        let { salesTask } = uqs;
        let { MyCustomer, SearchMyCustomerDepartment, SearchMyCustomerResearch, SearchMyCustomerOfficePost,
            CustomerMyCustomerMap, Coupon } = salesTask;
        let { id } = myCustomer;
        let promises: PromiseLike<any>[] = [];
        promises.push(
            MyCustomer.load(id),
            SearchMyCustomerDepartment.obj({ mycustomer: id }),
            SearchMyCustomerResearch.query({ mycustomer: id }),
            SearchMyCustomerOfficePost.query({ mycustomer: id }),
            this.getActiveTasks(myCustomer),
            this.getCustomerOrder(myCustomer)
        );
        let results = await Promise.all(promises);
        let [mycustomer, department, research, officePost] = [...results];

        mycustomer.department = department;
        if (research.ret.length > 0) mycustomer.research = research.ret[0];
        if (officePost.ret.length > 0)
            mycustomer.officePost = officePost.ret[0];
        await this.getCustomerContent(mycustomer.research ? mycustomer.research.id : 0);


        let customermap = await CustomerMyCustomerMap.obj({ mycustomer: myCustomer });
        if (customermap) {
            let { webuser, customer } = customermap;
            mycustomer.webuser = webuser;
            mycustomer.IsBinded = await this.setIsBinded(customer);
            if (webuser) {
                let vipCardForWebUser = await this.getVIPCard(webuser);
                if (vipCardForWebUser) {
                    let { vipCard } = vipCardForWebUser;
                    vipCardForWebUser.vipCard = await Coupon.load(vipCard)
                    vipCardForWebUser.drawed = await this.getVIPCardDrawing(webuser, vipCard);
                    this.vipCardForWebUser = vipCardForWebUser;
                } else {
                    this.vipCardForWebUser = undefined;
                }
            }
            cApp.currentMyCustomer = mycustomer;
        }

        this.openVPage(VCustomerDetail, mycustomer);
    };

    //获取客户当前的任务
    getActiveTasks = async (customer: any) => {
        let { id } = customer;
        this.activetasks = await this.uqs.salesTask.SearchHistoryTaskByCustomer.table(
            { customerid: id, types: 1 }
        );
    };

    //获取客户历史订单
    getCustomerOrder = async (customer: any) => {
        let { id } = customer;
        this.customerorders = await this.uqs.salesTask.SearchCustomerOrder.table(
            {
                _mycustomer: id,
                _ordertype: "coupon"
            }
        );
    };

    /**
     * 关联商城账号ID
    */
    toRelationShopId = async (myCustomer: any) => {
        this.openVPage(VRelationCustomerWebuserId, myCustomer)
    }

    addMycustomerRelationShopId = async (param: any) => {
        this.closePage(2)
        let { uqs } = this;
        let { salesTask, webuser } = uqs;
        let { customerShopId, myCustomer } = param;

        let customer = undefined;
        let customerResult = await webuser.WebUserCustomer.obj({ webUser: customerShopId });
        if (customerResult) {
            customer = customerResult.customer;
        }
        let { CustomerMyCustomerMap } = salesTask;
        await CustomerMyCustomerMap.add({ mycustomer: myCustomer.id, customer: customer, webuser: customerShopId });
        await this.showCustomerDetail(myCustomer)
    }

    getWebUserValidationResult = async (webuser: any) => {
        let webUser = await this.uqs.webuser.WebUser.load(webuser);
        return webUser;
    }

    // 获取客户相关Post
    getCustomerContent = async (domain: any) => {
        let publish = appSettings.isInner ? 3 : 2;
        this.pagePost = new QueryPager(this.uqs.webBuilder.SearchPostPublish, 5, 5);
        this.pagePost.first({ key: "", domain: domain, publish: publish, language: this.language });
    };

    /**
     * 搜索客户——用在任务等要需要选择客户的界面？
     */
    showSelectCustomer = async (task: Task) => {
        this.searchByKey("");
        this.task = task;
        this.openVPage(VCustomerSelect);
    };

    /**
     * 显示编辑客户信息界面
     */
    showCustomerEdit = async (customer: any) => {
        this.openVPage(VCustomerEdit, customer);
    };

    /**
     * 显示客户搜索界面
     */
    showCustomerSearch = async (val: any): Promise<any> => {
        if (val == null) {
            this.pageCustomerSearch = null;
        } else {
            this.searchCustomerByKey(val);
        }
        this.openVPage(VCustomerSearch);
    };

    /**
     * 显示客户搜索界面
     */
    showMyCustomer = async (val: any, type: number): Promise<any> => {
        if (val == null) {
            this.pageCustomerActive = null;
        } else {
            this.searchCustomerActiveByKey(val, type);
        }
        this.openVPage(VMyCustomer, type);
    };

    //选择客户--给调用页面返回客户id
    selectCustomer = async (customer: any): Promise<any> => {
        this.task.customer = customer;
        this.cApp.cSalesTask.showCrateCheck(this.task);
    };

    //选择客户--给调用页面返回客户id
    returnCustomer = async (customer: any): Promise<any> => {
        this.returnCall(customer);
    };

    /**
     * 新建客户时显示选择客户单位的页面
     */
    showSelectOrganization = (type: any) => {
        this.cApp.cCustomerUnit.start(type);
    };

    /**
     * 显示新建客户页面
     */
    showCreateCustomer = (param: any) => {
        this.openVPage(VCreateCustomer, param);
    };

    //新建客户
    createMyCustomer = async (param: any, organization: any) => {
        let par = {
            unit: organization.id,
            no: undefined as any,
            name: param.name,
            firstName: "",
            lastName: "",
            gender: param.gender ? 1 : param.gender,
            salutation: param.salutation,
            telephone: param.telephone,
            mobile: param.mobile,
            newcustomerid: 0
        };
        let ret = await this.uqs.salesTask.CreateMyCustomer.submit(par);
        let { code } = ret;
        this.openVPage(VCreateCustomerFinish, code);
    };

    //作废客户
    cancelCustomer = async (customer: any) => {
        this.closePage(2);
        customer.isValid = 0;
        await this.uqs.salesTask.MyCustomer.save(customer.id, customer);
        await this.searchByKey("");
    };

    showCreateNewCustomer = async (model: any) => {
        let unit = await this.cApp.cCustomerUnit.call(2);
        let par = {
            unit: unit,
            customer: model.customer
        };
        this.openVPage(VCreateNewCustomer, par);
    };

    createNewCustomer = async (
        model: any,
        organization: any,
        newcustomer: number
    ) => {
        let par = {
            unit: organization.id,
            no: undefined as any,
            name: model.name,
            firstName: "",
            lastName: "",
            gender: model.gender ? 1 : model.gender,
            salutation: model.salutation,
            telephone: model.telephone,
            mobile: model.mobile,
            newcustomerid: newcustomer
        };
        let ret = await this.uqs.salesTask.CreateMyCustomer.submit(par);
        let { code } = ret;
        this.openVPage(VCreateCustomerFinish, code);
    };

    //修改单位信息
    updateMyCustomer = async (param: any) => {
        await this.uqs.salesTask.MyCustomer.save(param.id, param);
    };

    /**
     * 查询MyCustomer是否可能被其他销售助手绑定
     */
    setIsBinded = async (customer: any) => {
        if (customer) {
            let occupyResult = await this.uqs.salesTask.MyCustomerIsOccupy.obj({ _customer: customer.id });
            if (occupyResult) {
                return this.isBinded = occupyResult.code;
            } else {
                return this.isBinded = 0;
            }
        }
    };

    renderOrderDraftRule = async () => {
        this.openVPage(VOrderDraftRule);
    }

    pickAddress = async (
        context: Context,
        name: string,
        value: number
    ): Promise<number> => {
        let cAddress = this.newC(CAddress);
        return await cAddress.call<number>();
    };

    showNewCustomerList = async () => {
        let list = await this.uqs.salesTask.searchNewMyCustomer.table({});
        this.openVPage(VNewCustomerList, list);
    }

    showCustomerSearchByUnit = async (param: any) => {
        await this.searchCustomerSearchByUnit(param.id.id, "");
        this.openVPage(VCustomerSearchByUnit);
    }

    private getVIPCard = async (webuser: any) => {
        let result = await this.uqs.salesTask.VIPCardForWebUser.obj({ webuser: webuser })
        return result;
    }

    private getVIPCardDrawing = async (webuser: any, coupon: any) => {
        let result = await this.uqs.webuser.WebUserVipCard.obj({
            webuser: webuser,
            arr1: [{ vipCard: coupon, vipCardType: EnumCouponType.VipCard }]
        })
        return result ? true : false;
    }

    /**
     * 显示创建VIP卡界面的第一步——选择VIP卡级别
     */
    showCreateVIPCardPage = async (webUser: any) => {
        let { cVIPCardType, uqs } = this.cApp;
        let newVIPCard = await cVIPCardType.call<any>(webUser);

        let vipCardForWebUser = await this.getVIPCard(webUser);
        vipCardForWebUser.drawed = false;
        this.vipCardForWebUser = vipCardForWebUser;
    }

    /**
     * 显示VIP卡折扣界面 
     */
    showVIPCardDiscount = async (vipCardId: number) => {
        let { cCoupon } = this.cApp;
        cCoupon.showVIPCardDiscount(vipCardId);
    }

    /*
    renderVIPCardTypes = () => {
        let { cVIPCardType } = this.cApp;
        return cVIPCardType.renderVIPCardTypeList();
    }
    */

    onScrollBottom = async () => {
        await this.pageCustomer.more();
    }

    searchTaskByKey = async () => {
        let { cSalesTask } = this.cApp;
        return cSalesTask.searchTaskByKey(0)
    }

    render = observer(() => {

        return this.renderView(VCustomerList);
    });

    tab = () => {
        this.searchByKey("");
        this.searchTaskByKey();
        return <this.render />;
    };

}
