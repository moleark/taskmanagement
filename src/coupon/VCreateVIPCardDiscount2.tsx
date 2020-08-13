import * as React from 'react';
import { VPage, Page, FA, List, tv } from 'tonva';
import { CCoupon } from './CCoupon';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

export class VCreateVIPCardDiscount2 extends VPage<CCoupon> {
    private vipCardDiscountSetting: any[] = [];
    private vipCardLevel: any;
    private vipCardType: any;
    private webUser: any;
    private product: any;
    private changeVipCardDiscount: any[];
    @observable tips: string;

    async open(param: any) {
        let { webUser, vipCardLevel, vipCardType, product, vipCardLevelDiscountSetting } = param;
        this.webUser = webUser;
        this.vipCardLevel = vipCardLevel;
        this.vipCardType = vipCardType;
        this.product = product;
        for (let i = 0; i < vipCardLevelDiscountSetting.length; i++) {
            this.vipCardDiscountSetting.push(vipCardLevelDiscountSetting[i]);
        }
        this.vipCardDiscountSetting.sort((a: any, b: any) => { return a.brand.name > b.brand.name ? 0 : 1 });
        this.openPage(this.page);
    }

    private renderVIPCardDiscountSetting = (item: any) => {
        let { brand, discount } = item;
        let minDiscountForDisplay = 100 - discount * 100;
        return <div className="row">
            <div className="col-3">
                {tv(brand, v => v.name)}
            </div>
            <div className="col-9">
                <SlidingBlock minDiscountForDisplay={minDiscountForDisplay} brandId={brand.id} hanleClickCallBack={this.hanleClickCallBack} />
            </div>
            {/* <div className="col-3">
                <small className=" ml-3 text-danger">≥{minDiscountForDisplay}%</small>
            </div> */}
        </div>
    }

    private hanleClickCallBack = (val, brandid) => {
        let changeVipCardDiscount = []
        this.vipCardDiscountSetting.forEach(element => {
            if (element.brand.id === brandid) {
                element.discount = val;
            }
            changeVipCardDiscount.push(element)
        });
        this.changeVipCardDiscount = changeVipCardDiscount
    }

    private onSubmit = async () => {
        let { createVIPCardDiscountCallback } = this.controller;
        let vipCardDiscountSettingCopy = [];
        this.changeVipCardDiscount.forEach(element => {
            if (element.discount < 100) {
                vipCardDiscountSettingCopy.push(element);
            }
        });
        vipCardDiscountSettingCopy.forEach(v => v.discount = (100 - v.discount) / 100);
        await createVIPCardDiscountCallback(this.webUser, this.vipCardLevel, this.vipCardType, this.product, vipCardDiscountSettingCopy, "0");
    }

    private tipsUi = observer(() => {
        if (this.tips) {
            return <div className="alert alert-primary" role="alert">
                <FA name="exclamatin-circle" className="text-warning float-left mr-3" size="2x" />
                {this.tips}
            </div>
        }
        return null;
    })

    private page = () => {
        let footer = <button type="button" className="btn btn-primary w-100 " onClick={this.onSubmit}>一键分享</button>;
        let right = <div className="cursor-pointer mx-3 small text-warning" onClick={() => this.controller.cApp.cCoupon.showCouponList("coupon")} >
            <FA name="list-ol" className="pl-1 mr-1 fa-lg" />
        </div>;
        return <Page header="设置品牌折扣" right={right} footer={footer} >
            <List items={this.vipCardDiscountSetting} item={{ render: this.renderVIPCardDiscountSetting, className: "px-3 py-2" }}></List>
            {React.createElement(this.tipsUi)}
        </Page>
    }
}

export default function SlidingBlock(props) {
    const [value, setValue] = React.useState(100);
    const { minDiscountForDisplay, brandId, hanleClickCallBack } = props;
    if (hanleClickCallBack) { hanleClickCallBack(value, brandId) }

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (event) => {
        setValue(Number(event.target.value));
    };
    let marks = [{
        value: minDiscountForDisplay,
        label: minDiscountForDisplay + '%',
    },
    {
        value: 100,
        label: '100%',
    }]
    return (
        <div className='w-100'>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        min={minDiscountForDisplay}
                        marks={marks}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Input
                        value={value + '%'}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

