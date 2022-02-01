import * as dfd from "danfojs-node"
import ChartManager, {ChartList} from "../DataStore/ChartManager";
import Chart, {callBackInput} from "../DataStore/Chart";
import {sma, rsi} from "technicalindicators";

export default class SampleStrategy {

    private charts : ChartList = {};

    constructor(private chartManager: ChartManager) {
        let {name, chart} = chartManager.getChart({base: "BTC", quote:"USDT", interval: "1m", exchangeId: 'binance'});
        this.charts[name] = chart;

        chart.onUpdate(this.exec);
    }

    exec: callBackInput = (chart, lastDataframes) => {
        // console.log(input.chart);
        // console.log(input.lastDataframes);

        this.populateIndicators(chart, lastDataframes);
    }

    populateIndicators(chart: Chart, df: dfd.DataFrame) {
        //console.log(df);
        // let c = sma({period : 5, values : [1,2,3,4,5,6,7,8,9], reversedInput : true});
        // console.log(c);

        let tail = chart.getData()
            .tail(500);
        // console.log(tail);

        let closes = tail
            .loc({columns:["close"]});
        // console.log(closes);

        let c = rsi({period : 14, values : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]});
        console.log(c);
    }
}
