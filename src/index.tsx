import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'assests/iconfont.css';
import { App } from 'uq-app';
import { GLOABLE } from 'ui';
import { setting } from 'appConfig';
import { AgentApp, AssistApp } from 'model/sales';


export const currentApp = GLOABLE.IsAssistApp ? new AssistApp() : new AgentApp();
setting.sales = currentApp;

let { title, logo } = currentApp;
document.title = title;
let $favicon: any = document.querySelector('link[rel="shortcut icon"]');
$favicon.attributes.href.value = logo;

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
