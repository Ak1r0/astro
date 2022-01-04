const moment = require("moment");

class ItemCollection {

    items = [];

    add(item) {
        this.items.push(item);
    }

    get all(){
        return this.items;
    }

    get first() {
        return this.items[0];
    }

    get last() {
        return this.items[this.count-1];
    }

    getNLasts(n) {
        return this.items.slice(Math.max(this.count - n, 0))
    }

    get isEmpty() {
        return this.items.length === 0;
    }

    get count() {
        return this.items.length;
    }
}

module.exports = ItemCollection;