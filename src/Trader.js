const BuyTreshold = require("./Indicators/BuyTreshold");
const BinanceConnector = require('./DataProviders/BinanceConnector');

const {CandleStick, CandleChart} = require("./Models/Candles");
const EventEmitter = require('./TradeEventEmitter')

const {config} = require("../Config");

/**
 * todo
 */
class Trader {

    static EVENT_TRADER_STARTED = 'EVENT_TRADER_STARTED';
    static EVENT_CANDLECHART_HISTORY_LOADED = 'EVENT_CANDLECHART_HISTORY_LOADED';
    static EVENT_CANDLECHART_UPDATED = 'EVENT_CANDLECHART_UPDATED';

    /**
     * @type {CandleChart}
     */
    candleChart;

    /**
     * @type {Object}
     */
    #connector = new BinanceConnector();

    #countMarketUpdateWithoutEvent = 0;

    constructor()
    {
        this.candleChart = new CandleChart();

        this.#addEventListeners();
    }

    #addEventListeners()
    {
        EventEmitter.once(Trader.EVENT_CANDLECHART_HISTORY_LOADED, ()=> { this.#live() });
    }

    async run() {
        EventEmitter.emit(Trader.EVENT_TRADER_STARTED, this);

        await this.#connector.loadHistory(
            config.trader.pair.symbol,
            config.trader.pair.candle_interval,
            config.trader.strategy.buySettings.variation_period,
            this.candleChart,
            () => {
                EventEmitter.emit(Trader.EVENT_CANDLECHART_HISTORY_LOADED, this);
            }
        );

        config.trader.pair.fee = await this.#loadRecommendedFees();
    }

    #live() {
        this.#connector.live(this.candleChart, () => {
            this.candleChart.calcMoy();
            EventEmitter.emit(Trader.EVENT_CANDLECHART_UPDATED, this);
            this.#tryToBuy();
        });
    }

    #tryToBuy()
    {
        this.#countMarketUpdateWithoutEvent++;

        let last = this.candleChart.last;
        let prev = this.candleChart.getLastAgo(
            config.trader.strategy.buySettings.variation_period,
            'minutes',
            last,
        );

        if(null === prev) return;

        if (!new BuyTreshold().isGreen(prev, last, config.trader.strategy.buySettings.thresholds)) {
           return;
        }


    }

    async #loadRecommendedFees()
    {
        let feesConnector = require('./DataProviders/'+config.trader.pair.fees_connector);
        let fee = await feesConnector.getFee();

        return fee;
    }
}

module.exports = Trader;