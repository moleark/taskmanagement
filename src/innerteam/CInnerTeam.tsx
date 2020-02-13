import { CUqBase } from "../CBase";
import { VInnerTeam } from "./VInnerTeam";

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
}
