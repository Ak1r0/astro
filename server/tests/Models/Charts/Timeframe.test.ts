import Tick from "../../../src/Models/Charts/Tick";
import Timeframe from "../../../src/Models/Charts/Timeframe";
import TimeframeConfig from "../../../src/Models/Charts/TimeframeConfig";


describe('Test TimeframeConfig.ts', () => {
    let timeFrameConfig: TimeframeConfig;

    timeFrameConfig = new TimeframeConfig("BTC", "USDT", 1, "minutes");

    test('config', () => {
        expect(timeFrameConfig.pair).toStrictEqual("BTCUSDT");
        expect(timeFrameConfig.name).toStrictEqual("BTCUSDT_1minutes");
    });

});

describe('Test Timeframe.ts', () => {
    let timeFrame: Timeframe;
    let item: Tick, item2: Tick, item3: Tick;

    beforeEach(() => {
    });

    timeFrame = new Timeframe(new TimeframeConfig());
    item = new Tick(new Date('2022-01-18 10:00:00').getTime(), 'BTCUSDT', 30000, 40000, 31000, 38000, 1000);
    item2 = new Tick(new Date('2022-01-18 10:01:00').getTime(), 'BTCUSDT', 30000, 40000, 31000, 38000, 1000);
    item3 = new Tick(new Date('2022-01-18 10:02:00').getTime(), 'BTCUSDT', 30000, 40000, 31000, 38000, 1000);

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

        let timeFrame2 = new Timeframe(new TimeframeConfig());
        expect(timeFrame2.getOneXTimeBefore(1)).toEqual(null);
    });

    test('getFrameXTimeBefore()', () => {

        expect(timeFrame.getFrameXTimeBefore(1).size).toEqual(2);
        expect(timeFrame.getFrameXTimeBefore(5).size).toEqual(3);
        expect(timeFrame.getFrameXTimeBefore(0).size).toEqual(1);
    });

});
