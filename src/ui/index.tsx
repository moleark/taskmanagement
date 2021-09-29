import { env } from 'tonva-react';

export { jnkTop, assistjnkTop } from "./jnkTop";
export { VMain } from './main';

const GLOABLE_PRODUCTION = {
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1,
    TIPDISPLAYTIME: 2000,
    url: "https://agent.jkchemical.com",
    carturl: "https://shop.jkchemical.com",
    posturl: "https://web.jkchemical.com/post",
}

const GLOABLE_TEST = {
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 4,
    TIPDISPLAYTIME: 2000,
    url: "https://agent.jkchemical.com",
    carturl: "https://shop.jkchemical.com",
    posturl: "https://web.jkchemical.com/post",
}

export const GLOABLE = env.testing === true ? GLOABLE_TEST : GLOABLE_PRODUCTION;