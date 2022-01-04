
const Printer = require('./src/Printer');
const ConfigOptimizer = require('./src/ConfigOptimizer');
const Trader = require("./src/Trader");
const {config} = require("./Config");

config.trader.pair = config.global.pairs.binance_BTCEUR;
config.trader.strategy = config.global.strategies.priceVariation;

new Printer();
const configOptimizer = new ConfigOptimizer();
const trader = new Trader();

trader.run();
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





