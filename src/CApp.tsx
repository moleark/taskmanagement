import * as React from 'react';
import { CAppBase, IConstructor, UserCache } from "tonva";
import { CSalesTask } from "./salestask";
import { CCustomer } from "./customer/CCustomer";
import { CProduct } from "./product/CProduct";
import { CMe } from "./me/CMe";
import { CStart } from "./start/CStart";
import { CTeam } from "./team/CTeam";
import { CMessage } from "./message/CMessage";
import { CCustomerUnit } from "./customerunit/CCustomerUnit";
import { CCoupon } from "./coupon/CCoupon";
import { CVIPCardType } from "./vipCardType/CVIPCardType";
import { CInnerCustomer } from "./innercustomer/CInnerCustomer";
import { CHome } from './home/CHome'

import { UQs } from "./uqs";
import { CUqBase } from "./CBase";
import { VMain, GLOABLE } from "./ui";
import { ProductCart } from "model/productcart";
import { CBalance } from "achievement/CBalance";
import { setting } from "appConfig";
import { CPost } from "post/CPost";
import { PostCustomer } from "post/postcustomer";
import { CInnerTeam } from "innerteam/CInnerTeam";
import { observer } from "mobx-react";

import { WebUser } from "./CurrentUser";
import { CWebUser } from 'webuser/CWebUser';

/* eslint-disable */

export class CApp extends CAppBase {
    // topKey: any;
    get uqs(): UQs {
        return this._uqs;
    }

    currentSalesRegion: any;
    currentLanguage: any;
    productCart: ProductCart;
    postCustomer: PostCustomer;
    currentUser: WebUser;
    /** 定义 Conctorlle*/
    cSalesTask: CSalesTask;
    cCustomer: CCustomer;
    cProduct: CProduct;
    cMe: CMe;
    cTeam: CTeam;
    cInnerTeam: CInnerTeam;
    cStart: CStart;
    cMessage: CMessage;
    cCustomerUnit: CCustomerUnit;
    cCoupon: CCoupon;
    cInnerCustomer: CInnerCustomer;
    cBalance: CBalance;
    cPost: CPost;
    cHome: CHome;
    cWebUser: CWebUser;


    cVIPCardType: CVIPCardType;

    private userCache: UserCache<any>;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        /*
        //根据网址判断是什么APP
        if (isAssist) {
            setting.sales = new AssistSales(this);
        } else {
            setting.sales = new AgentSales(this);
        }
        */
        setting.sales.setCApp(this); // = IsAssistApp ? new AssistApp(this) : new AgentApp(this);

        let { SALESREGION_CN, CHINESE } = GLOABLE;
        this.currentSalesRegion = await this.uqs.common.SalesRegion.load(
            SALESREGION_CN
        );
        this.currentLanguage = await this.uqs.common.Language.load(
            CHINESE
        );


        let userLoader = async (userId: number): Promise<any> => {
            let model = await this.uqs.hr.SearchEmployeeByid.query({ _id: userId });
            return model.ret[0];
        }
        this.userCache = new UserCache(userLoader);

        this.productCart = new ProductCart();
        this.postCustomer = new PostCustomer();

        this.cCustomer = this.newC(CCustomer);
        this.cProduct = this.newC(CProduct);
        this.cSalesTask = this.newC(CSalesTask);
        this.cMe = this.newC(CMe);
        this.cTeam = this.newC(CTeam);
        this.cInnerTeam = this.newC(CInnerTeam);
        this.cStart = this.newC(CStart);
        this.cMessage = this.newC(CMessage);
        this.cCustomerUnit = this.newC(CCustomerUnit);
        this.cCoupon = this.newC(CCoupon);
        this.cInnerCustomer = this.newC(CInnerCustomer);
        this.cBalance = this.newC(CBalance);
        this.cPost = this.newC(CPost);
        this.cVIPCardType = this.newC(CVIPCardType);
        this.cHome = this.newC(CHome);
        this.cWebUser = this.newC(CWebUser);

        // this.cProduce = this.newC(CProduce);
        /** 启动销售任务列表*/
        // this.cSalesTask.start();

        /**计算业绩**/
        //await this.cMe.onComputeAchievement();

        //加载轮播图
        await this.cHome.getSlideShow();
        //显示主页面
        this.showMain();
        let user = await this.uqs.webuser.WebUser.load(47);

    }

    async showMain() {
        let hasQualification: boolean = false;
        let { salesTask } = this.uqs;
        if (GLOABLE.IsAssistApp) {
            let result = await salesTask.WebUserEmployeeMap.obj({ webuser: this.user.id });
            if (result !== undefined) {
                hasQualification = true;
            }
        } else {
            let result = await salesTask.SearchPosition.obj({ position: undefined });
            if (result !== undefined) {
                hasQualification = true;
            }
        }

        if (hasQualification) {
            this.openVPage(VMain);
        } else {
            this.cStart.start();
        }
    }

    renderUser(userId: number) {
        return <this._renderUser userId={userId} />;
    }

    private _renderUser = observer((props: { userId: number }): JSX.Element => {
        let { userId } = props;
        let val = this.userCache.getValue(userId);
        switch (typeof val) {
            case 'undefined':
            case 'number':
                return <span className="author" > {userId} </span>
        };
        return <span className="author" > {val.name} </span>;
    });

    useUser(userId: number) {
        this.userCache.use(userId);
    }
}
