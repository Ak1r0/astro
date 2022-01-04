const moment = require("moment");
const {config} = require('../../Config');

class CandleChart {
    /**
     * @type {[CandleStick]}
     */
    #candles = [];
    #moy = 0;

    /**
     * @param {CandleStick} candle
     */
    addCandle(candle) {
        this.#candles.push(candle);

        // Dont overcharge the queue while we have enought data to work
        // if(null !== this.last && null !== this.getLastAgo(
        //     config.triggerBuy.frameTime,
        //     config.triggerBuy.frameTimeUnit,
        //     this.last)
        // ) {
        //     this.#candles.shift();
        // }
    }

    calcMoy() {
        this.#moy = 0;
        this.#candles.forEach((tick) => this.#moy += tick.moy);
        this.#moy /= this.countItems;
    }

    /**
     * @returns {number}
     */
    get countItems() {
        return this.#candles.length;
    }

    /**
     * @returns {number}
     */
    get moy() {
        return this.#moy;
    }

    /**
     * @returns {CandleStick}
     */
    get first() {
        return this.#candles[0];
    }

    /**
     * @returns {CandleStick}
     */
    get last() {
        return this.#candles[this.countItems-1];
    }

    /**
     * @param n
     * @returns {CandleStick[]}
     */
    getNLasts(n) {
        return this.#candles.slice(Math.max(this.countItems - n, 0))
    }

    /**
     * @param n
     * @returns {CandleStick}
     */
    getN(n) {
        return this.#candles[n];
    }

    /**
     *
     * @param {int} time
     * @param {string} unit
     * @param {CandleStick} from
     * @returns {null|CandleStick}
     */
    getLastAgo(time, unit, from) {
        let endTime = moment(from.eventTime);

        let Candle = null;

        for(let n = this.countItems - 1; n >= 0; n--) {
            let startTime = moment(this.getN(n).eventTime);

            if(endTime.diff(startTime, unit) >= time) {
                Candle = this.getN(n);
                break;
            }
        }

        return Candle;
    }

    get candles() {
        return this.#candles;
    }
}

class CandleStick {

    static get UP_DIRECTION() {
        return 'UP';
    }

    static get DOWN_DIRECTION() {
        return 'DOWN';
    }

    constructor(low, high, open, close, volume, eventTime) {
        this.low = parseFloat(low);
        this.high = parseFloat(high);
        this.open = parseFloat(open);
        this.close = parseFloat(close);
        this.volume = parseFloat(volume);
        this.eventTime = eventTime;
        this.direction = open < close ? CandleStick.UP_DIRECTION : CandleStick.DOWN_DIRECTION;
        this.eventReadableTIme = moment(eventTime).format('YYYY-MM-DD HH:mm:ss');
    }

    get moy() {
        return (this.low + this.high) / 2;
    }
}

exports.CandleStick = CandleStick;
exports.CandleChart = CandleChart;