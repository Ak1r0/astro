const EventEmitter = require('./TradeEventEmitter');
const BuyTreshold = require("./Indicators/BuyTreshold");
const {config} = require("../Config");

class ConfigOptimizer {

    static EVENT_CONFIG_UPDATED = 'EVENT_CONFIG_OPTIMIZER_UPDATE';

    #bidsSettingTresholdPcCounter = 0;

    constructor() {
        this.#addEventListener();
    }

    #addEventListener() {
        EventEmitter.on(BuyTreshold.EVENT_TRESHOLD_PC_IS_RED, () => { this.bidsSettingTresholdPc(false) });
        EventEmitter.on(BuyTreshold.EVENT_TRESHOLD_PC_IS_GREEN, () => { this.bidsSettingTresholdPc(true) });
    }

    bidsSettingTresholdPc(isGreen) {
        if (isGreen) this.#bidsSettingTresholdPcCounter = 0;
        else this.#bidsSettingTresholdPcCounter++;

        if( this.#bidsSettingTresholdPcCounter >= 10 ) {
            let oldSetting = config.trader.thresholds.percent;
            let newSetting = config.trader.thresholds.percent - 0.01;
            config.trader.thresholds.percent = Math.round(newSetting * 100) / 100; // Tip to round to 2 decimals

            this.#bidsSettingTresholdPcCounter = 0;
            EventEmitter.emit(ConfigOptimizer.EVENT_CONFIG_UPDATED, {
                settingName: 'config.bidsSetting.thresholds.percent',
                oldSetting: oldSetting,
                newSetting: config.trader.thresholds.percent,
            });
        }
    }

}

module.exports = ConfigOptimizer;