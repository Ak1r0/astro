const moment = require("moment");

class AbstractItem {

    constructor(eventTime) {
        if (this.constructor === AbstractItem) {
            throw new TypeError('Abstract class "AbstractItem" cannot be instantiated directly');
        }

        this.moment = moment(eventTime);
    };

    /**
     * @returns {number}
     */
    get value() {
        throw new TypeError('Getter value() must be implemented');
    }
}

module.exports = AbstractItem;