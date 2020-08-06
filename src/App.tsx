import * as React from 'react';
import './App.css';
import { start, NavView, nav } from 'tonva';
import { appEnvConfig } from './appConfig';
import { CApp } from './CApp';

/*
//启动前获取连接地址，判断是销售助手还是轻代理
if (document.domain === setting.assistDomain) {
  //if (url === "c.jkchemical.com") {
  //if (url === "localhost") {
  document.title = "销售助手";
  let $favicon: any = document.querySelector('link[rel="shortcut icon"]');
  $favicon.attributes.href.value = "/assistlogo.png";
  let a = assistAppConfig;
  nav.setSettings(a);

} else {
  document.title = "轻代理";
  let $favicon: any = document.querySelector('link[rel="shortcut icon"]');
  $favicon.attributes.href.value = "/logo.png";
  let a = appConfig;
  nav.setSettings(a);
}
*/

let { documentTitle, favicon, appConfig } = appEnvConfig;
document.title = documentTitle;
let $favicon: any = document.querySelector('link[rel="shortcut icon"]');
$favicon.attributes.href.value = favicon;
nav.setSettings(appConfig);


class App extends React.Component {

  private onLogined = async () => {

    await start(CApp, appConfig);
  }

  public render() {
    return <NavView onLogined={this.onLogined} />
  }
}

export default App;