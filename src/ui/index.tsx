import { AppUI, CApp } from 'tonva';
import salestaskUI from './salestask';
import { CSalesTaskApp } from '../CSalesTaskApp';
import { VHome } from './main';

const ui: AppUI = {
    appName: "百灵威系统工程部/salestask",
    CApp: CSalesTaskApp,
    main: VHome,
    uqs: {
        '百灵威系统工程部/salestask': salestaskUI,
    },
}

export default ui;
