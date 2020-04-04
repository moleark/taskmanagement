import { CUqBase } from "../CBase";
import { VInnerTeam } from "./VInnerTeam";
import { VInnerTeamDetail } from "./VInnerTeamDetail";
import { observable } from "mobx";

export class CInnerTeam extends CUqBase {

    //初始化
    @observable current: any;
    @observable teamAchievement: any;
    @observable teamList: any;
    protected async internalStart() {
        this.teamList = await this.searchTeam();
        let team = await this.uqs.salesTask.SearchTeamAchievement.table({});
        this.teamAchievement = team[0];
        this.openVPage(VInnerTeam);
    }

    //搜索我的团队
    searchTeam = async () => {
        let team = await this.uqs.salesTask.SearchSubordinate.table({});
        return team;
    };

    showTeamDetail = async (param: any) => {
        let { webuser } = param;
        let query = { user: webuser.id };
        this.current = await this.uqs.salesTask.SearchAchievement.obj(query);
        let taskHistory = await this.uqs.salesTask.SearchTaskHistoryCount.table({});
        if (taskHistory.length > 0) {
            this.current.counts = taskHistory[0].counts;
        }
        this.openVPage(VInnerTeamDetail);
    };
}
