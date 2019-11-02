import * as React from 'react';
import { VPage, Page, Image } from 'tonva';
import { observer } from 'mobx-react';
import { CStart } from './CStart';
import QRCode from 'qrcode.react';
import { setting } from 'appConfig';


export class VConfirm extends VPage<CStart> {

    async open(position: any) {
        this.openPage(this.page, position);
    }

    private meInfoa(position: any) {
        let { code } = position;
        let url = setting.url + "?type=invitation&code=" + code;
        return <div id="qrid" className="text-center" style={{ width: 'auto', height: '70%' }}  >
            <Image src={setting.logo} className="mt-4" style={{ width: 'auto', height: '50%', margin: '2rem auto, 0 auto' }} />
            <div>
                < QRCode style={{ margin: '2rem 0 0 0' }}
                    value={url}  //value参数为生成二维码的链接
                    size={100} //二维码的宽高尺寸
                    fgColor="#000000"  //二维码的颜色
                />
                <div>{code}</div>
            </div>
        </div>
    }

    private CreatePosition = async (code: string) => {
        await this.controller.createPosition({ invitacode: code });
    }

    private page = observer((position: any) => {

        let onCreatePosition = async () => await this.CreatePosition(position.code + "");
        let footer = <div className="d-block">
            <button type="button" className="btn btn-primary w-100" onClick={onCreatePosition}>确认</button>
        </div>
        return <Page header='邀请人' headerClassName={setting.pageHeaderCss} logout={true} back='none' footer={footer} >
            {this.meInfoa(position)}
        </Page>

    })
}
