import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Context, QueryPager } from "tonva";
import { CUqBase } from "../CBase";
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
import { VCustomerOrderDetail } from "./VCustomerOrderDetail";
import { VNewCustomerList } from "./VNewCustomerList";
import { VCustomerSearchByUnit } from "./VCustomerSearchByUnit";
import { VCreateVIPCard } from "./VCreateVIPCard";
/* eslint-disable */

export class CCustomer extends CUqBase {
    @observable pageCustomer: QueryPager<any>;
    @observable pageCustomerSearch: QueryPager<any>;
    @observable pageCustomerSearchByUnit: QueryPager<any>;
    @observable pageCustomerActive: QueryPager<any>;

    @observable newMyCustomerList: any[];
    @observable activetasks: any;
    @observable customerorders: any;
    @observable pagePost: QueryPager<any>;
    @observable vipCard: any;
    private task: Task;

    //初始化
    protected async internalStart(task: Task) {
        this.pageCustomer = null;
        this.task = task;
        this.searchByKey("");
        this.searchNewMyCustomer();
        this.openVPage(VCustomerSelect);
    }

    /**
     * 查询客户——用在客户首页
     */
    searchByKey = async (key: string) => {
        this.pageCustomer = new QueryPager(this.uqs.salesTask.searchMyCustomer, 15, 30);
        this.pageCustomer.first({ key: key });
    };

    /**
     * 查询客户——用在客户首页
     */
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
            mycustomer: mycustomer,
            customer: customer,
            webuser: webuser
        });
        await this.searchByKey("");
        await this.searchNewMyCustomer();
    };

    //查询客户--通过ID
    showCustomerDetail = async (customer: any) => {
        let { id, user: webuser } = customer;
        let mycustomer = await this.uqs.salesTask.MyCustomer.load(id);
        let department = await this.uqs.salesTask.SearchMyCustomerDepartment.query(
            { mycustomer: id }
        );
        let research = await this.uqs.salesTask.SearchMyCustomerResearch.query({
            mycustomer: id
        });
        let officePost = await this.uqs.salesTask.SearchMyCustomerOfficePost.query(
            { mycustomer: id }
        );
        if (department.ret.length > 0)
            mycustomer.department = department.ret[0];
        if (research.ret.length > 0) mycustomer.research = research.ret[0];
        if (officePost.ret.length > 0)
            mycustomer.officePost = officePost.ret[0];

        await this.getActiveTasks(customer);
        await this.getCustomerOrder(customer);
        await this.getCustomerContent(customer);
        if (webuser) {
            let vipCardForWebUser = await this.getVIPCard(webuser);
            if (vipCardForWebUser) {
                vipCardForWebUser.drawed = await this.getVIPCardDrawing(webuser, vipCardForWebUser.coupon);
                this.vipCard = vipCardForWebUser;
            }
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

    // 获取客户相关Post
    getCustomerContent = async (customer: any) => {
        this.pagePost = new QueryPager(
            this.uqs.webBuilder.SearchPostPublish,
            5,
            5
        );
        this.pagePost.first({ key: "" });
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
    createMyCustomer = async (param: any, customerunit: any) => {
        let par = {
            unit: customerunit.id,
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
        customerunit: any,
        newcustomer: number
    ) => {
        let par = {
            unit: customerunit.id,
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
     * 打开客户详细信息显示界面
     */
    showCustomerOrderDetail = async (param: any) => {
        let model = await this.uqs.order.Order.getSheet(param);
        this.openVPage(VCustomerOrderDetail, model);
    };

    /**
     * 查询MyCustomer是否可能被其他销售助手绑定
     */
    checkBinding = async (mycustomer: any): Promise<boolean> => {
        var customerList = await this.uqs.customer.getCustomerByKey.query({
            key: mycustomer.mobile
        });
        var counts: number = 0;
        let { ret } = customerList;
        for (var i = 0; i < ret.length; i++) {
            let { customer } = ret[i];
            let occupyResult = await this.uqs.salesTask.MyCustomerIsOccupy.query(
                customer.id
            );
            let isOccupy = occupyResult.ret[0].code;
            if (isOccupy === 1) {
                counts++;
                break;
            }
        }
        return !(counts === 0);
    };

    pickAddress = async (
        context: Context,
        name: string,
        value: number
    ): Promise<number> => {
        let cAddress = this.newC(CAddress);
        return await cAddress.call<number>();
    };

    showNewCustomerList = () => {
        this.openVPage(VNewCustomerList)
    }

    showCustomerSearchByUnit = async (param: any) => {
        await this.searchCustomerSearchByUnit(param.id.id, "");
        this.openVPage(VCustomerSearchByUnit);
    }

    private getVIPCard = async (webuser: any) => {
        let result = await this.uqs.salesTask.VIPCardForWebUser.obj({ sales: 5, webuser: webuser })
        return result;
    }

    private getVIPCardDrawing = async (webuser: any, coupon: any) => {
        // let result = await this.uqs.webuser.
        return false;
    }

    showCreateVIPCardPage = async (customer: any) => {
        this.openVPage(VCreateVIPCard, customer);
    }

    renderVIPCardTypes = () => {
        let { cVIPCardType } = this.cApp;
        return cVIPCardType.renderVIPCardTypeList();
    }

    render = observer(() => {
        return this.renderView(VCustomerList);
    });

    tab = () => {
        this.searchByKey("");
        this.searchNewMyCustomer();
        return <this.render />;
    };
}
