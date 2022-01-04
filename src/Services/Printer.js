const moment = require("moment");
const {config} = require("../../Config");
const EventEmitter = require('./EventManager');
const Ticker = require("../DataCollector/Ticker");

class Printer {

    enabled = true;

    #persistantLog = [];

    #tempLog = [];

    #data = {
        startedAt: '',
        historyLoadedAt: '',
        config: {},
        coundLoadedCandles: 0,
        lastsLoadedCandles: [],
        eventBuyTresholdPC: {candles:{}, datas:{}},
        eventBuyTreshold: {candles:{}, datas:{}},
        eventBuyTresholdReal: {candles:{}, datas:{}},
    }

    constructor() {

        EventEmitter.on(Ticker.EVENT_NEW_TICK,
            /** @param {Tick} tick
                @param {TickCollection} tickCollection **/
            (tick, tickCollection) => {
                this.#data.coundLoadedCandles = tickCollection.count;
                this.#data.lastsLoadedCandles = tickCollection.getNLasts(3).toArray;
                this.print();
            }
        );

        //
        // this.#addTraderEventListeners();
        // this.#addIndicatorsEventListeners();
        //
        // EventEmitter.on(ConfigOptimizer.EVENT_CONFIG_UPDATED, (conf) => {
        //     setImmediate(() => {
        //         this.log('log', conf);
        //     });
        // })


    }

    #addIndicatorsEventListeners()
    {
        EventEmitter.on(BuyTreshold.EVENT_TRESHOLD_IS_RED, (eventData) => {
            eventData.datas.decision = 'RED';
            this.#data.eventBuyTreshold = eventData;
            this.print();
        });
        EventEmitter.on(BuyTreshold.EVENT_TRESHOLD_IS_GREEN, (eventData) => {
            eventData.datas.decision = 'GREEN';
            this.#data.eventBuyTreshold = eventData;
            if(eventData.datas.isRealGreen) {
                this.log("log", eventData.datas);
            }
            this.print();
        });
    }

    /**
     * @param {string} type
     * @param {any} msg
     */
    log(type, msg) {
        this.#persistantLog.push({
            type: type,
            msg: msg
        })
    }

    temp(type, msg) {
        this.#tempLog = {type: type, msg: msg};
    }

    print() {

        if(!this.enabled) return;

        console.clear();

        console.log(
            "Trader started at "+ Printer.formatTime(this.#data.startedAt) +
            ' - Current time '+ moment().format('YYYY-MM-DD HH:mm:ss') +
            ' - Running from '+ moment(this.#data.startedAt).fromNow()
        );

        console.log("\r\nConfigured Pair");
        console.log(this.#data.config.pair);
        console.log("Configured Strategy");
        console.log(this.#data.config.strategy);

        console.log("Trade history loaded from "+this.#data.historyLoadedAt);

        console.log("Total candles "+this.#data.coundLoadedCandles);
        console.table(this.#data.lastsLoadedCandles);

        console.log("---------- eventBuyTreshold ----------");
        console.table(this.#data.eventBuyTreshold.candles);
        console.table(this.#data.eventBuyTreshold.datas);

        this.#tempLog.type === 'log' && console.log(this.#tempLog.msg);
        this.#tempLog.type === 'table' && console.table(this.#tempLog.msg);

        this.#persistantLog.forEach((log)=> {
            log.type === 'log' && console.log(log.msg);
            log.type === 'table' && console.table(log.msg);
        })
    }

    static formatTime(time) {
        let m = moment(time);
        return m.format('x')+' ('+m.format('YYYY-MM-DD HH:mm:ss')+')';
    }

    #addTraderEventListeners() {
        EventEmitter.on(Trader.EVENT_TRADER_STARTED, /** @param {Trader} trader **/ (trader) => {
            this.#data.config = config.trader;
            this.#data.startedAt = moment();
            this.print();
        })

        EventEmitter.on(Trader.EVENT_CANDLECHART_HISTORY_LOADED, /** @param {Trader} trader **/ (trader) => {
            setImmediate(() => {
                this.#data.historyLoadedAt = Printer.formatTime(trader.candleChart.first.eventTime);
                this.print();
            });
        });

        EventEmitter.on(Trader.EVENT_CANDLECHART_UPDATED, /** @param {Trader} trader **/ (trader) => {
            setImmediate(() => {
                this.#data.coundLoadedCandles = trader.candleChart.countItems;
                this.#data.lastsLoadedCandles = trader.candleChart.getNLasts(10);
                this.print();
            });
        })
    }
}

const printer = new Printer();

module.exports = printer;