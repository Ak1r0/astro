const mempoolJS = require('@mempool/mempool.js');
const AbstractFeeProvider = require('./AbstractFeeProvider');

class BitcoinMempoolProvider extends AbstractFeeProvider {

    static EVENT_FEES_RECOMMENDED = 'EVENT_FEES_RECOMMENDED';

    /**
     * @type {number|null}
     */
    static fees = null;

    static async getFee() {

        if(null !== this.fees){
            return this.fees; //todo Add a deadline for this cache
        }

        const { bitcoin: { fees } } = mempoolJS({
            hostname: 'mempool.space'
        });

        let feesRecommended = await fees.getFeesRecommended();
        let selectedFee = feesRecommended.fastestFee;

        this.fees = selectedFee * 0.00000001; // satoshi to bitcoin
        return this.fees;
    }
}

module.exports = BitcoinMempoolProvider;