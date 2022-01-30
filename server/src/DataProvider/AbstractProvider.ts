import {Exchange, Params} from "ccxt";
import {DataFrame} from "danfojs-node";

export type FetchType = 'fetchTicker' | 'fetchOrderBook' | 'fetchTrades' | 'fetchOHLCV';

export default abstract class AbstractProvider {
    constructor(public exchange: Exchange) {}
    abstract fetch(symbol: string,  timeframe: string, fetchType?: FetchType, params?: Params): Promise<DataFrame>;
}
