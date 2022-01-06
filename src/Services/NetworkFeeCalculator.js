const BitcoinMempoolProvider = require('../DataProviders/Fees/BitcoinMempoolProvider');

class NetworkFeeCalculator {

    currencies = {
        "BTC": BitcoinMempoolProvider
    }

    /**
     * @param {string} currency 
     */
    getFee(currency) {
        if(!this.currencies[currency]) {
            throw new TypeError(`Currency '${currency}' is not configured to get fees`);
        }
    }

}

module.exports = NetworkFeeCalculator;