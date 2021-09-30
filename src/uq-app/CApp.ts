import { VMain } from "./VMain";
import { setUI } from "./uqs";
import { CUqApp } from "uq-app";
import { CHome } from "home/CHome";
import { CProduct } from "product";
import { Cart } from "cart/Cart";
import { ProductCart } from "model/productcart";
import { PostCustomer } from "post/postcustomer";
import { WebUser } from "CurrentUser";
import { CSalesTask } from "salestask";
import { CCustomer } from "customer/CCustomer";
import { CMe } from "me/CMe";
import { CTeam } from "team/CTeam";
import { CInnerTeam } from "innerteam/CInnerTeam";
import { CStart } from "start";
import { CMessage } from "message/CMessage";
import { CCustomerUnit } from "customerunit/CCustomerUnit";
import { CCoupon } from "coupon/CCoupon";
import { CInnerCustomer } from "innercustomer/CInnerCustomer";
import { CBalance } from "achievement/CBalance";
import { CPost } from "post/CPost";
import { CWebUser } from "webuser/CWebUser";
import { COrder } from "order/COrder";
import { CCart } from "cart/CCart";
import { CVIPCardType } from "vipCardType/CVIPCardType";
import { UserCache } from "tonva-react";
import { appSettings } from "appConfig";
import { GLOABLE } from "ui";

const gaps = [10, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 30, 30, 60];

export class CApp extends CUqApp {

    currentMyCustomer: any;
    cHome: CHome;
    cart: Cart;
    currentSalesRegion: any;
    currentLanguage: any;
    productCart: ProductCart;
    postCustomer: PostCustomer;
    currentUser: WebUser;

    /** 定义 Conctorlle*/
    cSalesTask: CSalesTask;
    cCustomer: CCustomer;
    cMe: CMe;
    cTeam: CTeam;
    cInnerTeam: CInnerTeam;
    cStart: CStart;
    cMessage: CMessage;
    cProduct: CProduct;
    cCustomerUnit: CCustomerUnit;
    cCoupon: CCoupon;
    cInnerCustomer: CInnerCustomer;
    cBalance: CBalance;
    cPost: CPost;
    cWebUser: CWebUser;
    cOrder: COrder;
    cCart: CCart;

    cVIPCardType: CVIPCardType;

    private userCache: UserCache<any>;

    private setUser() {
        this.currentUser = new WebUser(this.uqs);
        if (this.isLogined) {
            this.currentUser.setUser(this.user);
        }
    }

    protected async internalStart(isUserLogin: boolean) {
        setUI(this.uqs);
        appSettings.setCApp(this);

        let { SALESREGION_CN, CHINESE } = GLOABLE;
        this.currentSalesRegion = await this.uqs.common.SalesRegion.load(
            SALESREGION_CN
        );
        this.currentLanguage = await this.uqs.common.Language.load(
            CHINESE
        );
        this.setUser();

        let userLoader = async (userId: number): Promise<any> => {
            let { salesTask, hr } = this.uqs;
            let employeeMap = await salesTask.WebUserEmployeeMap.obj({ webuser: userId });
            if (employeeMap) {
                let model = await hr.Employee.load(employeeMap.employee);
                return model;
            }
        }
        this.cart = new Cart(this);
        this.userCache = new UserCache(userLoader);

        this.productCart = new ProductCart();
        this.postCustomer = new PostCustomer();

        this.cHome = this.newC(CHome);
        this.cProduct = this.newC(CProduct);

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
        this.cOrder = this.newC(COrder);
        this.cCart = this.newC(CCart);

        //加载轮播图
        await this.cHome.getSlideShow();
        //显示主页面
        this.showMain();

        // this.openVPage(VMain, undefined, this.dispose);
        // 加上下面一句，可以实现主动页面刷新
        // this.timer = setInterval(this.callTick, 1000);
        // uq 里面加入这一句，会让相应的$Poked查询返回poke=1：
        // TUID [$User] ID (member) SET poke=1;
    }

    async showMain() {
        let hasQualification: boolean = await appSettings.userQualified();
        if (hasQualification) {
            this.openVPage(VMain);
        } else {
            this.cStart.start();
        }
    }

    private timer: any;
    protected onDispose() {
        clearInterval(this.timer);
        this.timer = undefined;
    }

    private tick = 0;
    private gapIndex = 0;
    private callTick = async () => {
        try {
            if (!this.user) return;
            ++this.tick;
            if (this.tick < gaps[this.gapIndex]) return;
            //console.error('tick ', new Date());
            this.tick = 0;
            if (this.gapIndex < gaps.length - 1) ++this.gapIndex;
            let ret: any; // await this.uqs.BzHelloTonva.$poked.query(undefined, false);
            let v = ret.ret[0];
            if (v === undefined) return;
            if (!v.poke) return;
            this.gapIndex = 1;

            // 数据服务器提醒客户端刷新，下面代码重新调入的数据
            //this.cHome.refresh();
        }
        catch {
        }
    }

    renderUser(userId: number) {
        let val = this.userCache.getValue(userId);
        switch (typeof val) {
            case 'undefined':
            case 'number':
                return userId;
        };
        return val.name;
    }

    useUser(userId: number) {
        this.userCache.use(userId);
    }
}