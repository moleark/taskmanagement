import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, Image } from 'tonva';
import QRCode from 'qrcode.react';
import { setting } from 'appConfig';
import { CMe } from './CMe';
import { scaleToImage_text } from './scaleToImage';

export class VInvitationCode extends VPage<CMe> {

    async open(code: string) {
        this.openPage(this.page, { code: code });
    }

    saveImage = async () => {
        var qr = document.getElementById('qrid');
        await scaleToImage_text(qr);
    }
    share = async (url: any) => {
        let { user } = this.controller;
        let { name, nick } = user;
        //5+ 原生分享  
        let content = (nick ? nick : name) + " 邀请您加入销售助手！";

        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            // @ts-ignore  屏蔽错误 
            window.plusShare({
                title: "邀请码",//应用名字  
                content: content,
                href: url,//分享出去后，点击跳转地址 
                //pictures: ["https://agent.jkchemical.com/logonew.png"],//分享的图片
                thumbs: ["https://agent.jkchemical.com/logonew.png"] //分享缩略图  
            }, function (result) {
                //分享回调  
            });
        }
    }

    private page = observer((param: any) => {
        let url = setting.url + "?type=invitation&code=" + param.code;
        let onshare = () => this.share(url);

        let share = <div className="text-center" style={{ width: 'auto', height: '10%' }} >
        </div>;
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
            share = <div className="text-center" style={{ width: 'auto', height: '10%' }} >
                <button type="button" id="share" className="btn text-info mx-3 my-1" onClick={onshare} >分享</button>
            </div>;
        }

        return <Page header='邀请码' headerClassName={setting.pageHeaderCss}>
            <div id="qrid" className="text-center" style={{ width: 'auto', height: '85%' }}  >
                <Image src={setting.logo} className="mt-4" style={{ width: 'auto', height: '40%', margin: '2rem auto, 0 auto' }} />
                <div>
                    < QRCode style={{ margin: '2rem 0 0 0' }}
                        value={url}  //value参数为生成二维码的链接
                        size={100} //二维码的宽高尺寸
                        fgColor="#000000"  //二维码的颜色
                    />
                    <div>{param.code}</div>
                </div>
            </div>
            {share}
        </Page >
    })
}
