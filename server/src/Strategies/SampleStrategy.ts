import * as dfd from "danfojs-node"
import {DataStore} from "../DataStore/Chart";

export default class SampleStrategy {

    public dataframesConfigs: Map<string, DataStore.Config> | undefined;

    makeCharts(chartFactory) {

    }

    subscribeToDataProvider(): Map<string, DataStore.Config> {
         this.dataframesConfigs = new Map([
            ["BTCUSDT_1m_binance", {base: "BTC", quote:"USDT", interval: "1m"}]
         ]);

        return this.dataframesConfigs;
    }

    populateIndicators() {
        const tf = dfd.tensorflow //Tensorflow.js is exported from Danfojs

        let tensor_arr = tf.tensor2d([[12, 34, 2.2, 2], [30, 30, 2.1, 7]])
        let df = new dfd.DataFrame(tensor_arr, {columns: ["A", "B", "C", "D"]})
        console.log(df)
    }
}
