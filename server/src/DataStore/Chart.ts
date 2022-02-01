import AbstractProvider from "../DataProvider/AbstractProvider";
import * as dfd from "danfojs-node"

export type ChartInputConfig = { base: string; quote: string; interval: string; };

export type callBackInput = (chart: Chart, lastDataframes: dfd.DataFrame) => void;

export default class Chart {

    private data: dfd.DataFrame | undefined;
    private subscribers: callBackInput[] = [];

    public doUpdate: boolean = true;

    constructor(public config: ChartInputConfig, public provider: AbstractProvider) {
    }

    getData(): dfd.DataFrame {
        return this.data || new dfd.DataFrame();
    }

    get pair(): string {
        return this.config.base + '/' + this.config.quote;
    }

    async startUpdating() {
        while (this.doUpdate) {
            try {
                await this.provider.sync(parseInt(this.config.interval.slice(0, -1))); //todo manage other timeframes not only minutes
                let df = await this.fetchNewData();
                this.subscribers.forEach(callback => callback(this, df));
            } catch (e) {
                console.log(e);
            }
        }
    }

    async fetchNewData(): Promise<dfd.DataFrame> {
        let df = await this.provider.fetch(this.pair, this.config.interval);

        this.data = !this.data ? df : dfd.concat({dfList: [this.data, df], axis: 0}) as dfd.DataFrame;

        console.log(this.data);

        return df;
    }

    onUpdate(callback: callBackInput) {
        this.subscribers.push(callback);
    }
}
