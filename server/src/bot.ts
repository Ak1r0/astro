// @see https://github.com/ccxt/ccxt

import SampleStrategy from "./Strategies/SampleStrategy";
import ExchangeProvider from "./DataProvider/ExchangeProvider";
import ccxt from "ccxt";
import Chart = DataStore.Chart;
import FileProvider from "./DataProvider/FileProvider";

const myStrat = new SampleStrategy();

(async () => {
    let exchangeClass = ccxt['binance'];
    let exchange = new exchangeClass({
        'apiKey': 'YOUR_API_KEY',
        'secret': 'YOUR_SECRET',
    });
    exchange.setSandboxMode(true);

    let e = new FileProvider(exchange);

    let c = new Chart({base:'BTC', quote:'USDT', interval:'1m'}, e);
    let test = await c.update();
    console.log(test);
    c.update().then((df) => console.log(df));

    // myStrat.defineDataframes().forEach(async (config, name) => {
    //     let exchangeClass = ccxt[config.exchangeId];
    //     let exchange = new exchangeClass ({
    //         'apiKey': 'YOUR_API_KEY',
    //         'secret': 'YOUR_SECRET',
    //     });
    //     exchange.setSandboxMode (true);
    //     await exchange.loadMarkets();
    //     let btcusd1 = exchange.markets['BTC/USDT']     // get market structure by symbol
    //     console.log(btcusd1);
    //     let dataProvider = new ExchangeProvider(config, exchange);
    //     console.log (await exchange.fetchOHLCV (config.pair, '1m')) // one minute
    // });
})();


const testFromExchange = async () => {
    let exchangeClass = ccxt['binance'];
    let exchange = new exchangeClass({
        'apiKey': 'YOUR_API_KEY',
        'secret': 'YOUR_SECRET',
    });
    exchange.setSandboxMode(true);

    let e = new ExchangeProvider(exchange);
    await e.init();

    let c = new Chart({base:'BTC', quote:'USDT', interval:'1m'}, e);
    c.update();
};
