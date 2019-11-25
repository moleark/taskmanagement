import * as React from 'react';
import { VPage, Page, Image, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CStart } from './CStart';
import { setting } from 'appConfig';


export class VConfirm extends VPage<CStart> {

    async open(position: any) {
        this.openPage(this.page, position);
    }

    private meInfoa(position: any) {
        let { code, user } = position;
        code = code + "";
        let p1 = code.substr(0, 4);
        let p2 = code.substr(4);
        code = p1 + ' ' + p2;
        //let url = setting.url + "?type=invitation&code=" + code;
        return <div id="qrid" className="text-center" style={{ width: 'auto', height: '70%' }}  >
            <Image src={setting.logo} className="mt-4" style={{ width: 'auto', height: '50%', margin: '2rem auto, 0 auto' }} />
            <div className="my-4">
                <div> {tv(user, v => v.name)}，邀请您加入轻代理。</div>
                <div>邀请码：<span className="text-info">{code}</span></div>
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
