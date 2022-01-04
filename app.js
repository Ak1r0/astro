
// const ConfigOptimizer = require('./src/ConfigOptimizer');
// const Trader = require("./src/Trader");
const {config} = require("./Config");
const BinanceProvider = require("./src/DataProviders/Trades/BinanceProvider");
const Ticker = require("./src/DataCollector/Ticker");
const MicroVariationStrategy = require("./src/Strategies/MicroVariationStrategy");
const printer = require("./src/Services/Printer");

config.trader.pair = config.global.pairs.binance_BTCEUR;
config.trader.strategy = config.global.strategies.priceVariation;

let tradesProvider = new BinanceProvider();
let ticker = new Ticker(tradesProvider)

// printer.enabled = false;
ticker.startCollectingData("BTCEUR", "1m");

microVariationStrat = new MicroVariationStrategy().run();

//

// const configOptimizer = new ConfigOptimizer();
// const trader = new Trader();

//trader.run();
//
// eventEmitter.on(EVENT_MARKET_UPDATE, (candleStick) => {
//     candleChart.addCandle(candleStick);
//     trader.trackPriceDown();
//     printer.print();
// });

//binance.test();
//binance.run();


//
// let candleChart = new CandleChart();
// let operator = new Operator(candleChart)





