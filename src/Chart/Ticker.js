const Timeframe = require("./Timeframe");
const eventManager = require("../Services/EventManager");

class Ticker {

    static EVENT_TICKER_INIT = 'EVENT_TICKER_INIT';
    static EVENT_TICKER_START = 'EVENT_TICKER_START';
    static EVENT_TICK = 'EVENT_TICK';
    static EVENT_HISTORY_TICK = 'EVENT_HISTORY_TICK';

    /**
     * @type {AbstractChartProvider}
     */
    chartProvider;

    /**
     * @type {Timeframe[]}
     */
    timeframes = [];

    /**
     *
     * @param {AbstractChartProvider} chartProvider
     * @param {TimeframeConfig[]} configs
     */
    constructor(chartProvider, configs) {
        this.chartProvider = chartProvider;
        configs.forEach((config) => {
           this.timeframes.push(new Timeframe(config));
        });
    }

    /**
     * @return {Promise<void>}
     */
    async live()
    {
        eventManager.emit(Ticker.EVENT_TICKER_INIT, this.timeframes);

        for(let n = 0; n < this.timeframes.length; n++) {
            let timeframe = this.timeframes[n];
            if(timeframe.isEmpty) {
                await this.chartProvider.loadHistory(
                    timeframe,
                    () => eventManager.emit(Ticker.EVENT_HISTORY_TICK + '_' + timeframe.config.name, timeframe)
                );
            }
        }

        eventManager.emit(Ticker.EVENT_TICKER_START);

        let timeframe = this.timeframes[0]; //todo

        this.chartProvider.waitForTicks(
            timeframe,
            () => eventManager.emit(Ticker.EVENT_TICK+'_'+timeframe.config.name, timeframe)
        );
    }
}

module.exports = Ticker;