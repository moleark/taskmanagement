import * as React from 'react';
import { VPage, Page, FA, nav } from 'tonva';
import { CMe } from './CMe';
import { setting, appConfig } from '../appConfig';

export class VAbout extends VPage<CMe> {

    async open() {
        this.openPage(this.page);
    }
    private page = () => {
        let { appName, logo } = setting.sales;
        let header: any = <div>关于{appName}</div>
        let links: any = <div className="sep-product-select" style={{ width: "80%", margin: " 0 auto 0 auto" }} />
        return <Page header={header} headerClassName={setting.pageHeaderCss} >
            <div className="bg-white text-center" style={{ height: '100%' }} >
                <div className="h3 flex-fill text-center">
                    <img src={logo} alt="" className="mt-5" style={{ width: '25%' }} />
                </div>
                <div className=" h5 flex-fill text-center  m-2">
                    <strong><span className="mr-3">{appName} APP</span></strong>
                </div>
                <div className="flex-fill text-center mb-5">
                    <span className="text-muted mr-3">V {appConfig.version}</span>
                </div>

                {links}
                <div className="d-flex my-3 justify-content-between" style={{ width: "70%", margin: " 0 auto 0 auto" }} onClick={() => nav.resetAll()} >
                    <div>检查新版本</div> <div><FA className="small text-muted" name="chevron-right"></FA></div>
                </div>
                {links}

                <div className="small text-muted text-center" style={{ width: "100%", position: "absolute", bottom: "4%" }} >
                    <div className="py-2 h6 text-primary small">《隐私政策》</div>
                </div>
            </div>
        </Page >
    }
}