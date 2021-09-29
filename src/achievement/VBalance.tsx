import * as React from 'react';
import { VPage, Page, FA, LMR } from 'tonva-react';
import { observer } from 'mobx-react';
import { CBalance } from './CBalance';
import { setting } from 'appConfig';
import { observable } from 'mobx';
import { GLOABLE } from 'ui';

export class VBalance extends VPage<CBalance> {

    private balance: number;
    private waitWithdrawal: number;
    private amount: number = 0;
    @observable tips: string = "";

    async open() {
        /**
         * 此界面要调整成显示“已到账”，“累计收益”，“已申请未发放”和“余额”这4项内容（目前只显示了“余额”和“已申请未发放”2项) 
         */
        let { salesAmont } = this.controller;
        let { totalReceivableAmount, totalaWithdrawal, waitWithdrawal } = salesAmont;
        this.balance = totalReceivableAmount - totalaWithdrawal - waitWithdrawal;
        this.waitWithdrawal = waitWithdrawal;
        this.openPage(this.page);
    }

    private main = observer(() => {
        return <div className="d-flex text-white bg-primary py-2 pb-5"
            style={{ borderRadius: '0  0 5rem 5rem', margin: ' 0 -2rem 0 -2rem ' }}>
            <div style={{ margin: '1rem 0 0 4rem' }}>
                <h6><small>余额（元）</small></h6>
                <h4>{this.balance.toFixed(2)}</h4>
            </div >
            <div style={{ margin: '1rem 0 0 2rem' }}>
                <h6><small>已申请未发放（元）</small></h6>
                <h4>{this.waitWithdrawal.toFixed(2)}</h4>
            </div >
        </div>;
    })

    private bankCard = observer(() => {
        let { account } = this.controller.cApp.cMe;
        let showaccount = account && account.bankaccountnumber ? account.bankaccountnumber : "无";

        let left = <i className="iconfont icon-yinhangqia " style={{ fontSize: "40px", color: "#f5960a" }}></i>;
        let right = <i className="iconfont icon-duihao mt-3 mr-3 " ></i>;

        let contener = <div className="px-3 pt-1 small" onClick={this.controller.cApp.cMe.showAccount} >
            <div className="my-1">我的银行卡</div>
            <div className="h6">{this.accountFormatter(showaccount)}</div>
        </div>;

        let style = {
            backgroundColor: '#f9f9f9', width: '90%', height: "70px", borderRadius: '8px',
            margin: '-3rem auto 2rem auto', boxShadow: "2px 2px 15px #333333"
        };
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
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text"><FA name="cny" /></div>
                    </div>
                    <input type="text" className="form-control form-control-lg" onChange={(e) => this.onChange(e)} />
                </div>
                <div className="sep-product-select" style={{ margin: '0 auto' }} />
                <div className="text-left mt-2 small">
                    <span className="text-muted">可提现金额 {this.balance.toFixed(2)}</span>
                </div>
                <button type="button" className="btn btn-primary mt-4" style={{ width: "95%" }} onClick={this.ontWithdrawal}>
                    提现
                </button>
                <div className="text-center text-danger strong small pt-2">
                    {this.tips}
                </div>
            </div>
        </div>;
    });

    private ontWithdrawal = async () => {
        let { account } = this.controller.cApp.cMe;
        if (!(account && account.bankaccountnumber)) {
            this.tips = "请填写银行账户、个人信息";
        } else if (this.amount <= 0) {
            this.tips = "请填写取款金额";
        } else if (this.amount < 100) {
            this.tips = "提现金额不能小于100元";
        } else if (this.amount > this.balance) {
            this.tips = "提现金额不能大于余额";
        } else {
            await this.controller.submitWithdrawal(this.amount);
        }

        if (this.tips !== "") {
            setTimeout(() => {
                this.tips = "";
            }, GLOABLE.TIPDISPLAYTIME);
        }
    }

    private explain = () => {
        return <div className="px-3 pt-3 small text-muted" >
            <ol className="px-4">
                <li>提现次数：每个账户每月仅限1次。</li>
                <li>提现申请时间：每月21号至27号（二月份为21号至25号）。</li>
                <li>提现到账时间：3个工作日以内。</li>
                <li>起提金额：100元起提。</li >
                <li>提现需扣除相应费率。</li>
            </ol >
            <p>
                特别提醒：提现时需要完成服务协议签署且在线完成账户实名认证且绑定的银行卡持有人必须与账户实名认证信息一致，否则提现将会失败。
            </p>
        </div >;
    };

    private page = observer(() => {
        let right = <div className="w-100 text-center py-2 mx-3" onClick={this.controller.showBalanceHistory} >历史记录</div>;
        return <Page header="余额" headerClassName={setting.pageHeaderCss} right={right}>
            <div className="bg-white overflow-hidden">
                <this.main />
                <this.bankCard />
                <this.withdraw />
                <this.explain />
            </div>
        </Page >
    });
}