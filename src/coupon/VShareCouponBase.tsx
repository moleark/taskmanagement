import * as React from "react";
import copy from 'copy-to-clipboard';
import { GLOABLE } from '../ui';
import QRCode from 'qrcode.react';
import { observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';
import { appSettings } from '../appConfig';
import { Coupon } from "uq-app/uqs/JkCoupon";

export const VShareCouponBase = observer(

    class VShareCouponBase extends React.Component<{ coupon: Coupon, url: string, onReturn: () => void }, {}> {

        showTips: any = "none"
        private coupon: any;
        constructor(props: any) {
            super(props);
            makeObservable(this, {
                showTips: observable
            })
        }

        render() {
            let { coupon, url, onReturn } = this.props;
            let { code } = coupon;
            var couponCode = "";
            if (code) {
                code = String(code);
                let p1 = code.substr(0, 4);
                let p2 = code.substr(4);
                couponCode = p1 + ' ' + p2;
            }

            let onshare = () => this.share(url);
            let share = <div className="text-center" style={{ width: 'auto', height: '10%' }} >
            </div>;

            if (navigator.userAgent.indexOf("Html5Plus") > -1) {
                share = <span className="text-info cursor-info mx-2" onClick={onshare}>分享</span>;
            }

            return <>
                <div>
                    <QRCode style={{ margin: '2rem 0 0 0' }}
                        value={url}  //value参数为生成二维码的链接
                        size={100} //二维码的宽高尺寸
                        fgColor="#000000"  //二维码的颜色
                    />
                    <div className="mt-4">
                        <span className="w-100 text-center h3 m-3 text-info">{couponCode}</span>
                    </div>
                </div>
                <div className="w-100 text-center">

                </div>
                <div className="w-100 text-center pt-3">
                    <span className="text-info cursor-info mx-2" onClick={(e) => this.copyClick(e, couponCode)}>复制</span>
                    <span className="text-info cursor-info mx-2" onClick={() => onReturn()}>返回</span>
                    {share}
                    <div className="text-center text-white small px-2" style={{
                        width: '30%', margin: '-80px  auto 0 auto', padding: '4px', borderRadius: '3px',
                        backgroundColor: '#505050', display: this.showTips
                    }}>已复制到剪切板</div>
                </div>
            </>
        }

        share = async (url: any) => {
            if (navigator.userAgent.indexOf("Html5Plus") > -1) {
                let { type, discount, code } = this.coupon;
                // @ts-ignore  屏蔽错误 
                window.plusShare({
                    title: appSettings.shareTitle(type),//应用名字  
                    content: appSettings.shareContent(type, discount),
                    href: url,//分享出去后，点击跳转地址 
                    thumbs: [appSettings.sharelogo] //分享缩略图  
                }, function (result) {
                });
            }
        }

        copyClick = (e: any, val: any) => {
            copy(val)
            this.showTips = "";
            setTimeout(() => {
                this.showTips = "none";
            }, GLOABLE.TIPDISPLAYTIME);
        }
    }
)