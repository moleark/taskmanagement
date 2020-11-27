import * as React from 'react';
import { Page, VPage, FA, LMR } from 'tonva';
import { CHome } from './CHome';
import { VSiteHeader } from './VSiteHeader';
import { VSlider } from './VSlider';
import { observer } from "mobx-react";
import { observable } from 'mobx';

export class VHome extends VPage<CHome> {
    @observable showTips: any = "";

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.pageContent />
    }

    private page = observer(() => {
        return <Page header={false}>
            <this.pageContent />
        </Page>;
    });

    private pageContent = observer(() => {

        let { cApp, showPromotion } = this.controller
        let { cCoupon, cMe, cOrder } = cApp;
        let { showTeam, showInvitationCode } = cMe;
        let { orderMangement } = cOrder
        let siteHeader = this.renderVm(VSiteHeader);

        let onshowInvitationCode = async () => {
            let code = await cMe.getMyPositionCode();
            let inviteCode = code.substr(1, 9);
            showInvitationCode(inviteCode);
        }

        let commonfuncs = <div className="mt-1 mb-2 bg-white">
            <div className="d-flex py-2 pl-2" style={{ borderBottom: '1px solid #ccc' }}>常用功能</div>
            <div className="d-flex justify-content-around small text-center">
                <div className="m-1 p-3 cursor-pointer" onClick={() => cCoupon.showCreateCoupon({ type: "coupon", product: undefined })}>
                    <div className="py-3 my-1">
                        <div className="mb-2"><i style={{ fontSize: '2rem', color: "#f6ad15" }} className="iconfont icon-youhuiquantuangou"></i></div>
                        <div className="mx-3 p-2 font-weight-bold">优惠券</div>
                    </div>
                </div>

                <div className="m-1 p-3 cursor-pointer" onClick={onshowInvitationCode} >
                    <div className="py-3 my-1 ">
                        <div className="mb-2 text-primary" style={{ fontSize: '2rem' }}><FA name="qrcode" />
                        </div>
                        <div className="mx-3 px-2 font-weight-bold">邀请码</div>
                    </div>
                </div>

                <div className="m-1 p-3 cursor-pointer" onClick={showTeam} >
                    <div className="py-3 my-1 ">
                        <div className="mb-2"><i style={{ fontSize: '2rem', color: '#00CED1' }} className="iconfont icon-photo"></i></div>
                        <div className="mx-3 px-2 font-weight-bold">团队</div>
                    </div>
                </div>
                <div className="m-1 p-3 cursor-pointer" onClick={orderMangement} >
                    <div className="py-3 my-1 ">
                        <div className="mb-2 text-success"><i style={{ fontSize: '2rem' }} className="iconfont icon-kejian-zimulu"></i></div>
                        <div className="mx-3 px-2 font-weight-bold">订单管理</div>
                    </div>
                </div>
            </div>
        </div>

        let promotions = <div>
            <div className="bg-white px-1 py-1 d-flex w-100" style={{ borderBottom: '1px solid #ccc' }}>
                <span className="px-2 w-4c text-danger" style={{ borderRight: '1px dotted #ccc' }}>特惠活动</span>
                <span className="ml-4 small text-muted align-self-end pb-1">极具吸引力的价格，快速绑定客户</span>
            </div>
            <div className="w-100 small" >
                <LMR className="bg-white py-3 px-2 mb-1" right={<i className=" iconfont icon-fangxiang1"></i>} onClick={() => showPromotion('', 32)}>
                    <div className="pl-2">百灵威一级标准品 现货优惠活动中</div>
                </LMR>
                <LMR className="bg-white py-3 px-2 mb-1" right={<i className=" iconfont icon-fangxiang1"></i>} onClick={() => showPromotion('', 35)}>
                    <div className="pl-2">百灵威四大产品线4折起，优品好价“购”不停</div>
                </LMR>
            </div>
        </div>

        return <>
            {siteHeader}
            <div className="mb-3">
                {this.renderVm(VSlider)}
            </div>
            {commonfuncs}
            {promotions}
        </>
    })
}

