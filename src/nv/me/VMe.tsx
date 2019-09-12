import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, VPage, nav, Image, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { CMe } from './CMe';
import classNames from 'classnames';

function rowCom(iconName: string, iconColor: string, caption: string, value: any, onClick: any) {
    return <LMR className="cursor-pointer w-100 py-2 my-2 align-items-center  " onClick={onClick}
        left={<FA name={iconName} className={'mr-3 ' + iconColor} fixWidth={true} size="lg" />}
        right={<div className="w-2c text-right" > <i className="fa fa-chevron-right" /></div>}>
        {caption}<span className=" ml-3">{value}</span>
    </LMR>;
}

export class VMe extends VPage<CMe> {
    private user: any;
    private inviteCode: any;
    async open() {
        this.openPage(this.page);
    }

    render(member: any): JSX.Element {
        let { user, inviteCode } = this.controller;
        this.user = user;
        this.inviteCode = inviteCode;
        return <this.page />;
    }

    private userSpan(name: string, nick: string): JSX.Element {
        return nick ?
            <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
            : <b>{name}</b>
    }

    private meInfo() {
        let { user } = this.controller;
        if (user === undefined) return null;
        let { id, name, nick, icon } = user;
        let { showMeDetail, showMessage, showSet } = this.controller;
        let { cMessage } = this.controller.cApp
        let count: any = cMessage.count.get();
        let onshowMeDetail = async () => await showMeDetail();
        let onshowMessage = async () => await showMessage();
        let pointer, badge;
        if (count > 0) {
            pointer = 'cursor-pointer';
            if (count < 100) badge = <u>{count}</u>;
            else badge = <u>99+</u>;
        }

        return <div className="py-2 pt-2 px-3 cursor-pointer w-100 bg-primary text-white">
            <LMR className="my-2" left="我的" right={<span onClick={showSet}>设置</span>}></LMR>
            <LMR
                left={<div onClick={onshowMeDetail}> <Image className="w-3c h-3c mr-3" src={icon} /> </div>}
                right={<div className={classNames('jk-cart ml-1 mr-2', pointer)} onClick={onshowMessage} >

                    <FA className="text-white fa-lg" name="envelope-o" />
                    {badge}
                </div>}>
                <div onClick={onshowMeDetail}>
                    <div>{this.userSpan(name, nick)}</div>
                    <div className="small"><span >邀请码:</span> {this.inviteCode}</div>
                </div>
            </LMR>
        </div>;
    }

    private page = observer(() => {

        let { cSalesTask, cMessage, cCoupon } = this.controller.cApp
        let { showEmployeeHistory } = cSalesTask;
        let { showTeam, showAchievement, achievement } = this.controller;

        let salesAmont: any = achievement[0];
        if (salesAmont == null) {
            salesAmont = { oneSaleVolume: 0, twoSaleVolume: 0, threeSaleVolume: 0, oneAchievement: 0, twoAchievement: 0, threeAchievement: 0 }
        }
        let { oneSaleVolume, twoSaleVolume, threeSaleVolume, oneAchievement, twoAchievement, threeAchievement } = salesAmont;

        let onshowEmployeeHistory = async () => await showEmployeeHistory();
        let onshowTeam = async () => await showTeam();
        let onshowCreateCoupon = async () => await cCoupon.showCreateCoupon()

        let onshowAchievementDetailA = async () => await this.controller.showAchievementDetail("A");
        let onshowAchievementDetailB = async () => await this.controller.showAchievementDetail("B");
        let onshowAchievementDetailC = async () => await this.controller.showAchievementDetail("C");

        let rows: Prop[] = [
            {
                type: 'component',
                component: <LMR className="cursor-pointer w-100 pt-1">
                    {
                        <small>
                            <small>
                                <table className="w-100 text-center">
                                    <tr>
                                        <td onClick={onshowTeam}>
                                            <div className="text-center" onClick={onshowTeam} >
                                                <div>1</div>
                                                <h6><small>&nbsp;&nbsp;&nbsp;&nbsp;团队&nbsp;&nbsp;&nbsp;&nbsp;</small></h6>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-center" >
                                                <div >1</div>
                                                <h6><small>&nbsp;&nbsp;&nbsp;&nbsp;客户&nbsp;&nbsp;&nbsp;&nbsp;</small></h6>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-center"  >
                                                <div >1</div>
                                                <h6><small >活跃客户</small></h6>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </small>
                        </small>
                    }
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                component: <LMR className="cursor-pointer w-100 py-2 my-2 align-items-center  ">
                    {
                        <div className="text-center">
                            <div className="py-4" >
                                <h1 className="text-danger">{oneAchievement + twoAchievement + threeAchievement}</h1>
                                <h6><small>累计收益（元）</small></h6>
                            </div>
                            <table className="w-100">
                                <tr>
                                    <td className="text-danger" onClick={onshowAchievementDetailA}  >
                                        <strong>{oneAchievement}</strong><br />
                                        <h6><small>A（元）</small></h6>
                                    </td>
                                    <td className="text-warning" onClick={onshowAchievementDetailB} >
                                        <strong>{twoAchievement}</strong><br />
                                        <h6><small>B（元）</small></h6>
                                    </td>
                                    <td className="text-info" onClick={onshowAchievementDetailC} >
                                        <strong>{threeAchievement}</strong><br />
                                        <h6><small>C（元）</small></h6>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    }
                </LMR >,
            } as ComponentProp,
            {
                type: 'component',
                component: <LMR className="cursor-pointer w-100 py-2 my-2 px-2 align-items-center  ">
                    {
                        <table className="w-100 ">
                            <tr>
                                <td className="w-4">
                                    <div className="text-center" onClick={onshowCreateCoupon}>
                                        <FA name="th-large" className='text-warning' fixWidth={true} size="lg" />
                                        <br />
                                        <small><small>&nbsp;优惠码&nbsp;</small></small>
                                    </div>
                                </td>
                                <td className="w-4">
                                    <div className="text-center" onClick={onshowEmployeeHistory} >
                                        <FA name="tag" className='text-info' fixWidth={true} size="lg" />
                                        <br />
                                        <small ><small >完成任务</small></small>
                                    </div>
                                </td>
                                <td className="w-4">
                                    <div className="text-center">
                                        <div className="px-4"></div>
                                    </div>
                                </td>
                                <td className="w-4">
                                    <div className="text-center">
                                        <div className="px-4"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    }
                </LMR >,
            } as ComponentProp,
        ];

        return <div className="bg-white">
            {this.meInfo()}
            <PropGrid className="" rows={rows} values={null} alignValue="right" />
        </div>
    })
}