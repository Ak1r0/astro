const BinanceApi = require("node-binance-api");
const Tick = require("../../DataCollector/Tick");
const AbstractTradesProvider = require("./AbstractTradesProvider");

class BinanceProvider extends AbstractTradesProvider {

    /**
     * @type {BinanceApi}
     */
    #binanceApi;

    constructor() {
        super();
        this.#binanceApi = new BinanceApi().options({
            APIKEY: '<key>',
            APISECRET: '<secret>',
            // verbose: true, // Add extra output when subscribing to WebSockets, etc
            // log: log => {
            //     console.log(log); // You can create your own logger here, or disable console output
            // }
        });
    }

    /**
     * @param {string} pair
     * @param {Number} interval
     * @param {CallableFunction} newTickCallback
     */
    async loadHistory(pair, interval, newTickCallback) {
        // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
        await this.#binanceApi.candlesticks(pair, interval, (error, ticks, symbol) => {
            if(!Array.isArray(ticks)) {
                console.warn("No ticks history found");
                return;
            }

            ticks.forEach((tick) => {
                let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = tick;
                newTickCallback(
                    new Tick(low, high, open, close, volume, time)
                );
            });
        }, {
            limit: 500,
            //fromTime: fromTime.format('x'),
            //endTime: 1514764800000
        });
    }

    /**
     * @param {string} pair
     * @param {Number} interval
     * @param {CallableFunction} newTickCallback
     */
    async waitForTicks(pair, interval, newTickCallback) {

        this.#binanceApi.websockets.candlesticks([pair], interval, (candlesticks) => {
            let { e:eventType, E:eventTime, s:symbol, k:sticks } = candlesticks;
            let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = sticks;

            newTickCallback(
                new Tick(low, high, open, close, volume, eventTime)
            );
        });
    }

    test() {
        this.#binanceApi.prices('BTCEUR', (error, ticker) => {
            console.info("Price of BTC: ", ticker.BTCEUR);
        });

        this.#binanceApi.bookTickers('BTCEUR', (error, ticker) => {
            console.info("bookTickers", ticker);
        });
    }
}

module.exports = BinanceProvider;