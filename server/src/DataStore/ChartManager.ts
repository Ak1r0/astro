import Chart, {ChartConfig} from "./Chart";
import ccxt from "ccxt";
import FileProvider from "../DataProvider/FileProvider";
import AbstractProvider from "../DataProvider/AbstractProvider";

export default class ChartManager {

    private charts: Chart[] = [];

    private providers: {[id: string]: AbstractProvider} = {};

    create(config: ChartConfig & {exchangeId: ccxt.ExchangeId} ) {

        let provider = this.providers[config.exchangeId] ?? new FileProvider(exchange);

        let chart = new Chart(config, provider);


    }
}
