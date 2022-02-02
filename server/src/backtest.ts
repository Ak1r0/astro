// @see https://github.com/ccxt/ccxt

import SampleStrategy from "./Strategies/SampleStrategy";
import ProviderManager from "./DataProvider/ProviderManager";
import ProcessManager from "./DataStore/ProcessManager";

(async () => {

    const providerManager = new ProviderManager({sandBoxMode: true, backTestingMode: true});
    const processManager = new ProcessManager(providerManager);

    const strat = new SampleStrategy();

    providerManager.getProvider('binance'); // todo ???

    processManager.setCharts(strat.defineCharts());
    processManager.run();


})();
