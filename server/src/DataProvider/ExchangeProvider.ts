import ccxt from "ccxt";
import AbstractProvider, {FetchType} from "./AbstractProvider";
import * as dfd from "danfojs-node";
import { wait } from "../helpers";

export default class ExchangeProvider extends AbstractProvider {

    private areMarketsLoaded: boolean = false;

    private lastTimestamp : number | undefined;

    constructor(public exchange: ccxt.Exchange) {
        super(exchange);
        this.preLoadMarkets();
        console.log('Echange '+exchange.id+" loaded");
    }

    // To accelerate first fetch
    async preLoadMarkets() {
        let markets = await this.exchange.loadMarkets();
        this.areMarketsLoaded = true;
        console.log('Markets loaded : ', markets);
        return markets;
    }

    /**
     * Synchronizes with the server
     * Wait for next time-tick in minutes
     */
    async sync(waitFor: number) {
        let oneMinute = 60000;
        let serverTime = await this.exchange.fetchTime();
        let timeDifference = serverTime % (oneMinute * waitFor);
        console.log('wait for (s)', (timeDifference/1000));
        await wait(Math.max(timeDifference, this.exchange.rateLimit) + 1000); // Waits 1s more to make sure the prices were updated
    }

    async fetch(pair: string, timeframe: string, fetchType: FetchType = 'fetchOHLCV', params?: ccxt.Params): Promise<dfd.DataFrame> {

        if(!this.areMarketsLoaded) return Promise.reject('Markets are not loaded');

        if(!this.exchange.symbols.includes(pair)) {
            throw new ccxt.NotSupported(`${pair} not supported by exchange ${this.exchange.id}`);
        }

        if(this.exchange.timeframes[timeframe] === undefined) {
            throw new ccxt.NotSupported(`${timeframe} not supported by exchange ${this.exchange.id}`);
        }

        if (!this.exchange.has[fetchType]) {
            throw new ccxt.NotSupported(`${fetchType} not supported by exchange ${this.exchange.id}`);
        }

        let data = await this.exchange.fetchOHLCV(pair, timeframe, this.lastTimestamp);
        console.log('** New data for ', pair, timeframe, this.exchange.id, data);

        if(data.length == 0){
            return Promise.reject('No data fetched');
        }

        // let df = new dfd.DataFrame(data, {columns: Object.keys(ticker)});
        let df = new dfd.DataFrame(data, {columns: ['timestamp', 'open', 'high', 'low', 'close', 'volume']});

        let lastTimeframe = df.tail(1 );
        this.lastTimestamp = lastTimeframe.iat(0, 0) + 1; // add 1 millisecond to not get same values twice

        return Promise.resolve(df);
    }
}
