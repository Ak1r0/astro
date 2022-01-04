const global = {
    pairs: {
        binance_BTCEUR: {
            symbol: "BTCEUR",
            candle_interval: "1m",
            platform: 'binance',
            platform_fee: 0.1,
            fees_connector: 'BitcoinMempool',
            fee: null,
        }
    },
    strategies: {
        trendGoesDown: {
            priceVariation: {
                buySettings: {
                    variation_period: 30, // in minutes
                    trade_quantity: 20, // en euros
                    thresholds: { // first not null and validated will trigger green light
                        currency_price: 1000,   // abs value, trigger when price drop from this amount on variation_period
                        real_gain: 0.10, // Unit = quoted currency
                        percent: 0.25, // abs value, trigger when price drop from this amount on variation_period
                    },
                }
            }
        },
        trendGoesUp: {
            priceVariation: {
                buySettings: {
                    variation_period: 30, // in minutes
                    trade_quantity: 20, // en euros
                    thresholds: { // first not null and validated will trigger green light
                        currency_price: 1000,   // abs value, trigger when price drop from this amount on variation_period
                        real_gain: 0.10, // Unit = quoted currency
                        percent: 0.25, // abs value, trigger when price drop from this amount on variation_period
                    },
                }
            }
        }
    },
};

const trader = {
    pair: {},
    strategy: {}
}

const config = {
    global: global,
    trader: trader,
}

exports.config = config;