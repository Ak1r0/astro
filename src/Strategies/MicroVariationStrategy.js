const Ticker = require("../Chart/Ticker");
const AbstractStrategy = require("./AbstractStrategy");
const TimeframeConfig = require("../Models/TimeframeConfig");
const RSI = require("../Indicators/RSI");

const EventEmitter = require("../Services/EventManager");
const printer = require("../Services/Printer");
const BitcoinMempoolProvider = require("../DataProviders/Fees/BitcoinMempoolProvider");
const BinanceProvider = require("../DataProviders/Charts/BinanceProvider");

class MicroVariationStrategy extends AbstractStrategy {

    config = {
        minimumTicksForAnalyze: 0,
        maxHoldedPositions: 3,
        buyQuantity: 20,
        timeframes: [
            new TimeframeConfig("BTC", "EUR", 1, "minutes"),
        ]
    };

    deltas = [];
    deltaSum = 0;

    indicators = {
        high: null,
        low: null,
        moy: null,
        median: null,
    };

    calculs = {
        priceForQuantity: null,
        networkFees: null,
        platformFees: null,
        shouldSellAt: null,
        treshold: null,
        delta: null,
        buyCounter: 0,

    }

    volumes = {
        moy: null,
        all: [],
    };

    constructor(config) {
        super(config);
    }

    async run() {
        EventEmitter.on(Ticker.EVENT_TICK+'_'+this.config.timeframes[0].name,
            /**
             * @param {Timeframe} timeframe
             **/
            (timeframe) => {
                if(timeframe.count <= this.config.minimumTicksForAnalyze) return;

                this.#calculIndicators(timeframe);
                this.#makeDecision(timeframe);

                this.#log(timeframe);
            }
        );
    }

    #calculIndicators(timeframe) {
        let tick = timeframe.last;
        let lastTick = timeframe.at(timeframe.count-2);
        let delta = Math.abs(lastTick.close - tick.close);
        this.deltaSum += delta;
        this.deltas.push(delta);
        this.deltas.sort((a, b) => a - b);
        let n = (this.deltas.length - 1);

        this.indicators.median = (n % 2 === 0)
            ? (this.deltas[n / 2] + this.deltas[n / 2 + 1]) / 2
            : this.deltas[(n + 1) / 2];

        this.indicators.high = this.deltas[n];
        this.indicators.low = this.deltas[0];
        this.indicators.moy = this.deltaSum / this.deltas.length;

        this.indicators.RSI = RSI.calcul(timeframe.getNLasts(14));
    }

    /**
     * @param {Timeframe} timeframe
     **/
    #makeDecision(timeframe) {

        BitcoinMempoolProvider.getFee().then((fees) => {
            this.calculs.networkFees = fees;
        }); //todo calcul fees async with a timer to not slow down calculs
        if(null === this.calculs.networkFees){
            return;
        }


        let platformFees = BinanceProvider.getFee();

        /** @var {Tick} **/
        let tick = timeframe.last;

        this.calculs.low = tick.low;
        this.calculs.high = tick.high;
        this.calculs.close = tick.close;
        this.calculs.treshold = tick.close - this.indicators.median;

        if(tick.low < this.calculs.treshold){

            this.calculs.priceForQuantity = 1/tick.low * this.config.buyQuantity;
            let shouldSellAt = tick.low + this.calculs.networkFees;
            this.calculs.platformFees = shouldSellAt * platformFees;
            this.calculs.shouldSellAt = shouldSellAt + this.calculs.platformFees;
            this.calculs.delta = tick.high - this.calculs.shouldSellAt

            if(this.calculs.shouldSellAt <= tick.high) {
                printer.temp('log', 'BUY');
                this.calculs.buyCounter++;
                return;
            }
            printer.temp('log', 'DONT BUY');
            return;
        }
        printer.temp('log', 'LOW NOT LOW ENOUGH');
    }

    /**
     * @param {Timeframe} timeframe
     **/
    #log(timeframe) {
        printer.strategies.MicroVariationStrategy = {
            config: {type:"table", data: this.config.timeframes},
            timeframe: {type:"table", data: timeframe.getNLasts(3).toArray},
            indicators: {type:"table", data: this.indicators},
            calculs: {type:"table", data: this.calculs},
        }

        printer.print();
    }
}

module.exports = MicroVariationStrategy;