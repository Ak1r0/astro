import Chart, {ChartInputConfig} from "./Chart";
import ccxt from "ccxt";
import AbstractProvider from "../DataProvider/AbstractProvider";
import ProviderManager from "../DataProvider/ProviderManager";
import * as dfd from "danfojs-node";

export type ChartList = Map<string, Chart>;

export default class ProcessManager {

    private charts: ChartList;

    private providers: { [id: string]: AbstractProvider } = {};

    constructor(private providerManager: ProviderManager) {
        this.charts = new Map<string, Chart>();
    }

    setCharts(charts:Chart[]) {
        charts.forEach(chart => this.addChart(chart));
    }

    addChart(chart: Chart) {

        if(this.charts.has(chart.name)){
            throw new Error('Duplicated chart '+ chart.name);
        }

        this.charts.set(chart.name, chart);
    }

    run() {
        this.charts.forEach(chart => {
           this.initChart(chart).then((chart) => this.updateChart(chart));
        });
    }

    private initChart = async (chart: Chart) => {
        console.log(`Initiating ${chart.name}...`);

        chart.data = await this.getChartProvider(chart).fetch(chart.pair, chart.config.interval);
        // this.initSubscribers.forEach(callback => callback(this, this.data));
        // this.isInitiated = true;

        return Promise.resolve(chart);
    }

    private updateChart = async (chart: Chart) => {
        console.log(`Start update for ${chart.name}...`);

        let provider = this.getChartProvider(chart);
        try {
            while (chart.doUpdate) {
                // Synchronize with server's time
                // Wait for the end of 1 minute (server time) - IE : serverTime=12m32s -> wait for 28s
                //todo manage other timeframes not only minutes
                await provider.sync(parseInt(chart.config.interval.slice(0, -1)));

                let df = await provider.fetch(chart.pair, chart.config.interval);
                chart.addData(df);
                // this.updateSubscribers.forEach(callback => callback(this, df));
            }
        } catch (e) {
            console.log(e);
        }
    }

    private getChartProvider(chart: Chart): AbstractProvider {
        return this.providers[chart.config.exchangeId] ?? this.providerManager.getProvider(chart.config.exchangeId);
    }
}
