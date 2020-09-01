import { CUqBase } from "../CBase";
import { VInnerTeam } from "./VInnerTeam";
import { VInnerTeamDetail } from "./VInnerTeamDetail";
import { observable } from "mobx";
import { QueryPager } from "tonva";
import moment from 'moment'
import { VTeamAchievementDetail } from "./VTeamAchievementDetail";
import { VTeamAchievementMonDetail } from "./VTeamAchievementMonDetail";

export class CInnerTeam extends CUqBase {

    //初始化
    private year: any
    @observable current: any;
    @observable teamAchievementDay: any[] = [{ montha: "", yeara: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable teamAchievementMonth: any[] = [{ montha: "", yeara: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable teamAchievementDetail: QueryPager<any>;

    @observable teamAchievementDays: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementMonthchart: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementdayDetail: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementMonDetail: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0 }];
    @observable teamAchievementlist: any[] = [{ month: "", year: "", postPubSum: 0, postTranSum: 0, postHitSum: 0, name: '' }];
    protected async internalStart() {
        await this.searchTeamAchievement()
        await this.showTeamAchievement();
        await this.searchTeamAchievementPost();
        await this.getteamAchievementdayDetail();
        await this.openVPage(VInnerTeam);
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
      * **/
    searchTeamAchievementPost = async () => {
        this.year = moment().format('YYYY')
        this.teamAchievementDay = await this.uqs.salesTask.SearchTeamAchievement.table({ _manage: 0, _year: this.year, _type: "day" });
        this.teamAchievementMonth = await this.uqs.salesTask.SearchTeamAchievement.table({ _manage: 0, _year: this.year, _type: "month" });
    };

    showTeamAchievement = async () => {
        this.year = moment().format('YYYY')
        this.teamAchievementDays = await this.uqs.webBuilder.SearchAchievementOfTeamNew.table({ _manage: 0, _year: this.year, _type: "day" });
        this.teamAchievementMonthchart = await this.uqs.webBuilder.SearchAchievementOfTeamNew.table({ _manage: 0, _year: this.year, _type: "month" });
    }
    /**
 * 日报详细
 */
    getteamAchievementdayDetail = async () => {
        this.year = moment().format('YYYY')
        this.teamAchievementdayDetail = await this.uqs.webBuilder.SearchAchievementOfTeamDetail.table({ _manage: 0, _year: this.year, _month: '', _type: "day" });
        this.teamAchievementdayDetail.forEach(element => {
            this.cApp.useUser(element.author);
        });
        this.teamAchievementlist = this.teamAchievementdayDetail.map(element => {
            const obj = { ...element }
            if (element.author && element.author.id) {
                obj.name = this.cApp.renderUser(element.author.id);
            }
            return obj
        })
    }
    showTeamAchievementDetail = async () => {
        await this.getteamAchievementdayDetail()
        await this.openVPage(VTeamAchievementDetail)
    }

    /**  
     * 月报详细
     */
    showTeamAchievementMonDetail = async (param: any) => {
        this.year = moment().format('YYYY')
        this.teamAchievementMonDetail = await this.uqs.webBuilder.SearchAchievementOfTeamDetail.table({ _manage: 0, _type: "month", _year: this.year, _month: param });
        this.teamAchievementMonDetail.forEach(v => {
            this.cApp.useUser(v.author);
        });
        this.openVPage(VTeamAchievementMonDetail, param)
    }

}
