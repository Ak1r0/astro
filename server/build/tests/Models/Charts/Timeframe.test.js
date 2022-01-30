"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tick_1 = __importDefault(require("../../../src/Models/Charts/Tick"));
const Timeframe_1 = __importDefault(require("../../../src/Models/Charts/Timeframe"));
const TimeframeConfig_1 = __importDefault(require("../../../src/Models/Charts/TimeframeConfig"));
describe('Test TimeframeConfig.ts', () => {
    let timeFrameConfig;
    timeFrameConfig = new TimeframeConfig_1.default("BTC", "USDT", 1, "minutes");
    test('config', () => {
        expect(timeFrameConfig.pair).toStrictEqual("BTCUSDT");
        expect(timeFrameConfig.name).toStrictEqual("BTCUSDT_1minutes");
    });
});
describe('Test Timeframe.ts', () => {
    let timeFrame;
    let item, item2, item3;
    beforeEach(() => {
    });
    timeFrame = new Timeframe_1.default(new TimeframeConfig_1.default());
    item = new Tick_1.default(new Date('2022-01-18 10:00:00').getTime(), 'BTCUSDT', 30000, 40000, 31000, 38000, 1000);
    item2 = new Tick_1.default(new Date('2022-01-18 10:01:00').getTime(), 'BTCUSDT', 30000, 40000, 31000, 38000, 1000);
    item3 = new Tick_1.default(new Date('2022-01-18 10:02:00').getTime(), 'BTCUSDT', 30000, 40000, 31000, 38000, 1000);
    timeFrame.add(item);
    timeFrame.add(item2);
    timeFrame.add(item3);
    test('getOneXTimeBefore()', () => {
        expect(timeFrame.getOneXTimeBefore(1)).toEqual(item2);
        expect(timeFrame.getOneXTimeBefore(1, timeFrame.getLast())).toEqual(item2);
        expect(timeFrame.getOneXTimeBefore(2, timeFrame.getLast())).toEqual(item);
        expect(timeFrame.getOneXTimeBefore(0, timeFrame.getLast())).toEqual(null);
        expect(timeFrame.getOneXTimeBefore(1, timeFrame.getAt(0))).toEqual(null);
        expect(timeFrame.getOneXTimeBefore(5, timeFrame.getAt(0))).toEqual(null);
        let timeFrame2 = new Timeframe_1.default(new TimeframeConfig_1.default());
        expect(timeFrame2.getOneXTimeBefore(1)).toEqual(null);
    });
    test('getFrameXTimeBefore()', () => {
        expect(timeFrame.getFrameXTimeBefore(1).size).toEqual(2);
        expect(timeFrame.getFrameXTimeBefore(5).size).toEqual(3);
        expect(timeFrame.getFrameXTimeBefore(0).size).toEqual(1);
    });
});
//# sourceMappingURL=Timeframe.test.js.map