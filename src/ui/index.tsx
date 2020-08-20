import { env } from "tonva";

export { jnkTop, assistjnkTop } from "./jnkTop";
export { VMain } from './main';

const GLOABLE_PRODUCTION = {
    IsAssistApp: document.domain === "localhost",
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1,
    TIPDISPLAYTIME: 2000,
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    posturl: "https://web.jkchemical.com/post",
}

const GLOABLE_TEST = {
    IsAssistApp: window.location.pathname.search(/^\/assist-test/) >= 0,
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 4,
    TIPDISPLAYTIME: 2000,
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    posturl: "https://web.jkchemical.com/post",
}

export const GLOABLE = env.testing === true ? GLOABLE_TEST : GLOABLE_PRODUCTION;