const BinanceApi = require("node-binance-api");
const Tick = require("../../Chart/Tick");
const AbstractTradesProvider = require("./AbstractChartProvider");

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
     * @return {number}
     */
    static getFee() {
        return 0.1 / 100;
    }

    /**
     * @param {Timeframe} timeframe
     * @param {CallableFunction} onUpdateCallback
     */
    async loadHistory(timeframe, onUpdateCallback = () => {}) {
        // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M

        return this.#binanceApi.candlesticks(
            timeframe.config.pair,
            this.formatInterval(timeframe.config),
            (error, ticks, symbol) => {
                if (!Array.isArray(ticks)) {
                    console.warn("No ticks history found");
                    return;
                }

                ticks.forEach((tick) => {
                    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = tick;
                    timeframe.add(
                        new Tick(symbol, low, high, open, close, volume, time)
                    );
                    onUpdateCallback();
                });
            }, {
                limit: 500,
                //fromTime: fromTime.format('x'),
                //endTime: 1514764800000
            }
        );
    }

    /**
     * @param {Timeframe} timeframe
     * @param {CallableFunction} onUpdateCallback
     */
    async waitForTicks(timeframe, onUpdateCallback = () => {}) {

        let pairs = [];

        this.#binanceApi.websockets.candlesticks(
            [timeframe.config.pair],
            this.formatInterval(timeframe.config),
            (candlesticks) => {
                let {e: eventType, E: eventTime, s: symbol, k: sticks} = candlesticks;
                let {
                    o: open,
                    h: high,
                    l: low,
                    c: close,
                    v: volume,
                    n: trades,
                    i: interval,
                    x: isFinal,
                    q: quoteVolume,
                    V: buyVolume,
                    Q: quoteBuyVolume
                } = sticks;

                timeframe.add(
                    new Tick(symbol, low, high, open, close, volume, eventTime)
                );

                onUpdateCallback();
            }
        );
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