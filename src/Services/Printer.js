const moment = require("moment");
const {config} = require("../../Config");
const EventEmitter = require('./EventManager');
const Ticker = require("../Chart/Ticker");

class Printer {

    enabled = true;

    #persistantLog = [];

    #tempLog = [];

    #data = {
        startedAt: '',
        historyLoadedAt: '',
        config: {},
    }

    strategies = {};

    constructor() {
        this.#addTraderEventListeners();
    }

    /**
     * @param {string} type
     * @param data
     */
    log(type, ...data) {
        this.#persistantLog.push({
            type: type,
            data: data
        })
    }

    temp(type, ...data) {
        this.#tempLog.push({type: type, data: data});
    }

    print() {

        if(!this.enabled) return;

        console.clear();

        console.log(
            "Trader started at "+ Printer.formatTime(this.#data.startedAt) +
            ' - Current time '+ moment().format('YYYY-MM-DD HH:mm:ss') +
            ' - Running from '+ moment(this.#data.startedAt).fromNow()
        );

        this.#tempLog.forEach((log)=> {
            log.type === 'log' && console.log(log.data);
            log.type === 'table' && console.table(log.data);
        });
        this.#tempLog = [];

        this.#printStrategies();

        this.#persistantLog.forEach((log)=> {
            log.type === 'log' && console.log(log.data);
            log.type === 'table' && console.table(log.data);
        })
    }

    static formatTime(time) {
        let m = moment(time);
        return m.format('x')+' ('+m.format('YYYY-MM-DD HH:mm:ss')+')';
    }

    #printStrategies()
    {
        for(let strategyName in this.strategies) {
            let strategy = this.strategies[strategyName];
            console.log('====> '+ strategyName + ' <====');
            for(let containerName in strategy){
                let container = strategy[containerName];
                console.log('> ' + containerName);

                container.type === 'log' && console.log(container.data);
                container.type === 'table' && console.table(container.data);
            }
        }
    }

    #addTraderEventListeners() {
        EventEmitter.on(Ticker.EVENT_TICKER_START, () => {
            //this.#data.config = config.trader;
            this.#data.startedAt = moment();
            this.print();
        })
    }
}

const printer = new Printer();

module.exports = printer;