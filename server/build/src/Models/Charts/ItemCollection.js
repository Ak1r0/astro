"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemCollection {
    items = {};
    keys = [];
    _sum = 0;
    constructor(items) {
        items && items.forEach(item => this.add(item));
    }
    get sum() {
        return this._sum;
    }
    get size() {
        return this.keys.length;
    }
    toArray() {
        return Object.values(this.items);
    }
    add(item) {
        if (item.key in this.items) {
            return this.set(item);
        }
        this.items[item.key] = item;
        this.keys.push(item.key);
        this._sum += item.value;
        return this;
    }
    set(item) {
        this._sum -= this.items[item.key].value;
        this.items[item.key] = item;
        this._sum += item.value;
        return this;
    }
    get(key) {
        return this.items[key];
    }
    getAt(n) {
        return this.items[this.keys[n]];
    }
    getFirst() {
        return this.items[this.keys[0]];
    }
    getLast() {
        return this.items[this.keys[this.size - 1]];
    }
    getNLasts(n) {
        if (n > this.size) {
            throw new RangeError(`${n} too big for ItemCollection.getNLast (max: ${this.size})`);
        }
        return new ItemCollection(this.toArray().slice(-n));
    }
}
exports.default = ItemCollection;
//# sourceMappingURL=ItemCollection.js.map