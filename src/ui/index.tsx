import { AppUI, CApp } from "tonva-react-uq";
import salestaskUI from './salestask';
import { CSalesTaskApp } from '../CSalesTaskApp';

const ui: AppUI = {
    appName: "百灵威系统工程部/salestask",
    CApp: CSalesTaskApp,
    uqs: {
        '百灵威系统工程部/salestask': salestaskUI,
    },
}

export default ui;
