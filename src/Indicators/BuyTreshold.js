
const EventEmitter = require('../TradeEventEmitter');
const {config} = require("../../Config");

class BuyTreshold {

    static EVENT_TRESHOLD_IS_GREEN = 'EVENT_TRESHOLD_IS_GREEN';
    static EVENT_TRESHOLD_IS_RED = 'EVENT_TRESHOLD_IS_RED';

    /**
     * @param {CandleStick} firstCandle
     * @param {CandleStick} lastCandle
     * @param {Object} thresholds
     */
    isGreen(firstCandle, lastCandle, thresholds)
    {
        let isPriceGreen = false;
        let isRealGreen = false;
        let isPcGreen = false;

        let price1 = firstCandle.high;
        let price2 = lastCandle.low;

        let delta = price2 - price1;

        if (null !== thresholds.currency_price && delta <= (thresholds.currency_price * -1)) {
            isPriceGreen = true;
        }

        let tradeQuantity = config.trader.strategy.buySettings.trade_quantity / lastCandle.low;
        let potentialRawGain = tradeQuantity * firstCandle.high;
        let networkFee = config.trader.pair.fee;
        let platformFee = potentialRawGain * config.trader.pair.platform_fee;
        let potentialRealGain = potentialRawGain - networkFee - platformFee - config.trader.strategy.buySettings.trade_quantity;
        if (null !== thresholds.real_gain && potentialRealGain >= thresholds.real_gain) {
            isRealGreen = true;
        }

        let pc = (delta / price1 * 100);
        if (null !== thresholds.percent && pc <= (thresholds.percent * -1)) {
            isPcGreen = true;
        }

        let eventData = {
            candles: {
                first: firstCandle,
                last: lastCandle,
            },
            datas: {
                price1: price1,
                price2: price2,
                delta: delta,
                isPriceGreen: isPriceGreen,
                tradeQuantity: tradeQuantity,
                rawGain: potentialRawGain,
                realGain: potentialRealGain,
                isRealGreen: isRealGreen,
                '%': pc,
                isPcGreen: isPcGreen,
            }
        };

        if(isPriceGreen || isRealGreen || isPcGreen) {
            EventEmitter.emit(BuyTreshold.EVENT_TRESHOLD_IS_GREEN, eventData);
            return true;
        }

        EventEmitter.emit(BuyTreshold.EVENT_TRESHOLD_IS_RED, eventData);
        return false;
    }
}

module.exports = BuyTreshold;