const EventEmitter = require("../Services/EventManager");
const Ticker = require("../DataCollector/Ticker");

class AbstractStrategy {

    config = {};

    constructor(config) {
        if (this.constructor === AbstractStrategy) {
            throw new TypeError('Abstract class "AbstractStrategy" cannot be instantiated directly');
        }

        this.config = {...this.config, ...config};
    }

    /**
     */
    async run() {

        EventEmitter.on(Ticker.EVENT_NEW_TICK,
            /**
             * @param {Tick} tick
             * @param {TickCollection} tickCollection
             **/
            (tick, tickCollection) => {
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