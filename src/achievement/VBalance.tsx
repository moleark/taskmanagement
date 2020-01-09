import * as React from 'react';
import { VPage, Page, FA, LMR } from 'tonva';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';
import { observable } from 'mobx';
import { GLOABLE } from 'ui';

export class VBalance extends VPage<CBalance> {

    private balance: number;
    private amount: number = 0;
    @observable private showmessage: string;
    @observable showTips: any = "none"

    async open() {
        let { salesAmont } = this.controller;
        let { totalReceivableAmount, totalaWithdrawal, waitWithdrawal } = salesAmont;
        this.balance = totalReceivableAmount - totalaWithdrawal - waitWithdrawal;
        this.openPage(this.page);
    }

    private main = observer(() => {
        return <div className="text-white bg-primary py-2 pb-5" style={{ borderRadius: '0  0 5rem 5rem', margin: ' 0 -2rem 0 -2rem ' }}>
            <div style={{ margin: '1rem 0 0 4rem' }}>
                <h6><small>全部余额（元）</small></h6>
                <h4>{this.balance.toFixed(2)}</h4>
            </div >
        </div>;
    })

    private bankcard = observer(() => {
        let { account } = this.controller.cApp.cMe;
        let showaccount = account ? account.bankaccountnumber : "无";


        let style = { backgroundColor: '#f9f9f9', width: '90%', height: "70px", borderRadius: '8px', margin: '-3rem auto 2rem auto', boxShadow: "2px 2px 15px #333333" };
        let left = <i className="iconfont icon-yinhangqia " style={{ fontSize: "40px", color: "#f5960a" }}></i>;
        let right = <i className="iconfont icon-duihao mt-3 mr-3 " ></i>;

        let contener = <div className="px-3 pt-1 small" onClick={this.controller.cApp.cMe.showAccount} >
            <div className="my-1">我的银行卡</div>
            <div className="h6">{this.accountFormatter(showaccount)}</div>
        </div>;

        return <div className="px-2 pt-1" style={style}>
            <LMR left={left} right={right} >{contener} </LMR>
        </div >;
    });

    accountFormatter = (num: any) => {
        num = num.replace(/\s*/g, '');
        const result = [];
        for (let i = 0; i < num.length; i += 1) {
            if (i % 4 === 0 && i !== 0) {
                result.push(' ' + num.charAt(i));
            } else {
                result.push(num.charAt(i));
            }
        }
        num = result.join('');
        return num;
    }

    private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let val = evt.currentTarget.value;
        if (val && !/(^[0-9]+(.[0-9]{2})?$)/.test(val)) {
            evt.currentTarget.value = "";
        } else {
            this.amount = parseFloat(val);
            if (this.amount > this.balance) {
                this.amount = this.balance;
                evt.currentTarget.value = this.amount.toFixed(2).toString();
            }
        }
    }

    private withdraw = observer(() => {
        return <div>
            <div className="px-3 h4">提现金额</div>
            <div className="text-center px-3 mt-4" >
                <div>
                    <FA name="cny" className="h1" />
                    <input type="text" className="mx-1 px-4 h2" onChange={(e) => this.onChange(e)} style={{ width: "90%", height: "50px", border: "none" }}  ></input>
                </div>
                <div className="sep-product-select" style={{ margin: '0 auto' }} />
                <div className="text-left mt-2 small">
                    <span className="text-muted">可提现金额 {this.balance.toFixed(2)}</span>
                </div>
                <button type="button" className="btn btn-primary mt-4" style={{ width: "95%" }} onClick={this.ontWithdrawal} >提现</button>
            </div>
        </div >;
    });
    /**< span className = "mx-2 text-primary" > 全部提现</span >**/

    private ontWithdrawal = async () => {
        if (this.amount <= 0) {
            this.showmessage = "请填写取款金额";
        } else if (this.amount < 1) {
            this.showmessage = "提现金额不能小于100元";
        } else if (this.amount > this.balance) {
            this.showmessage = "提现金额不能大于余额";
        } else {
            await this.controller.submitWithdrawal(this.amount);
        }

        if (this.showmessage !== "") {
            this.showTips = "";
            setTimeout(() => {
                this.showmessage = "";
                this.showTips = "none";
            }, GLOABLE.TIPDISPLAYTIME);
        }
    }

    private explain = observer(() => {
        return <div className="px-3 pt-3 small text-muted" style={{ bottom: "4%", position: "absolute" }} >
            1、	提现次数：每个账户每月仅限1次。<br />
            2、	提现申请时间：每月21号至27号（二月份为21号至25号）。<br />
            3、	提现到账时间：3个工作日以内。<br />
            4、	起提金额：100元起提。<br />
            5、	提现需扣除相应费率。<br />
            特别提醒：提现时需要完成服务协议签署且在线完成账户实名认证且绑定的银行卡持有人必须与账户实名认证信息一致，否则提现将会失败。
        </div>;
    });

    private page = observer(() => {
        let right = <div className="w-100 text-center py-2 mx-3" onClick={this.controller.showBalanceHistory} >历史记录</div>;
        return <Page header="余额" headerClassName={setting.pageHeaderCss} right={right}>
            <div className=" bg-white" style={{ height: "100%" }}>
                <this.main />
                <this.bankcard />
                <this.withdraw />
                <this.explain />
            </div>
            <div className="text-center text-danger strong small px-2" style={{ width: '80%', margin: '-14rem auto 0 auto', padding: '4px', borderRadius: '3px', display: this.showTips }}>{this.showmessage}</div>
        </Page >
    });
}