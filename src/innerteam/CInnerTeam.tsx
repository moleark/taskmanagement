import { CUqBase } from "../CBase";
import { VInnerTeam } from "./VInnerTeam";
import { VInnerTeamDetail } from "./VInnerTeamDetail";
import { observable } from "mobx";
import { QueryPager, nav } from "tonva";
import moment from 'moment';
import { VInnerPersonDetail } from "./VInnerPersonDetail";

export class CInnerTeam extends CUqBase {

    //初始化
    private year: any;
    private typeDate: any;
    @observable current: any;
    @observable personDailyAchieve: any[] = [{ date: "", user: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable personDayAchieve: any[] = [{ date: "", user: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable personMonthAchieve: any[] = [{ date: "", user: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable personYearhAchieve: any[] = [{ montha: "", yeara: "", usera: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable teamAchievementDay: any[] = [{ montha: "", yeara: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable teamAchievementMonth: any[] = [{ montha: "", yeara: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable teamAchievementDetail: QueryPager<any>;
    protected async internalStart() {
        await this.searchPersonAchievment()
        await this.searchTeamAchievement()
        await this.searchTeamAchievementPost();
        await this.openVPage(VInnerTeam);
    }

    /**
     * 本人
     */
    searchPersonAchievment = async () => {
        this.year = moment().format('YYYY');
        this.typeDate = moment().format('YYYY-MM-DD');
        let { uqs } = this;
        let { id } = nav.user;
        this.personDailyAchieve = await uqs.salesTask.getPersonDailyAchieve.table({ user: id, date: this.typeDate });
    }

    showUserDetail = async () => {
        this.openVPage(VInnerPersonDetail);
    }

    getPersonAchievment = async (type: any) => {
        switch (type) {
            case 'day':
                await this.getPersonAchievmentDay('')
            case 'month':
                await this.getPersonAchievmentMonth('')
            case 'year':
                await this.getPersonAchievmentYear('')
            default:
                break;
        }
    }
    //搜索我的团队
    searchTeamAchievement = async () => {
        this.year = moment().format('YYYY')
        this.teamAchievementDay = await this.uqs.salesTask.SearchTeamAchievement.table({ _manage: 0, _year: this.year, _type: "day" });
        this.teamAchievementMonth = await this.uqs.salesTask.SearchTeamAchievement.table({ _manage: 0, _year: this.year, _type: "month" });
    };

    showTeamDetail = async (manage: any, year: any, type: any) => {
        this.teamAchievementDetail = new QueryPager(this.uqs.salesTask.SearchTeamAchievementDetail, 15, 30);
        this.teamAchievementDetail.setEachPageItem((item: any, results: { [name: string]: any[] }) => {
            this.cApp.useUser(item.user);
        });
        this.teamAchievementDetail.first({ _manage: 0, _year: year, _type: type });
        this.openVPage(VInnerTeamDetail, type);
    };

    /** 
      * 团队
    **/
    searchTeamAchievementPost = async () => {
        this.year = moment().format('YYYY')
        this.teamAchievementDay = await this.uqs.salesTask.SearchTeamAchievement.table({ _manage: 0, _year: this.year, _type: "day" });
        this.teamAchievementMonth = await this.uqs.salesTask.SearchTeamAchievement.table({ _manage: 0, _year: this.year, _type: "month" });
    };

    getPersonAchievmentDay = async (date: any) => {
        let { uqs } = this;
        let { id } = nav.user;
        if (date) {
            this.personDayAchieve = await uqs.salesTask.getPersonDailyAchieve.table({ user: id, date: date });
        } else
            this.personDayAchieve = await uqs.salesTask.getPersonDailyAchieve.table({ user: id, date: this.typeDate });
    }

    getPersonAchievmentMonth = async (param: any) => {
        let { uqs } = this;
        let { id } = nav.user;
        this.year = moment().format('YYYY')
        let montha = moment().format('M')
        let { month, year } = param
        if (month && year)
            this.personMonthAchieve = await uqs.salesTask.getPersonMonthlyAchieve.table({ user: id, year: year + '', month: month + '' });
        else
            this.personMonthAchieve = await uqs.salesTask.getPersonMonthlyAchieve.table({ user: id, year: this.year, month: montha });
    }

    getPersonAchievmentYear = async (param: any) => {
        let { uqs } = this;
        let { id } = nav.user;
        this.year = moment().format('YYYY')
        let { year } = param
        if (year)
            this.personYearhAchieve = await uqs.salesTask.getPersonYearlyAchieve.table({ user: id, year: year + '' });
        else
            this.personYearhAchieve = await uqs.salesTask.getPersonYearlyAchieve.table({ user: id, year: this.year });

    }
}
