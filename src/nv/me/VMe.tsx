import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, VPage, nav, Image, ComponentProp, Prop, PropGrid, FA } from 'tonva';
import { CMe } from './CMe';
import classNames from 'classnames';
//import wer from '../images/wer.jpg';

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
    private salesAmont: any;

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

        let { teamCount, customerCount, activeCustomerCount } = this.salesAmont;
        return <div className="toggle cursor-pointer px-2 py-2 w-100"
            style={{ backgroundColor: '#f0f0f0', marginRight: '-1px', marginBottom: '-1px' }}>
            <LMR
                left={<div onClick={onshowMeDetail}> <Image className="w-3c h-3c mr-3" src={icon} /> </div>}
                right={<div className={classNames('jk-cart ml-1 mr-2', pointer)} onClick={onshowMessage} >
                    <FA className="fa-lg" name="envelope-o" />
                    {badge}
                </div>}>
                <div onClick={onshowMeDetail} className="  " >
                    <div>{this.userSpan(name, nick)}</div>
                    <div className="small"><span >邀请码:</span> {this.inviteCode}</div>
                </div>
            </LMR>
            <LMR className="cursor-pointer w-100 pt-1">
                {
                    <table className="w-100 text-center">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="text-center" >
                                        <div>{teamCount}</div>
                                        <small><small><small>&nbsp;&nbsp;&nbsp;&nbsp;团队&nbsp;&nbsp;&nbsp;&nbsp;</small></small></small>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-center" >
                                        <div >{customerCount}</div>
                                        <small><small><small>&nbsp;&nbsp;&nbsp;&nbsp;客户&nbsp;&nbsp;&nbsp;&nbsp;</small></small></small>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-center"  >
                                        <div >{activeCustomerCount}</div>
                                        <small><small><small>活跃客户</small></small></small>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </LMR >
        </div>;
    }

    private achievement() {

        let { oneAchievement, twoAchievement, threeAchievement } = this.salesAmont;
        let divTag = (t: string, achievement: number) => <div
            className="cursor-pointer"
            onClick={async () => await this.controller.showAchievementDetail(t)}>
            {achievement <= 0.001 ?
                <div className="h5"> - </div>
                :
                <div className="h5"><strong>{achievement}</strong> <span className="h6"><small>元</small></span></div>
            }
            <div className="h6"><small>{t}类收益</small></div>
        </div>;

        return <div className="toggle rounded text-center text-white bg-primary pt-5 pb-3">
            <div className="py-4" >
                <div className="text-warning">
                    <span className="h1">{oneAchievement + twoAchievement + threeAchievement}</span>
                    <small> 元</small>
                </div>
                <h6 className="text-warning"><small>累计收益</small></h6>
            </div>
            <div className="d-flex justify-content-around">
                {divTag('A', oneAchievement)}
                {divTag('B', twoAchievement)}
                {divTag('C', threeAchievement)}
            </div>
        </div>;
    }

    private page = observer(() => {

        let { cSalesTask, cMessage, cCoupon } = this.controller.cApp
        let { showEmployeeHistory } = cSalesTask;
        let { showTeam, showAchievement, achievement, showSet } = this.controller;

        this.salesAmont = achievement[0];
        if (this.salesAmont == null) {
            this.salesAmont = { oneSaleVolume: 0, twoSaleVolume: 0, threeSaleVolume: 0, oneAchievement: 0, twoAchievement: 0, threeAchievement: 0, teamCount: 0, customerCount: 0, activeCustomerCount: 0 }
        }

        let onshowEmployeeHistory = async () => await showEmployeeHistory();
        let onshowTeam = async () => await showTeam();
        let onshowCreateCoupon = async () => await cCoupon.showCreateCoupon()

        let rows: Prop[] = [
            {
                type: 'component',
                component: <LMR className="cursor-pointer w-100 py-2 my-2 ">
                    {
                        <table className="w-100 ">
                            <tbody>
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
                                            <small><small >完成任务</small></small>
                                        </div>
                                    </td>
                                    <td className="w-4">
                                        <div className="text-center" onClick={onshowTeam} >
                                            <FA name="sitemap" className='text-info' fixWidth={true} size="lg" />
                                            <br />
                                            <small><small>&nbsp;&nbsp;团队&nbsp;&nbsp;</small></small>
                                        </div>
                                    </td>
                                    <td className="w-4">
                                        <div className="text-center" onClick={showSet} >
                                            <FA name="cog" className='text-info' fixWidth={true} size="lg" />
                                            <br />
                                            <small><small>&nbsp;&nbsp;设置&nbsp;&nbsp;</small></small>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </LMR >,
            } as ComponentProp,
        ];
        //style={{ backgroundImage: `url(${wer})`, marginRight: '-1px', marginBottom: '-1px' }}
        return <div className="bg-white" >
            {this.achievement()}
            {this.meInfo()}
            <PropGrid className="" rows={rows} values={null} alignValue="right" />
        </div >
    })
}