import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, VPage, Image, FA } from 'tonva';
import { CMe } from './CMe';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { observable } from 'mobx';
import { GLOABLE } from 'ui';
/* eslint-disable */
export class VMe extends VPage<CMe> {
    private user: any;
    private inviteCode: any;
    @observable showTips: any = "none"

    async open() {
        this.openPage(this.page);
    }

    render(member: any): JSX.Element {
        let { user, inviteCode } = this.controller;
        this.user = user;
        this.inviteCode = inviteCode;
        this.controller.onComputeAchievement();
        return <this.page />;
    }

    private userSpan(name: string, nick: string): JSX.Element {
        return nick ?
            <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
            : <b>{name}</b>
    }

    copyClick = (e: any) => {
        copy(e.target.parentNode.childNodes[0].data);
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    }

    private meInfo() {
        let { user, showMeDetail, showMessage, showTeam, showMyCustomer, salesAmont } = this.controller;
        if (user === undefined) return null;
        let { name, nick, icon } = user;
        let { cMessage } = this.controller.cApp
        let count: any = cMessage.count.get();
        let onshowMyCustomer = async () => await showMyCustomer(1);
        let onshowMyCustomerActive = async () => await showMyCustomer(2);
        let pointer, badge;
        if (count > 0) {
            pointer = 'cursor-pointer';
            if (count < 100) badge = <u>{count}</u>;
            else badge = <u>99+</u>;
        }

        let { teamCount, customerCount, activeCustomerCount } = salesAmont;
        return <div className="px-4 py-3 cursor-pointer"
            style={{ backgroundColor: '#f9f9f9', width: '90%', borderRadius: '8px', margin: '-4rem auto 2rem auto', boxShadow: "2px 2px 15px #333333" }}>
            <LMR
                left={<div onClick={showMeDetail}> <Image className="w-3c h-3c mr-3" src={icon} /> </div>}
                right={<div className={classNames('jk-cart ml-1 mr-2', pointer)} onClick={showMessage} >
                    <FA className="fa-lg" name="commenting-o" />
                    {badge}
                </div>}>
                <div>
                    <div onClick={showMeDetail}>{this.userSpan(name, nick)}</div>
                    <div className="small"><span className="px-1" >邀请码  :</span><span>{this.inviteCode}<span style={{ border: '1px solid #999999' }} className="px-1 mx-1" onClick={this.copyClick}>复制</span></span ></div>
                </div>
            </LMR>
            <div className="row mt-2">
                <div className="col text-center" onClick={showTeam}>
                    <div>{teamCount}</div>
                    <small><small>团队</small></small>
                </div>
                <div className="col text-center" onClick={onshowMyCustomer}>
                    <div >{customerCount}</div>
                    <small><small>客户</small></small>
                </div>
                <div className="col text-center" onClick={onshowMyCustomerActive}>
                    <div>{activeCustomerCount}</div >
                    <small><small>活跃客户</small></small>
                </div>
            </div>
        </div >;
    }

    private achievement() {
        let { salesAmont } = this.controller;
        let { oneAchievement, twoAchievement, threeAchievement } = salesAmont;
        let divTag = (titel: string, achievement: number, status: number) => <div
            className="cursor-pointer"
            onClick={async () => await this.controller.showAchievementDetail(status)}>
            {achievement <= 0.001 ?
                <div className="h5"> - </div>
                :
                <div className="h5"><strong>{achievement.toFixed(2)}</strong> <span className="h6"><small>元</small></span></div>
            }
            <div className="h6"><small>{titel}</small></div>
        </div>;

        return <div className="text-center text-white bg-primary pt-1 pb-5" style={{ borderRadius: '0  0 5rem 5rem', margin: ' 0 -2rem 0 -2rem ' }}>
            <div className="py-4 cursor-pointer" >
                <div className="text-warning" onClick={async () => await this.controller.showAchievementDetail(0)}>
                    <span className="h1">{(oneAchievement + twoAchievement + threeAchievement).toFixed(2)}</span>
                    <small> 元</small>
                </div>
                <h6 className="text-warning"><small>累计收益</small></h6>
            </div >
            <div className="d-flex justify-content-around">
                {divTag('待到款', (oneAchievement + twoAchievement + threeAchievement), 1)}
                {divTag('可提现', 0, 1)}
            </div>
            <div className="my-4"></div>
        </div>;
    }

    private page = observer(() => {

        let { cSalesTask, cCoupon } = this.controller.cApp
        let { showMyTasksCompleted } = cSalesTask;
        let { showSet } = this.controller;

        let onShowMyTasksCompleted = async () => await showMyTasksCompleted();
        let onshowCreateCoupon = async () => await cCoupon.showCreateCoupon()

        return <div className="bg-white" >
            {this.achievement()}
            {this.meInfo()}

            <div className="text-center text-white small px-2" style={{ width: '28%', margin: '-27px auto 0 auto', padding: '4px', borderRadius: '3px', backgroundColor: '#505050', display: this.showTips }}>已复制到剪切板</div>

            <div className="text-left h6 mx-4"> <strong>我的服务</strong></div>
            <div className="row p-2 cursor-pointer">
                <div className="col text-center" onClick={onshowCreateCoupon}>
                    <FA name="th-large" className='text-warning' fixWidth={true} size="lg" />
                    <br />
                    <small><small>优惠券</small></small>
                </div>
                <div className="col text-center" onClick={onShowMyTasksCompleted} >
                    <FA name="tag" className='text-info' fixWidth={true} size="lg" />
                    <br />
                    <small><small>完成任务</small></small>
                </div>
                <div className="col text-center" onClick={showSet} >
                    <FA name="cog" className='text-info' fixWidth={true} size="lg" />
                    <br />
                    <small><small>设置</small></small>
                </div>
            </div>
        </div >
    })
}