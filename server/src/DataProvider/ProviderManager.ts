import ccxt from "ccxt";
import ExchangeProvider from "./ExchangeProvider";
import AbstractProvider from "./AbstractProvider";

export default class ProviderManager {

    private providers: { [id: string]: AbstractProvider; };

    constructor(private sandBoxMode = true) {
    }

    public getProvider(exchangeId: ccxt.ExchangeId): AbstractProvider {
       return this.providers[exchangeId] ?? this.create(exchangeId);
    }

    private create(exchangeId: ccxt.ExchangeId): AbstractProvider {

        let exchangeClass = ccxt[exchangeId];
        let exchange = new exchangeClass({
            'apiKey': 'YOUR_API_KEY',
            'secret': 'YOUR_SECRET',
        });
        exchange.setSandboxMode(this.sandBoxMode);

        this.providers[exchangeId] = new ExchangeProvider(exchange);

        return this.providers[exchangeId];
    }

}
