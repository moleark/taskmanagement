import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, Image } from 'tonva';
import { CCoupon } from './CCoupon';
import copy from 'copy-to-clipboard';
import { observable } from 'mobx';
import { GLOABLE } from 'ui';
import { setting } from 'appConfig';
import QRCode from 'qrcode.react';

export class VCreateCouponEnd extends VPage<CCoupon> {

    private code: string
    @observable showTips: any = "none"

    async open(code: string) {
        this.code = code;
        this.openPage(this.page);
    }
    comeBack = () => {
        this.closePage(2);
    }

    copyClick = (e: any) => {
        copy(e.target.parentNode.childNodes[0].innerHTML)
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    }

    share = async (url: any) => {
        let content = " 通过此券最高可以享两倍积分优惠哦！";
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore  屏蔽错误 
            window.plusShare({
                title: "专享折扣券",//应用名字  
                content: content,
                href: url,//分享出去后，点击跳转地址 
                //pictures: ["https://agent.jkchemical.com/logonew.png"],//分享的图片
                thumbs: ["https://agent.jkchemical.com/logonew.png"] //分享缩略图  
            }, function (result) {
                //分享回调  
            });
        }
    }

    private page = observer(() => {
        var inviteCode = "";
        if (this.code) {
            this.code = String(this.code);
            let p1 = this.code.substr(0, 4);
            let p2 = this.code.substr(4);
            inviteCode = p1 + ' ' + p2;
        }

        let url = setting.url + "?type=invitation&code=" + this.code;
        let onshare = () => this.share(url);
        let share = <div className="text-center" style={{ width: 'auto', height: '10%' }} >
        </div>;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            share = <div className="text-center" style={{ width: 'auto', height: '10%' }} >
                <button type="button" id="share" className="btn text-info mx-3 my-1" onClick={onshare} >分享</button>
            </div>;
        }

        let header = setting.isInnerSales ? "积分券" : "优惠券";
        return <Page header={header} back="none" headerClassName={setting.pageHeaderCss}>
            <div id="qrid" className="text-center" style={{ width: 'auto', height: '85%' }}  >
                <Image src={setting.logo} className="mt-4" style={{ width: 'auto', height: '40%', margin: '2rem auto, 0 auto' }} />
                <div>
                    < QRCode style={{ margin: '2rem 0 0 0' }}
                        value={url}  //value参数为生成二维码的链接
                        size={100} //二维码的宽高尺寸
                        fgColor="#000000"  //二维码的颜色
                    />
                    <div>
                        <span className="w-100 text-center m-3 text-info">{inviteCode} </span>
                    </div> <span style={{ border: '1px solid #999999' }} onClick={this.copyClick} className="small px-1 text cursor-pointer">复制</span>
                </div>
            </div>
            <div className="w-100 text-center">

            </div>
            <div className="w-100 text-center">
                <label className="text-success cursor-info" onClick={this.comeBack}>返回</label>
                <div className="text-center text-white small px-2" style={{ width: '28%', margin: '27px auto 0 auto', padding: '4px', borderRadius: '3px', backgroundColor: '#505050', display: this.showTips }}>已复制到剪切板</div>
            </div>
            {share}
        </Page>
    })
}