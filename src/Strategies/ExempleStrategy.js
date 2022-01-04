const AbstractStrategy = require("./AbstractStrategy");
const EventEmitter = require("../Services/EventManager");
const Ticker = require("../DataCollector/Ticker");
const MovingAverage = require("../Indicators/MovingAverage");
const RSI = require("../Indicators/RSI");
const MACD = require("../Indicators/MACD");
const printer = require("../Services/Printer");

class ExempleStrategy extends AbstractStrategy {
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

                let moy = MovingAverage.arithmetic(tickCollection.getNLasts(9));
                let mmp = MovingAverage.weighted(tickCollection.getNLasts(9));
                let mme = MovingAverage.exponential(tickCollection.getNLasts(9));
                let rsi = RSI.calcul(tickCollection.getNLasts(9));
                let macd = MACD.calcul(tickCollection, 14, 26);

                printer.temp('table', { moy, mmp, mme, rsi, macd });
            }
        );
    }
}


