const moment = require("moment");
const ItemCollection = require("../Models/ItemCollection");

class Timeframe extends ItemCollection {

    /**
     * @type {Tick[]}
     */
    items = [];

    /**
     *@type {TimeframeConfig}
     */
    config;

    /**
     * @param {TimeframeConfig} config
     */
    constructor(config) {
        super();
        this.config = config;
    }

    /**
     * Get one Tick $time $unit (ie 30mn) before $from
     * @param {number} time
     * @param {string} unit
     * @param {moment} from
     *
     * @return {null|Tick}
     */
    getOneBefore(time, unit, from)
    {
        time = time * -1; // To go backward in time
        for(let n = this.count - 1; n >= 0; n--) {
            if(this.items[n]) {
                let diff = from.diff(this.items[n].moment, unit);
                if (diff >= time && diff <= 0) {
                    return this.items[n];
                }
            }
        }

        return null;
    }

    /**
     * Get all Ticks  $time $unit (ie 30mn) before $from
     * @param {number} time
     * @param {string } unit
     * @param {moment} from
     *
     * @return {Timeframe}
     */
    getFrameBefore(time, unit, from)
    {
        time = time * -1; // To go backward in time
        let frame = new Timeframe(this.config);

        for(let n = this.count - 1; n >= 0; n--) {
            if(this.items[n]) {
                let diff = from.diff(this.items[n].moment, unit);
                if (diff >= time && diff <= 0) {
                    frame.add(this.items[n]);
                }
            }
        }

        return frame;
    }
}

module.exports = Timeframe;