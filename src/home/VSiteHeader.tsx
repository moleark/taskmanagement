import * as React from 'react';
import { LMR, View } from 'tonva';
import { CHome } from './CHome';
import logo from '../images/logo.png';
// import logo from '../images/assistlogo.png';

export class VSiteHeader extends View<CHome> {
    render() {
        /*
        <div className="d-flex flex-row mr-1 align-items-center">
            {currentSalesRegion} &nbsp;
            <button onClick={()=>nav.start()}>Try</button>
        </div>;*/
        let left = <img className="m-1 ml-2" src={logo} alt="logo" style={{ height: "3rem", width: "2.5rem" }} />;
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