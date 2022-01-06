const Ticker = require("../Chart/Ticker");
const AbstractStrategy = require("./AbstractStrategy");
const TimeframeConfig = require("../Models/TimeframeConfig");

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

    deltasStats = {
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

                    this.#runOnNewTick(timeframe);
                }
            );
    }

    /**
     * @param {Timeframe} timeframe
     **/
    #runOnNewTick(timeframe) {
        let lastTick = timeframe.last;
        let delta = Math.abs(lastTick.close - lastTick.open);
        this.deltaSum += delta;
        this.deltas.push(delta);
        this.deltas.sort((a, b) => a - b);
        let n = (this.deltas.length - 1);

        this.deltasStats.median = (n % 2 === 0)
            ? (this.deltas[n / 2] + this.deltas[n / 2 + 1]) / 2
            : this.deltas[(n + 1) / 2];

        this.deltasStats.high = this.deltas[n];
        this.deltasStats.low = this.deltas[0];
        this.deltasStats.moy = this.deltaSum / this.deltas.length;

        printer.temp("table", this.deltasStats);
    }
}

module.exports = MicroVariationStrategy;