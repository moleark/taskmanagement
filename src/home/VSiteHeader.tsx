import * as React from 'react';
import { LMR, View } from 'tonva';
import { CHome } from './CHome';
import logo from '../images/logo.png';

export class VSiteHeader extends View<CHome> {
    render() {
        let left = <img className="m-1 ml-2" src={logo} alt="logo" style={{ height: "3rem", width: "3rem" }} />;
        return <div>
            <LMR className="mb-1 align-items-center bg-white" left={left}>
                <div className="px-3 py-3">
                    {this.controller.renderSearchHeader('md')}
                </div>
            </LMR>
        </div>
        //<div className="h4 px-3 mb-0">百灵威科技</div>
    }
}