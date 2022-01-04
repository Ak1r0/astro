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

    }

    /**
     * @param {string} pair
     * @param {Number} interval
     * @param {CallableFunction} newTickCallback
     */
    async loadHistory(pair, interval, newTickCallback) {
        
    }
}

module.exports = AbstractTradesProvider;