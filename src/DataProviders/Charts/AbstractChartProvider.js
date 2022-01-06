class AbstractChartProvider {

    static intervalsUnits = {
        // 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
        "minutes": "m",
        "hours": "h",
        "days": "d",
        "weeks": "w",
        "months": "M",
    }

    constructor() {
        if (this.constructor === AbstractChartProvider) {
            throw new TypeError('Abstract class "AbstractChartProvider" cannot be instantiated directly');
        }
    }

    /**
     * @param {Timeframe} timeframe
     * @param {CallableFunction} onUpdateCallback
     */
    async waitForTicks(timeframe, onUpdateCallback = () => {}) {
        throw new TypeError('waitForTicks() must be implemented');
    }

    /**
     * @param {Timeframe} timeframe
     * @param {CallableFunction} onUpdateCallback
     */
    async loadHistory(timeframe, onUpdateCallback = () => {}) {
        throw new TypeError('loadHistory() must be implemented');
    }

    /**
     * @return {number}
     */
    getFee() {
        throw new TypeError('getFee() must be implemented');
    }

    /**
     * @param {TimeframeConfig} timeframeConfig
     * @return {string}
     */
    formatInterval(timeframeConfig) {
        if (!AbstractChartProvider.intervalsUnits[timeframeConfig.interval_unit]) {
            throw new TypeError(`Unit '${timeframeConfig.interval_unit}' is not configured in AbstractTradesProvider`);
        }
        return timeframeConfig.interval.toString() + AbstractChartProvider.intervalsUnits[timeframeConfig.interval_unit];
    }
}

module.exports = AbstractChartProvider;