import * as React from 'react';
import { View } from 'tonva-react';
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import { CWebUser } from './CWebUser';
export class VWebUserName extends View<CWebUser> {

    webuser: any;
    constructor(cWebUser: CWebUser) {
        super(cWebUser);
        makeObservable(this, {
            webuser: observable
        })
    }

    render(param: any): JSX.Element {
        return <this.content id={param} />;
    }

    private initPostCount = async (param: any) => {
        if (this.webuser === undefined)
            this.webuser = await this.controller.getWebuserName(param.id);
    }

    private content = observer((param: any): any => {
        this.initPostCount(param);
        if (!this.webuser)
            return null;
        return this.webuser.firstName;
    })
}