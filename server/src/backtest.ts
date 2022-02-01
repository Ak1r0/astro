// @see https://github.com/ccxt/ccxt

import SampleStrategy from "./Strategies/SampleStrategy";
import ProviderManager from "./DataProvider/ProviderManager";
import ChartManager from "./DataStore/ChartManager";

(async () => {

    const providerManager = new ProviderManager({sandBoxMode: true, backTestingMode: true});
    const chartManager = new ChartManager(providerManager);

    const strat = new SampleStrategy(chartManager);

    providerManager.getProvider('binance');
    chartManager.startUpdating();


})();
