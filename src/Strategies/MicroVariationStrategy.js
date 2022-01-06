const Ticker = require("../Chart/Ticker");
const AbstractStrategy = require("./AbstractStrategy");
const TimeframeConfig = require("../Models/TimeframeConfig");
const RSI = require("../Indicators/RSI");

const EventEmitter = require("../Services/EventManager");
const printer = require("../Services/Printer");

class MicroVariationStrategy extends AbstractStrategy {

    config = {
        minimumTicksForAnalyze: 0,
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

    /**
     * @param {Timeframe} timeframe
     **/
    #makeDecision(timeframe) {

    }

    #calculIndicators(timeframe){
        let lastTick = timeframe.last;
        let delta = Math.abs(lastTick.close - lastTick.open);
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
        this.indicators.RSI2 = RSI.calcul2(timeframe.getNLasts(14));
    }

    /**
     * @param {Timeframe} timeframe
     **/
    #log(timeframe)
    {
        printer.strategies.MicroVariationStrategy = {
            config: {type:"table", data: this.config.timeframes},
            timeframe: {type:"table", data: timeframe.getNLasts(3).toArray},
            indicators: {type:"table", data: this.indicators},
        }

        printer.print();
    }
}

module.exports = MicroVariationStrategy;