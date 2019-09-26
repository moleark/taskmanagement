import {CenterApiBase} from '.';
import {decodeUserToken} from '../tool/user';
//import { nav } from '../ui';

export interface RegisterParameter {
    nick:string, 
    user:string, 
    pwd:string,
    country:number, 
    mobile:number, 
    mobileCountry:number,
    email:string,
    verify:string,
};

export class UserApi extends CenterApiBase {
    async login(params: {user: string, pwd: string, guest: number}): Promise<any> {
        //(params as any).device = nav.local.device.get();
        let ret = await this.get('user/login', params);
        switch (typeof ret) {
            default: return;
            case 'string': return decodeUserToken(ret);
            case 'object':
                let token = ret.token;
                let user = decodeUserToken(token);
                let {nick, icon} = ret;
                if (nick) user.nick = nick;
                if (icon) user.icon = icon;
                return user;
        }
        // !== undefined) return decodeToken(token);
    }
    async register(params: RegisterParameter): Promise<any>
    {
        return await this.post('user/register', params);
    }

    async setVerify(account:string, type:'mobile'|'email') {
        return await this.post('user/set-verify', {account:account, type:type});
    }

    async checkVerify(account:string, verify:string) {
        return await this.post('user/check-verify', {account:account, verify:verify});
    }

    async isExists(account:string) {
        return await this.get('user/is-exists', {account:account});
    }

    async resetPassword(account:string, password:string, verify:string, type:'mobile'|'email') {
        return await this.post('user/reset-password', {account:account, password, verify, type});
    }
    
    async userSetProp(prop:string, value:any) {
        await this.post('tie/user-set-prop', {prop:prop, value:value});
    }

    async me():Promise<any> {
        return await this.get('tie/me');
    }
}

export const userApi = new UserApi('tv/', undefined);
