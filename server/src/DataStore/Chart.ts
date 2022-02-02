import AbstractProvider from "../DataProvider/AbstractProvider";
import * as dfd from "danfojs-node"
import ccxt from "ccxt";

export type ChartInputConfig = { base: string; quote: string; interval: string, exchangeId: ccxt.ExchangeId };

export type callBackInput = (chart: Chart, lastDataframes: dfd.DataFrame) => void;

export default class Chart {

    public data: dfd.DataFrame;
    private initSubscribers: callBackInput[] = [];
    private updateSubscribers: callBackInput[] = [];

    private isInitiated = false;
    public doUpdate = true;

    constructor(public readonly config: ChartInputConfig) {
        this.data = new dfd.DataFrame();
    }

    get name(): string {
        return `${this.config.base}_${this.config.quote}-${this.config.interval}_${this.config.exchangeId}`;
    }

    get pair(): string {
        return this.config.base + '/' + this.config.quote;
    }

    addData(df: dfd.DataFrame) {
        this.data = dfd.concat({dfList: [this.data, df], axis: 0}) as dfd.DataFrame;
    }

    onInit(callback: callBackInput){
        this.initSubscribers.push(callback);
    }

    onUpdate(callback: callBackInput) {
        this.updateSubscribers.push(callback);
    }
}
