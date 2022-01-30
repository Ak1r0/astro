"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemCollection_1 = __importDefault(require("../../../src/Models/Charts/ItemCollection"));
const AbstractItem_1 = __importDefault(require("../../../src/Models/Charts/AbstractItem"));
class myItem extends AbstractItem_1.default {
    constructor(key) {
        super(key);
    }
    get value() {
        return 5;
    }
}
describe('Test ItemCollection.ts', () => {
    let itemCollection;
    let item, item2, item3;
    beforeEach(() => {
        item = new myItem(123);
        item2 = new myItem(456);
        item3 = new myItem(789);
    });
    test('toArray()', () => {
        let myArray = [item, item2, item3];
        itemCollection = new ItemCollection_1.default(myArray);
        expect(itemCollection.toArray()).toStrictEqual(myArray);
    });
    test('add()', () => {
        itemCollection = new ItemCollection_1.default();
        itemCollection.add(item);
        itemCollection.add(item);
        itemCollection.add(item2);
        expect(itemCollection.toArray()).toHaveLength(2);
        expect(itemCollection.sum).toEqual(10);
    });
    test('set()', () => {
        itemCollection = new ItemCollection_1.default([item, item, item2]);
        expect(itemCollection.toArray()).toHaveLength(2);
        expect(itemCollection.sum).toEqual(10);
    });
    test('getFirst() & getLast()', () => {
        itemCollection = new ItemCollection_1.default([item, item2, item3]);
        expect(itemCollection.getFirst()).toStrictEqual(item);
        expect(itemCollection.getLast()).toStrictEqual(item3);
    });
    test('getAt()', () => {
        itemCollection = new ItemCollection_1.default([item, item2, item3]);
        expect(itemCollection.getAt(1)).toStrictEqual(item2);
    });
    test('size()', () => {
        let array = [item, item2, item3];
        itemCollection = new ItemCollection_1.default(array);
        expect(itemCollection.size).toEqual(array.length);
    });
    test('getNLasts()', () => {
        let array = [item, item2, item3];
        itemCollection = new ItemCollection_1.default(array);
        expect(itemCollection.getNLasts(2).toArray()).toEqual([item2, item3]);
        expect(() => { itemCollection.getNLasts(4); }).toThrowError(RangeError);
    });
});
//# sourceMappingURL=ItemCollection.test.js.map