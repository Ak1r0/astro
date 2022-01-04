const {config} = require('../../Config');

const {CandleStick} = require("../Data/Candles");
const BinanceApi = require('node-binance-api');
const moment = require("moment");

class BinanceConnector {

    /**
     * @type {BinanceConnector}
     */
    #binanceApi;

    constructor() {
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
     * @param {Number} period
     * @param {CandleChart} candleChart
     * @param {CallableFunction} doneCallBack
     */
    async loadHistory(pair, interval, period, candleChart, doneCallBack) {

        let fromTime = moment().subtract(period, 'minutes');

        // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
        await this.#binanceApi.candlesticks(pair, interval, (error, ticks, symbol) => {
            if(!Array.isArray(ticks)) {
                console.warn("No ticks found from time "+fromTime.format('x')+' ('+fromTime.format('YYYY-MM-DD HH:mm:ss')+')');
                return;
            }

            ticks.forEach((tick) => {
                let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = tick;
                candleChart.addCandle(
                    new CandleStick(low, high, open, close, volume, time)
                );
            });

            doneCallBack();
        }, {
            limit: 500,
            //fromTime: fromTime.format('x'),
            //endTime: 1514764800000
        });
    }

    /**
     * @param {CandleChart} candleChart
     * @param {CallableFunction} doneCallBack
     */
    live(candleChart, doneCallBack) {
        // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
        this.#binanceApi.websockets.candlesticks([config.trader.pair.symbol], config.trader.pair.candle_interval, (candlesticks) => {
            let { e:eventType, E:eventTime, s:symbol, k:sticks } = candlesticks;
            let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = sticks;

            candleChart.addCandle(
                new CandleStick(low, high, open, close, volume, eventTime)
            );

            doneCallBack();
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

module.exports = BinanceConnector;

