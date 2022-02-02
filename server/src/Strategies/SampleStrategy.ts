import * as dfd from "danfojs-node"
import ProcessManager, {ChartList} from "../DataStore/ProcessManager";
import Chart, {callBackInput} from "../DataStore/Chart";
import {sma, rsi, RSI} from "technicalindicators";

export default class SampleStrategy {

    private indicators : {
        rsi?: RSI
    } = {}

    defineCharts = (): Chart[] => {
        let c1 = new Chart({base: "BTC", quote:"USDT", interval: "1m", exchangeId: 'binance'});

        return [c1];
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

        // if(!this.indicators.rsi) {
        //     let data = chart.getData()
        //         .tail(500)
        //         .column("close")
        //         .values;
        //     this.indicators.rsi = new RSI({period : 14, values : data});
        //     return;
        // }

        let data = df
            .column("close")
            .values;

        console.log(data);

        let nextRsi = this.indicators.rsi?.nextValue(data.pop() as number);
        console.log(nextRsi);
    }
}
