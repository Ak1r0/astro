// import ItemCollection from "../../../src/Models/Charts/ItemCollection";
// import AbstractItem from "../../../src/Models/Charts/AbstractItem";
//
// class myItem extends AbstractItem {
//
//     constructor(key: number) {
//         super(key);
//     }
//
//     get value(): any {
//         return 5;
//     }
// }
//
// describe('Test ItemCollection.ts', () => {
//     let itemCollection: ItemCollection<myItem>;
//     let item: AbstractItem, item2: AbstractItem, item3: AbstractItem;
//
//     beforeEach(() => {
//         item = new myItem(123);
//         item2 = new myItem(456);
//         item3 = new myItem(789);
//     });
//
//     test('toArray()', () => {
//         let myArray = [item, item2, item3];
//         itemCollection = new ItemCollection(myArray);
//         expect(itemCollection.toArray()).toStrictEqual(myArray);
//     });
//
//     test('add()', () => {
//         itemCollection = new ItemCollection();
//         itemCollection.add(item);
//         itemCollection.add(item);
//         itemCollection.add(item2);
//         expect(itemCollection.toArray()).toHaveLength(2);
//         expect(itemCollection.sum).toEqual(10);
//     });
//
//     test('set()', () => {
//         itemCollection = new ItemCollection([item, item, item2]);
//         expect(itemCollection.toArray()).toHaveLength(2);
//         expect(itemCollection.sum).toEqual(10);
//     });
//
//     test('getFirst() & getLast()', () => {
//         itemCollection = new ItemCollection([item, item2, item3]);
//         expect(itemCollection.getFirst()).toStrictEqual(item);
//         expect(itemCollection.getLast()).toStrictEqual(item3);
//     });
//
//     test('getAt()', () => {
//         itemCollection = new ItemCollection([item, item2, item3]);
//         expect(itemCollection.getAt(1)).toStrictEqual(item2);
//     });
//     test('size()', () => {
//         let array = [item, item2, item3];
//         itemCollection = new ItemCollection(array);
//         expect(itemCollection.size).toEqual(array.length);
//     });
//
//     test('getNLasts()', () => {
//         let array = [item, item2, item3];
//         itemCollection = new ItemCollection(array);
//         expect(itemCollection.getNLasts(2).toArray()).toEqual([item2, item3]);
//
//         expect(() => {itemCollection.getNLasts(4)}).toThrowError(RangeError);
//     });
// });
