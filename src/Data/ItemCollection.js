const moment = require("moment");

class ItemCollection {

    /**
     * @type {AbstractItem[]}
     */
    items = [];

    /**
     * @param {AbstractItem} item
     * @return ItemCollection
     */
    add(item) {
        this.items.push(item);
        return this;
    }

    /**
     * @param {AbstractItem[]} items
     * @return ItemCollection
     */
    set(items = []) {
        this.items = items;
        return this;
    }

    get toArray(){
        return this.items;
    }

    get first() {
        return this.items[0];
    }

    get last() {
        return this.items[this.count-1];
    }

    /**
     * @param {number} n
     * @return ItemCollection
     */
    getNLasts(n) {
        return new ItemCollection().set(
            this.items.slice(Math.max(this.count - n, 0))
        );
    }

    at(n) {
        return this.items[n];
    }

    get isEmpty() {
        return this.items.length === 0;
    }

    get count() {
        return this.items.length;
    }

    get sum() {
        return this.items.reduce((previousItem, currentItem) => previousItem.value + currentItem.value);
    }
}

module.exports = ItemCollection;