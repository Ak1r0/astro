import AbstractItem from "./AbstractItem";

export default class ItemCollection<itemType extends AbstractItem> {

    protected items: { [key: number]: itemType } = {};

    protected keys: number[] = [];

    private _sum: number = 0;

    constructor(items?: itemType[]) {
        items && items.forEach(item => this.add(item));
    }

    get sum(): number {
        return this._sum;
    }

    get size(): number {
        return this.keys.length;
    }

    toArray(): itemType[] {
        return Object.values(this.items);
    }

    add(item: itemType): ItemCollection<itemType> {
        if (item.key in this.items) {
            return this.set(item);
        }

        this.items[item.key] = item;
        this.keys.push(item.key);
        this._sum += item.value;

        return this;
    }

    set(item: itemType): ItemCollection<itemType> {
        this._sum -= this.items[item.key].value;
        this.items[item.key] = item;
        this._sum += item.value;

        return this;
    }

    get(key: number): itemType {
        return this.items[key];
    }

    getAt(n: number): itemType {
        return this.items[this.keys[n]];
    }

    getFirst(): itemType {
        return this.items[this.keys[0]];
    }

    getLast(): itemType {
        return this.items[this.keys[this.size - 1]];
    }

    getNLasts(n: number): ItemCollection<itemType> {
        if (n > this.size) {
            throw new RangeError(`${n} too big for ItemCollection.getNLast (max: ${this.size})`);
        }

        return new ItemCollection<itemType>(
            this.toArray().slice(-n)
        );
    }
}
