import { CUqBase } from "../CBase";
import { VInnerTeam } from "./VInnerTeam";
import { VInnerTeamDetail } from "./VInnerTeamDetail";

export class CInnerTeam extends CUqBase {
    //初始化
    protected async internalStart() {
        let team = await this.searchTeam();
        this.openVPage(VInnerTeam, team);
    }

    //搜索我的团队
    searchTeam = async () => {
        let team = await this.uqs.salesTask.SearchSubordinate.table({});
        return team;
    };

    showTeamDetail = async (param: any) => {
        let { webuser } = param;
        let query = { user: webuser.id };
        let result = await this.uqs.salesTask.SearchAchievement.obj(query);
        this.openVPage(VInnerTeamDetail, result);
    };
}
