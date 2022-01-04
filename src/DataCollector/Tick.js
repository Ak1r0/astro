const moment = require("moment");

class Tick {

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
        this.moment = moment(eventTime);
        this.direction = open < close ? Tick.UP_DIRECTION : Tick.DOWN_DIRECTION;
    }

    get moy() {
        return (this.low + this.high) / 2;
    }
}

module.exports = Tick;