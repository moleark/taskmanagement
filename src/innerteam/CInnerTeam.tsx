import { CUqBase } from "../CBase";
import { VInnerTeam } from "./VInnerTeam";
import { VInnerTeamDetail, VInnerTeamMemberYearly } from "./VInnerTeamDetail";
import { observable } from "mobx";
import { QueryPager, nav } from "tonva";
import moment from 'moment';
import { VInnerPersonDetail } from "./VInnerPersonDetail";
import { VInnerTeamDailyDetail } from "./VInnerTeamDailyDetail";

export class CInnerTeam extends CUqBase {

    //初始化
    @observable myTodayAchievement: any[];
    @observable myDailyAchievement: any[];
    @observable personMonthAchieve: any[];
    @observable personYearhAchieve: any[];
    @observable teamAchievementDay: any[];
    @observable teamAchievementYear: any[];

    @observable teamDailyDetail: any[];
    @observable teamAchievementMonthDetail: any[];
    @observable teamMemberYearlyDetail: any[];
    private date: any;

    protected async internalStart() {

        this.date = moment().format('YYYY-MM-DD');
        this.myTodayAchievement = await this.searchPersonAchievment(moment().format('YYYY-MM-DD'));

        await this.searchTeamAchievementDay({ team: 0, date: this.date });

        let thisYear = moment().format('YYYY')
        await this.searchTeamAchievementYear(thisYear);
        await this.openVPage(VInnerTeam, thisYear);
    }

    showUserDetail = async (date) => {
        this.openVPage(VInnerPersonDetail, date);
    }

    /**
     * 
     * @param type 
     */
    getPersonAchievment = async (type: any) => {
        switch (type) {
            case 'day':
                this.myDailyAchievement = await this.searchPersonAchievment(moment().format("YYYY-MM-DD"));
            case 'month':
                await this.getPersonAchievmentMonth({ month: moment().format('M'), year: moment().format('YYYY') });
            case 'year':
                await this.getPersonAchievmentYear(moment().format('YYYY'));
            default:
                break;
        }
    }

    /**
     * 我的每天工作量
    */
    searchPersonAchievment = async (date) => {
        let { uqs } = this;
        let { id } = nav.user;
        return await uqs.salesTask.getPersonDailyAchieve.table({ user: id, date: date });
    }

    /**
     * 我的每个月工作量
    */
    getPersonAchievmentMonth = async (param: any) => {
        let { uqs } = this;
        let { id } = nav.user;
        let { month, year } = param;
        this.personMonthAchieve = await uqs.salesTask.getPersonMonthlyAchieve.table({ user: id, year: year, month: month });
    }

    /**
     * 我的每年的工作量
    */
    getPersonAchievmentYear = async (year: any) => {
        let { uqs } = this;
        let { id } = nav.user;
        this.personYearhAchieve = await uqs.salesTask.getPersonYearlyAchieve.table({ user: id, year: year });
    }

    /**
     *团队所有人每天汇总
    */
    searchTeamAchievementDay = async (param) => {
        let { uqs, cApp } = this;
        let { team, date } = param
        let nowDate = dateFormat(date);
        if (date === this.date) {
            this.teamAchievementDay = await uqs.salesTask.getTeamDailyAchieve.table({ team: team, date: this.date });
            this.teamAchievementDay.forEach(e => {
                cApp.useUser(e.user);
            });
        } else {
            this.teamDailyDetail = await uqs.salesTask.getTeamDailyAchieve.table({ team: team, date: nowDate });
            this.teamDailyDetail.forEach(e => {
                cApp.useUser(e.user);
            });
        }
    }

    showTeamDailyDetail = async (param: any) => {
        let { team, date } = param;
        await this.searchTeamAchievementDay(param);
        this.openVPage(VInnerTeamDailyDetail, date);
    };

    /**
     * 团队某年按月汇总量
    */
    searchTeamAchievementYear = async (year: any) => {
        this.teamAchievementYear = await this.uqs.salesTask.getTeamYearlyAchieve.table({ team: 0, year: year });
    }

    /**
     * 团队某年某月每人汇总量
    */
    getTeamMonthDetail = async (param) => {
        let { uqs, cApp } = this;
        let { yeara, montha } = param;
        this.teamAchievementMonthDetail = await uqs.salesTask.getTeamMonthlyAchieve.table({ team: 0, year: yeara, month: montha });
        this.teamAchievementMonthDetail.forEach(e => {
            cApp.useUser(e.usera);
        });
    }

    showTeamDetail = async (yeara: any, montha: any) => {
        await this.getTeamMonthDetail({ yeara, montha })
        this.openVPage(VInnerTeamDetail, { montha, yeara });
    };

    /**
     * 团队每年每人汇总
    */
    getTeamMemberYearlyAchieve = async (yeara: any) => {
        let { uqs, cApp } = this;
        this.teamMemberYearlyDetail = await uqs.salesTask.getTeamMemberYearlyAchieve.table({ team: 0, year: yeara });
        this.teamMemberYearlyDetail.forEach(e => {
            cApp.useUser(e.usera);
        });
    };

    showTeamMemberYearlyAchieve = async (yeara: any) => {
        await this.getTeamMemberYearlyAchieve(yeara)
        this.openVPage(VInnerTeamMemberYearly, yeara);
    };
}

function dateFormat(dateData) {
    let date = new Date(dateData)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    let month = m < 10 ? ('0' + m) : m
    let day = d < 10 ? ('0' + d) : d
    const time = y + '-' + month + '-' + day
    return time
}