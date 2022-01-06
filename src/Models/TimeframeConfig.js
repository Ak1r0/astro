class TimeframeConfig {

    constructor(
        baseCurrency = "BTC",
        quotedCurrency = "EUR",
        interval =  1,
        interval_unit = "minutes",
        range = 30,
        range_unit = "minutes"
    ) {
        this.baseCurrency = baseCurrency;
        this.quotedCurrency = quotedCurrency;
        this.interval = interval;
        this.interval_unit = interval_unit;
        this.range = range;
        this.range_unit = range_unit;
    }


    get pair() {
        return this.baseCurrency+this.quotedCurrency;
    }

    get name() {
        return this.baseCurrency+this.quotedCurrency+'_'+this.interval+this.interval_unit;
    }
}

module.exports = TimeframeConfig;