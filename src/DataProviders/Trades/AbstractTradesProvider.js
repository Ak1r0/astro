class AbstractTradesProvider {
    constructor() {
        if (this.constructor === AbstractTradesProvider) {
            throw new TypeError('Abstract class "AbstractTradesProvider" cannot be instantiated directly');
        }
    }

    /**
     * @param {string} pair
     * @param {Number} interval
     * @param {CallableFunction} newTickCallback
     */
    async waitForTicks(pair, interval, newTickCallback) {
        throw new TypeError('waitForTicks() must be implemented');
    }

    /**
     * @param {string} pair
     * @param {Number} interval
     * @param {CallableFunction} newTickCallback
     */
    async loadHistory(pair, interval, newTickCallback) {
        throw new TypeError('loadHistory() must be implemented');
    }
}

module.exports = AbstractTradesProvider;