const mempoolJS = require('@mempool/mempool.js');
const EventEmitter = require('../TradeEventEmitter');
const AbstractFeeProvider = require('./AbstractFeeProvider');

class BitcoinMempoolProvider extends AbstractFeeProvider {

    static EVENT_FEES_RECOMMENDED = 'EVENT_FEES_RECOMMENDED';

    static async getFee() {

        const { bitcoin: { fees } } = mempoolJS({
            hostname: 'mempool.space'
        });

        let feesRecommended = await fees.getFeesRecommended();
        let selectedFee = feesRecommended.fastestFee;

        EventEmitter.emit(BitcoinMempoolProvider.EVENT_FEES_RECOMMENDED, selectedFee);

        return selectedFee * 0.00000001; // satoshi to bitcoin
    }
}

module.exports = BitcoinMempoolProvider;