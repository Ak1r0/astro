"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SampleStrategy {
    dataframesConfigs;
    defineDataframes() {
        this.dataframesConfigs = new Map([
            ["BTCUSDT_1m_binance", { pair: "BTC/USDT", interval: "1m", exchangeId: "binance" }]
        ]);
        return this.dataframesConfigs;
    }
    populateIndicators() {
        // const tf = dfd.tensorflow //Tensorflow.js is exported from Danfojs
        //
        // let tensor_arr = tf.tensor2d([[12, 34, 2.2, 2], [30, 30, 2.1, 7]])
        // let df = new dfd.DataFrame(tensor_arr, {columns: ["A", "B", "C", "D"]})
        // console.log(df)
    }
}
exports.default = SampleStrategy;
//# sourceMappingURL=SampleStrategy.js.map