"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeframeConfig {
    baseCurrency;
    quotedCurrency;
    interval;
    unitOfTime;
    constructor(baseCurrency = "BTC", quotedCurrency = "EUR", interval = 1, unitOfTime = "minutes") {
        this.baseCurrency = baseCurrency;
        this.quotedCurrency = quotedCurrency;
        this.interval = interval;
        this.unitOfTime = unitOfTime;
    }
    get pair() {
        return this.baseCurrency + this.quotedCurrency;
    }
    get name() {
        return this.baseCurrency + this.quotedCurrency + '_' + this.interval + this.unitOfTime;
    }
}
exports.default = TimeframeConfig;
//# sourceMappingURL=TimeframeConfig.js.map