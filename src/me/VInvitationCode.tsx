import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, Image } from 'tonva-react';
import QRCode from 'qrcode.react';
import { appSettings } from 'appConfig';
import { CMe } from './CMe';
import { scaleToImage_text } from './scaleToImage';
import copy from 'copy-to-clipboard';
import { observable } from 'mobx';
import { GLOABLE } from 'ui';

export class VInvitationCode extends VPage<CMe> {

    @observable showTips: any = "none"
    async open(code: string) {

        this.openPage(this.page, { code: code });
    }
    copyClick = (e: any) => {
        copy(e)
        this.showTips = "";
        setTimeout(() => {
            this.showTips = "none";
        }, GLOABLE.TIPDISPLAYTIME);
    }

    saveImage = async () => {
        var qr = document.getElementById('qrid');
        await scaleToImage_text(qr);
    }
    share = async (url: any) => {
        let { user } = this.controller;
        let { name, nick } = user;
        //5+ 原生分享  
        let content = (nick ? nick : name) + " 邀请您加入" + appSettings.appName + "！";

        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore  屏蔽错误 
            window.plusShare({
                title: "邀请码",//应用名字  
                content: content,
                href: url,//分享出去后，点击跳转地址 
                //pictures: ["https://agent.jkchemical.com/logonew.png"],//分享的图片
                thumbs: [appSettings.sharelogo] //分享缩略图  
            }, function (result) {
                //分享回调  
            });
        }
    }


    private page = observer((param: any) => {
        let url = GLOABLE.url + "?type=invitation&code=" + param.code;
        let onshare = () => this.share(url);

        let share = <div className="text-center" style={{ width: 'auto', height: '10%' }} >
        </div>;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            share = <div className="text-center" style={{ width: 'auto', height: '10%' }} >
                <button type="button" id="share" className="btn text-info mx-3 my-1" onClick={onshare} >分享</button>
            </div>;
        }

        let inviteCode = String(param.code);
        let p1 = inviteCode.substr(0, 4);
        let p2 = inviteCode.substr(4);
        inviteCode = p1 + ' ' + p2;

        return <Page header='邀请码'>
            <div className="text-center bg-white" ref={this.refIframe} >
                <div id="qrid" className="text-center" style={{ width: 'auto', height: '80%' }}  >
                    <Image src={appSettings.logo} className="mt-4" style={{ width: 'auto', height: '15rem', margin: '2rem auto, 0 auto' }} />
                    <div>
                        < QRCode style={{ margin: '2rem 0 0 0' }}
                            value={url}  //value参数为生成二维码的链接
                            size={100} //二维码的宽高尺寸
                            fgColor="#000000"  //二维码的颜色
                        />
                    </div>
                    <div className="mt-4">
                        <span className="w-100 text-center h3 m-3 text-info">{inviteCode} </span>
                    </div>
                </div>
                <div className="w-100 text-center">
                    <span className="text-info cursor-info mx-2 pb-1" onClick={() => this.copyClick(inviteCode)}>复制</span>
                    {share}
                    <div className="text-center text-white small px-2" style={{ width: '30%', margin: '-58px auto 0 auto', padding: '4px', borderRadius: '3px', backgroundColor: '#505050', display: this.showTips }}>已复制到剪切板</div>
                </div>
                <div className="mt-4 px-4 small text-muted">复制分享邀请码，可以邀请客户发展团队.</div>
            </div>
        </Page >
    })

    private refIframe = (ifrm: HTMLIFrameElement) => {
        if (!ifrm) return;
        let article = ifrm.parentElement.parentElement;
        let header = (article.querySelector('section.tv-page-header') as HTMLElement);
        ifrm.style.height = (window.innerHeight - header.clientHeight) + 'px';
        article.parentElement.style.overflowY = 'hidden';
    }
}
