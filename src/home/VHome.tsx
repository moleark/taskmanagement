import * as React from 'react';
import { Page, VPage, FA, LMR } from 'tonva';
import { CHome } from './CHome';
import { VSiteHeader } from './VSiteHeader';
import { VSlider } from './VSlider';
// import { setting } from "appConfig";
import { observer } from "mobx-react";
import { observable } from 'mobx';
// import { ProductImage } from 'tools/productImage';

export class VHome extends VPage<CHome> {
    @observable showTips: any = "";
    private inviteCode: any;

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
    // private hiddenSow = () => {
    //     this.showTips = "none";
    // }

    private pageContent = observer(() => {
        let { cApp, showPromotion } = this.controller
        let { cCoupon, cMe } = cApp;
        let { showTeam, showInvitationCode } = cMe;
        let { inviteCode } = cMe;
        this.inviteCode = inviteCode.substr(1, 9);
        let siteHeader = this.renderVm(VSiteHeader);

        let onshowInvitationCode = async () => {
            // await cMe.load()
            await showInvitationCode(this.inviteCode);
        }

        let commonfuncs = <div className="mt-1 mb-2" style={{ position: 'relative', background: 'white' }}>
            {/* <div className=" text-center text-muted  w-100 small" style={{ position: 'absolute', left: ' 50 %', top: '-.7rem', background: '#FFFF91', opacity: '.6', display: this.showTips }}>
                可以分享优惠券，邀请码
				<span className=" text-danger float-right cursor-pointer" style={{ marginTop: '-.5rem' }} onClick={this.hiddenSow}>
                    <i style={{ fontSize: '1rem' }} className="iconfont icon-shanchu"></i></span>
            </div> */}
            <div className="d-flex py-1 pl-2" style={{ borderBottom: '1px solid #ccc' }}> 常用功能  </div>
            <div className="d-flex justify-content-around small text-center" >
                <div className="m-1 p-3 cursor-pointer" onClick={() => cCoupon.showCreateCoupon({ type: "coupon", product: undefined })}  >
                    <div className="py-3 my-1">
                        <div className="mb-2"><i style={{ fontSize: '2rem', color: "#f6ad15" }} className="iconfont icon-youhuiquantuangou"></i></div>
                        <div className="mx-3 p-2 font-weight-bold">优惠券</div>
                    </div>
                </div>
                <div className="m-1 p-3 cursor-pointer" onClick={onshowInvitationCode} >
                    <div className="py-3 my-1 ">
                        <div className="mb-2 text-primary" style={{ fontSize: '2rem' }}><FA className="" name="qrcode" />
                        </div>
                        <div className="mx-3 px-2 font-weight-bold">邀请码</div>
                    </div>

                </div>
                <div className="m-1 p-3 cursor-pointer" onClick={showTeam} >
                    <div className="py-3 my-1 ">
                        <div className="mb-2"><i style={{ fontSize: '2rem', color: '#00CED1' }} className="iconfont icon-photo "></i></div>
                        <div className="mx-3 px-2 font-weight-bold">团队</div>
                    </div>
                </div>
            </div>
        </div>

        let promotions = <div className="" style={{ background: "white" }}>
            <div className="px-1 py-1 d-flex w-100" style={{ borderBottom: '1px solid #ccc' }}>
                <span className="px-2" style={{ borderRight: '1px dotted #ccc' }}>特惠活动</span>
                <div className="mx-3 small text-muted pt-2">优惠活动，分享其优惠券可以快速的帮助绑定客户，增加客户源</div>
            </div>
            <div className="d-flex flex-column w-100 small py-1" >
                <LMR className=" my-3 px-2" right={<i className=" iconfont icon-fangxiang1"></i>} onClick={() => showPromotion(32)}>
                    <div className="pl-2">百灵威一级标准品 现货优惠活动中</div>
                </LMR>
                <div style={{ height: '3px', background: '#eee' }}></div>
                <LMR className=" my-3 px-2 pt-1" right={<i className=" iconfont icon-fangxiang1"></i>} onClick={() => showPromotion(35)}>
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

