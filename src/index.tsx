import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'assests/iconfont.css';
import { App } from 'uq-app';


ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
