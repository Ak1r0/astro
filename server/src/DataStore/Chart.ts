import AbstractProvider from "../DataProvider/AbstractProvider";
import * as dfd from "danfojs-node"

export type ChartConfig = {base: string; quote: string; interval: string;};

export default class Chart {

    private data: dfd.DataFrame | dfd.Series;

    constructor(public config: ChartConfig, public provider: AbstractProvider) {
        this.data = new dfd.DataFrame();
    }

    get pair(): string {
        return this.config.base+'/'+this.config.quote;
    }

    async update(): Promise<dfd.DataFrame | dfd.Series> {
        let df = await this.provider.fetch(this.pair, this.config.interval);
        this.data = dfd.concat({ dfList: [this.data, df], axis: 1 });
        return this.data;
    }
}
