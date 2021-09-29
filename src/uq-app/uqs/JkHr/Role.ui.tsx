// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Res, setRes, TFunc, FieldItem, FieldItemNumber, FieldItemString, FieldItemId, UI, uqStringify } from "tonva-react";
import { TuidRole } from "./JkHr";

const resRaw: Res<any> = {
    $zh: {
    },
    $en: {
    }
};
const res: any = {};
setRes(res, resRaw);

export const t: TFunc = (str: string | JSX.Element): string | JSX.Element => {
    return res[str as string];
}

export function render(item: TuidRole): JSX.Element {
    return <>{uqStringify(item)}</>;
};
