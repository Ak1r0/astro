import ccxt from "ccxt";
import ExchangeProvider from "./ExchangeProvider";
import AbstractProvider from "./AbstractProvider";
import FileProvider from "./FileProvider";

export type ProviderManagerConfig = {
    sandBoxMode: boolean,
    backTestingMode: boolean
};

export default class ProviderManager {

    private providers: { [id: string]: AbstractProvider; } = {};

    private readonly config: ProviderManagerConfig = {
        sandBoxMode: true,
        backTestingMode: false,
    };

    constructor(config?: { [key in keyof ProviderManagerConfig]?: ProviderManagerConfig[key] }) {
        this.config = {...this.config, ...config};
    }

    public getProvider(exchangeId: ccxt.ExchangeId): AbstractProvider {
        return this.providers[exchangeId] ?? this.create(exchangeId);
    }

    private create(exchangeId: ccxt.ExchangeId): AbstractProvider {

        let exchangeClass = ccxt[exchangeId];
        let exchange = new exchangeClass({
            'apiKey': 'YOUR_API_KEY',
            'secret': 'YOUR_SECRET',
            enableRateLimit: true,
        });
        exchange.setSandboxMode(this.config.sandBoxMode);

        let providerClass = this.config.backTestingMode ? FileProvider : ExchangeProvider;

        this.providers[exchangeId] = new providerClass(exchange);

        return this.providers[exchangeId];
    }

}
