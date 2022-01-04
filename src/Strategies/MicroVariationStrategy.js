const EventEmitter = require("../Services/EventManager");
const Ticker = require("../DataCollector/Ticker");
const AbstractStrategy = require("./AbstractStrategy");

const printer = require("../Services/Printer");

class MicroVariationStrategy extends AbstractStrategy {

    config = {
        variationPeriod: 10, // minutes
        minimumTicksForAnalyze: 0,
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

        EventEmitter.on(Ticker.EVENT_NEW_TICK,
            /**
             * @param {Tick} tick
             * @param {TickCollection} tickCollection
             **/
            (tick, tickCollection) => {

                if(tickCollection.count <= this.config.minimumTicksForAnalyze) return;

                this.#runOnNewTick(tick, tickCollection);
            }
        );
    }

    /**
     * @param {Tick} tick
     * @param {TickCollection} tickCollection
     **/
    #runOnNewTick(tick, tickCollection) {

        let delta = Math.abs(tick.close - tick.open);
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