const moment = require("moment");
const AbstractItem = require("../Data/AbstractItem");

class Tick extends AbstractItem {

    static get UP_DIRECTION() {
        return 'UP';
    }

    static get DOWN_DIRECTION() {
        return 'DOWN';
    }

    constructor(low, high, open, close, volume, eventTime) {
        super(eventTime);
        this.low = parseFloat(low);
        this.high = parseFloat(high);
        this.open = parseFloat(open);
        this.close = parseFloat(close);
        this.volume = parseFloat(volume);
        this.direction = open < close ? Tick.UP_DIRECTION : Tick.DOWN_DIRECTION;
    }

    /**
     * @return {number}
     */
    get value() {
        return this.close;
    }
}

module.exports = Tick;