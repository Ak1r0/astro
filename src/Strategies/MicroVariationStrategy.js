const EventEmitter = require("../Services/EventManager");
const Ticker = require("../DataCollector/Ticker");

class MicroVariationStrategy extends AbstractStrategy {

    config = {
        variationPeriod: 10, // minutes
        minimumTicksForAnalyze: 0,
    };

    data = {
        deltas: {
            moy: null,
            median: null,
            all: [],
        },
        volumes: {
            moy: null,
            all: [],
        }

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

    }
}