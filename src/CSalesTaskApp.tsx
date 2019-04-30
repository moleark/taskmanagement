//import * as React from 'react';
import { User, nav } from 'tonva-tools';
import { CApp, CUq } from 'tonva-react-uq';
import { CSalesTask } from 'salestask';
import { consts } from './salestask/consts';


export class CSalesTaskApp extends CApp {

    cUqSalesTask: CUq;  
    protected async internalStart() {
        this.cUqSalesTask = this.getCUq(consts.uqSalesTask);
        }
    }