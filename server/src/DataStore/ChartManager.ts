import Chart, {ChartInputConfig} from "./Chart";
import ccxt from "ccxt";
import AbstractProvider from "../DataProvider/AbstractProvider";
import ProviderManager from "../DataProvider/ProviderManager";

export type ChartList = {[name: string]: Chart};

export default class ChartManager {

    private charts: ChartList = {};

    private providers: { [id: string]: AbstractProvider } = {};

    constructor(private providerManager: ProviderManager) {

    }

    getChart(config: ChartInputConfig & { exchangeId: ccxt.ExchangeId }): {name: string, chart: Chart} {

        let name = this.generateName(config);

        if(name in this.charts){
            return {name, chart: this.charts[name]};
        }

        let provider = this.providers[config.exchangeId] ?? this.providerManager.getProvider(config.exchangeId);

        this.charts[name] = new Chart(config, provider);
        return {name, chart: this.charts[name]};
    }

    private generateName(config: ChartInputConfig & { exchangeId: ccxt.ExchangeId }): string {
        return `${config.base}_${config.quote}-${config.interval}_${config.exchangeId}`;
    }

    startUpdating() {
        for( let chartName in this.charts){
            this.charts[chartName].startUpdating();
        }
    }
}
