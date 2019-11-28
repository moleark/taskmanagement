import * as React from 'react';
import { VPage, Page, nav, FA, Prop, PropGrid } from 'tonva';
import { CMe } from './CMe';
import { appConfig, setting } from '../appConfig';

export class VSet extends VPage<CMe> {

    async open(position: any) {
        this.openPage(this.page);
    }

    private logout = () => {
        nav.showLogout();
    }

    private changePassword = async () => {
        await nav.changePassword();
    }

    private page = () => {
        let rows: Prop[] = [
            '',
            {
                type: 'component',

                component: <div className="py-2">
                    <i className="iconfont icon-zhanghuxinxi mr-2" style={{ fontSize: "20px", color: "#2aa515" }}></i>账户信息
                </div>,
                onClick: this.controller.showAccount
            },
            '',
            {
                type: 'component',
                component: <div className="py-2">
                    <i className="iconfont icon-mima mr-2" style={{ fontSize: "20px", color: "#2aa515" }}></i><span className="pb-4 mb-4">密码</span>
                </div>,
                onClick: this.changePassword
            },
            '',
            {
                type: 'component',
                component: <div className="w-100 d-flex py-2 justify-content-between">
                    <div>
                        <i className="iconfont icon-guanyu mr-2" style={{ fontSize: "20px", color: "#2aa515" }}></i>关于本APP
                    </div>
                    <div className="py-2 small">V{appConfig.version}</div>
                </div>,
            },
            ''
        ];

        let footer = <button type="button" className="btn btn-danger flex-grow-1 mx-3 my-1 w-100" onClick={this.logout} ><FA name="sign-out" size="lg" /> 退出</button>;
        return <Page header='设置' headerClassName={setting.pageHeaderCss} footer={footer}>
            <PropGrid rows={rows} values={{}} />
        </Page >
    }
}
