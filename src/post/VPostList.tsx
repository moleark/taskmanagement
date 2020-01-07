import * as React from 'react';
import { observer } from 'mobx-react';
import { VPage, Page, List, LMR, FA, EasyTime, tv } from 'tonva';
import { CPost } from './CPost';
import { setting } from 'appConfig';
/* eslint-disable */
export class VPostList extends VPage<CPost> {

    async open(customer: any) {

        this.openPage(this.page, customer);
    }

    //每个视图都有一个render方法， 用于自定义页面
    render(member: any): JSX.Element {
        return <this.page />;
    }

    private onScrollBottom = async () => {
        this.controller.pagePost.more();
    }

    private page = observer((product: any) => {

        let { pagePost } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">【无】</div>;
        return <Page header="帖文" onScrollBottom={this.onScrollBottom} headerClassName={setting.pageHeaderCss} >
            <List before={''} none={none} items={pagePost} item={{ render: this.renderItem, onClick: this.itemClick }} />
        </Page>
    })

    private itemClick = (item: any) => {
        this.controller.showDetail(item.id);
    }

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { image, caption, discription, $update } = item;
        let right = <div className="small text-muted text-right w-6c ">
            <div className="small"><EasyTime date={$update} /></div>
        </div>;

        let tvImage = tv(image, (values) => {
            return <div className=" text-center m-2 mr-4"><img className="w-3c h-3c" src={values.path} style={{ borderRadius: '8px' }} /></div>;
        }, undefined,
            () => <div className=" text-center m-2 mr-4"><FA className="w-3 p-2 h-3c text-center" name="camera" size="2x" /></div>);

        return <LMR className="" left={tvImage} right={right}>
            <div className="mt-2"><strong>{caption}</strong></div>
            <div className="small text-muted ">{discription}</div>
        </LMR>;
    });
}