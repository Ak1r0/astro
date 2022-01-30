import {Exchange, NotSupported, Params} from "ccxt";
import AbstractProvider, {FetchType} from "./AbstractProvider";
import * as dfd from "danfojs-node";

export default class ExchangeProvider extends AbstractProvider {

    private areMarketsLoaded: boolean = false;

    async init() {
        let markets = await this.exchange.loadMarkets();
        this.areMarketsLoaded = true;
        return markets;
    }

    async fetch(pair: string, timeframe: string, fetchType: FetchType = 'fetchOHLCV', params?: Params): Promise<dfd.DataFrame> {

        if(!this.areMarketsLoaded) return Promise.reject('Markets are not loaded');

        if(!this.exchange.symbols.includes(pair)) {
            throw new NotSupported(`${pair} not supported by exchange ${this.exchange.id}`);
        }

        if(this.exchange.timeframes[timeframe] === undefined) {
            throw new NotSupported(`${pair} not supported by exchange ${this.exchange.id}`);
        }

        if (!this.exchange.has[fetchType]) {
            throw new NotSupported(`${fetchType} not supported by exchange ${this.exchange.id}`);
        }

        let data = await this.exchange.fetchOHLCV(pair);

        // let df = new dfd.DataFrame(data, {columns: Object.keys(ticker)});
        let df = new dfd.DataFrame(data, {columns: ['timestamp', 'open', 'high', 'low', 'close', 'volume']});
        // console.log(df);

        return Promise.resolve(df);
    }

    //
    // async fetchTicker() {
    //     console.log( await this.exchange.fetchTicker(this.config.pair) );
    // }

}
