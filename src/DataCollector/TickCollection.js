const moment = require("moment");
const ItemCollection = require("../Data/ItemCollection");

class TickCollection extends ItemCollection {

    ago(time, unit, from) {
        for(let n = this.count - 1; n >= 0; n--) {
            if(this.items[n]) {
                if (from.moment.diff(this.items[n].moment, unit) >= time) {
                    return this.items[n];
                }
            }
        }

        return null;
    }
}

module.exports = TickCollection