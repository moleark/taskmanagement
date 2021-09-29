import { Entity } from 'tonva-react';
import { CApp } from 'uq-app';
//import { CSalesTaskApp } from 'CSalesTaskApp';

export abstract class Loader<T> {
    protected cApp: CApp;
    private entities: Entity[] = [];
    private schemaLoaded: boolean = false;
    constructor(cApp: CApp) {
        this.cApp = cApp;
        //this.initEntities();
    }

    //protected abstract initEntities(): void;

    protected async loadSchemas() {
        if (this.schemaLoaded === true) return;
        await Promise.all(this.entities);
        this.schemaLoaded = true;
    }

    async load(param: any): Promise<T> {
        await this.loadSchemas();
        let data = this.initData();
        await this.loadToData(param, data);
        return data;
    }
    protected abstract loadToData(param: any, data: T): Promise<void>;
    protected abstract initData(): T;
}
