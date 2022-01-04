const TickCollection = require("./TickCollection");
const eventManager = require("../Services/EventManager");

class Ticker {

    static EVENT_NEW_TICK = 'EVENT_TICKER_NEW_TICK';

    /**
     * @type {AbstractTradesProvider}
     */
    tradesProvider;

    /**
     * @type {TickCollection}
     */
    tickCollection;

    constructor(tradesProvider) {
        this.tradesProvider = tradesProvider;
        this.tickCollection = new TickCollection();
    }

    async startCollectingData(pair, interval)
    {
        if(this.tickCollection.isEmpty) {
            await this.tradesProvider.loadHistory(pair, interval, /** @param {Tick} tick **/ (tick) => {
                this.tickCollection.add(tick);
                eventManager.emit(Ticker.EVENT_NEW_TICK, tick, this.tickCollection);
            });
        }

        this.tradesProvider.waitForTicks(pair, interval, /** @param {Tick} tick **/ (tick) => {
            this.tickCollection.add(tick);
            eventManager.emit(Ticker.EVENT_NEW_TICK, tick, this.tickCollection);
        });
    }
}

module.exports = Ticker;