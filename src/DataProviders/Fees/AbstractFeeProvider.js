class AbstractFeeProvider {
    constructor() {
        if (this.constructor === AbstractFeeProvider) {
            throw new TypeError('Abstract class "AbstractFeeProvider" cannot be instantiated directly');
        }
    }

    /**
     * @returns {number}
     */
    static async getFee() {
        throw new TypeError('waitForTicks() must be implemented');
    }
}

module.exports = AbstractFeeProvider;