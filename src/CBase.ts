import { CSub, CBase } from "tonva";
import { UQs } from "./uqs";
import { CApp } from "CApp";

export abstract class CUqBase extends CBase {
    get cApp(): CApp { return this._cApp }
    protected get uqs(): UQs { return this._uqs };
}

export abstract class CUqSub<T extends CUqBase> extends CSub<T> {
    get cApp(): CApp { return this.cApp; }
    protected get uqs(): UQs { return this._uqs as UQs };
    protected get owner(): T { return this._owner as T }
}