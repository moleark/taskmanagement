import { CUqBase } from "../CBase";
import { VInnerTeam } from "./VInnerTeam";
import { VInnerTeamDetail } from "./VInnerTeamDetail";
import { observable } from "mobx";
import { QueryPager } from "tonva";
import moment from 'moment'

export class CInnerTeam extends CUqBase {

    //初始化
    private year: any
    @observable current: any;
    @observable teamAchievementDay: any[] = [{ montha: "", yeara: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable teamAchievementMonth: any[] = [{ montha: "", yeara: "", endTaskCount: 0, sendCreditsCount: 0, sendPostCount: 0, orderCount: 0, saleVolume: 0 }];
    @observable teamAchievementDetail: QueryPager<any>;
    protected async internalStart() {
        await this.searchTeamAchievement();
        this.openVPage(VInnerTeam);
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
}
