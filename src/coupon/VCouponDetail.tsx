import * as React from 'react';
import { VPage, Page, Prop, PropGrid, ComponentProp, LMR, EasyDate, User, FA } from 'tonva';
import { observer } from 'mobx-react';
import { CCoupon } from './CCoupon';
import { setting } from 'appConfig';

export class VCouponDetail extends VPage<CCoupon> {

    private coupon: any;
    async open(coupon: any) {

        this.coupon = coupon;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { id, code, validitydate, isValid, types } = this.coupon;
        let { invalidCoupon, showShareCoupon, pageCouponReceiveUsed, showVIPCardDiscount } = this.controller;

        let rows: Prop[] = [];
        rows.push(this.renderGridItem(types === "coupon" ? " 优 惠 券 ：" : "积 分 券：", code, "", "", undefined));
        rows.push(this.renderGridItem(" 有 效 期 ：", validitydate, "date", "", undefined));
        if (types === "coupon")
            rows.push(this.renderGridItem("品牌折扣：", "", "", "查看", () => showVIPCardDiscount(id)));
        rows.push(this.renderGridItem("状 态：", isValid ? '有效' : '无效', "", "", undefined));

        let footer = <div className="">
            <button onClick={() => invalidCoupon(this.coupon)} type="submit" className="btn btn-danger flex-grow-1 px-3 mx-3">&nbsp; &nbsp; 作废&nbsp; &nbsp; </button>
            <button onClick={() => showShareCoupon({ code: code, type: types, product: undefined })} type="submit" className="btn btn-primary  px-3">&nbsp; &nbsp; 分享&nbsp; &nbsp; </button>
        </div>;

        return <Page header="详情" headerClassName={setting.pageHeaderCss} footer={footer}>
            <PropGrid className="my-2" rows={rows} values={this.coupon} alignValue="right" />
            {pageCouponReceiveUsed.length > 0 &&
                <>
                    <LMR className="cursor-pointer bg-white w-100 mt-2 py-2 pl-3" left="使用记录" ></LMR >
                    <div className="sep-product-select" style={{ margin: "0 auto" }} />
                </>
            }
            {pageCouponReceiveUsed.length > 0 && this.renderItem()}
        </Page>
    });

    private renderGridItem = (left: any, val: any, type: any, right: any, action: any) => {
        let vright = <div className="small text-primary">{right}</div>
        return {
            type: 'component',
            name: 'customer',
            component: <LMR className="cursor-pointer w-100 py-3" left={left} right={vright} onClick={action}>
                {type === "date" ? <div className="mx-3">{<EasyDate date={val} />}</div> : <div className="mx-3">{val}</div>}
            </LMR >
        } as ComponentProp
    }

    private renderItem = () => {
        let { pageCouponReceiveUsed, cApp } = this.controller;
        let user = cApp.cWebUser.renderWebuserName(47);
        let content = pageCouponReceiveUsed.map((v, index) => {
            let { receivedate, useddate, receive, used } = v;

            let vreceive = <>
                <FA name="check" /> <EasyDate date={receivedate}></EasyDate>
            </>;
            let vused = <>
                <FA name="check" /> <EasyDate date={useddate}></EasyDate>
            </>;
            return <tr className="col bg-white">
                <td className="w-1 pt-3">{user}</td>
                <td className="w-5">{receive && vreceive}</td>
                <td className="w-5">{used && vused}</td>
            </tr>
        })

        return <table className="table text-center small">
            <thead className="text-primary">
                <tr className="bg-white">
                    <th></th>
                    <th>领用</th>
                    <th>使用</th>
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </table>;
    }

    renderTop = (user: User): JSX.Element => {
        let { name, nick } = user;
        return <div>{nick || name}</div>
    }

}