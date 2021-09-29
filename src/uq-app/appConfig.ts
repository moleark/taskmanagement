//=== UqApp builder created on Tue Jan 12 2021 23:14:51 GMT-0500 (GMT-05:00) ===//
import { AppConfig, DevConfig } from "tonva-react";

const bz: DevConfig = {
    name: '百灵威系统工程部',
    alias: 'jk',
}

const jk: DevConfig = {
    name: '百灵威系统工程部',
    alias: 'jk',
}

export const appConfig: AppConfig = {
    version: '0.1.0',
    app: {
        dev: jk,
        name: 'salesTask'
    },
    uqs: [
        {
            dev: jk,
            name: 'salesTask',
            alias: 'salesTask',
            version: '0.1.0',
        },
    ],
    noUnit: true,
    tvs: {},
    oem: undefined,
    htmlTitle: 'assist',
};
