// @see https://github.com/ccxt/ccxt

import SampleStrategy from "./Strategies/SampleStrategy";
import ProviderManager from "./DataProvider/ProviderManager";
import ProcessManager from "./DataStore/ProcessManager";

(async () => {

    const providerManager = new ProviderManager({sandBoxMode: true, backTestingMode: false});
    const chartManager = new ProcessManager(providerManager);

    const strat = new SampleStrategy();

    providerManager.getProvider('binance');
    chartManager.run();
})();
